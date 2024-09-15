using System.Collections.Generic;
using Nuke.Common;
using Nuke.Common.CI.GitHubActions;
using Nuke.Common.IO;
using Nuke.Common.ProjectModel;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Tools.Npm;
using Nuke.Common.Utilities.Collections;
using Serilog;

[GitHubActions(
    "CI",
    GitHubActionsImage.UbuntuLatest,
    OnPullRequestBranches = ["main", "dev"],
    InvokedTargets = [nameof(Compile)],
    ImportSecrets = [nameof(HabitlyExpo)],
    AutoGenerate = false)]
class Build : NukeBuild
{
    [Parameter("Platform to deploy to (all, ios, android)")]
    readonly string DeployPlatform = "all";

    [Parameter("EAS build profile to use")]
    readonly string EasProfile = "development";
    
    [Parameter("Expo personal access token for Habitly app")]
    [Secret]
    readonly string HabitlyExpo;

    [Solution]
    readonly Solution Solution;

    AbsolutePath WebDirectory => RootDirectory / "src" / "web";
    AbsolutePath MobileDirectory => RootDirectory / "src" / "mobile";

    Target Clean => _ => _
        .Executes(() =>
        {
            DotNetTasks.DotNetClean(s => s.SetProject(Solution));
            WebDirectory.GlobDirectories("**/node_modules").ForEach(path => path.DeleteDirectory());
            MobileDirectory.GlobDirectories("**/node_modules").ForEach(path => path.DeleteDirectory());
        });

    Target Restore => _ => _
        .DependsOn(Clean)
        .Executes(() =>
        {
            DotNetTasks.DotNetRestore(s => s
                .SetProjectFile(Solution));

            NpmTasks.NpmInstall(s => s
                .SetProcessWorkingDirectory(WebDirectory));

            NpmTasks.NpmInstall(s => s
                .SetProcessWorkingDirectory(MobileDirectory));
        });

    Target Compile => _ => _
        .DependsOn(Restore)
        .Executes(() =>
        {
            DotNetTasks.DotNetBuild(s => s
                .SetProjectFile(Solution)
                .SetConfiguration(Configuration.Release));

            NpmTasks.NpmRun(s => s
                .SetProcessWorkingDirectory(WebDirectory)
                .SetCommand("build"));
            
            var process = ProcessTasks
                .StartProcess(
                    "eas",
                    $"build --platform {DeployPlatform} --non-interactive --no-wait --profile {EasProfile}",
                    MobileDirectory);

            process.WaitForExit();

            if (process.ExitCode != 0)
            {
                Log.Error("EAS build failed.");
                foreach (var output in process.Output) Log.Error(output.Text);
                Assert.Fail("Unexpected error occured.");
            }
        });
    
    Target Test => _ => _
        .DependsOn(Compile)
        .Executes(() =>
        {
            DotNetTasks.DotNetTest(s => s
                .SetProjectFile(Solution)
                .SetConfiguration(Configuration.Release)
                .EnableNoBuild());
        });

    public static int Main() => Execute<Build>(x => x.Test);
}