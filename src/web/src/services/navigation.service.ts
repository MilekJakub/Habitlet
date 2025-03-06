import { supabase } from "@/lib/supabase";

export type NavigationResponse = {
  success: boolean;
  error?: Error;
  data?: {
    profile: {username: string};
    identities: {name: string}[];
    goals: {title: string}[];
  };
}

export class NavigationService {
  static async getUserNavigation(userId: string): Promise<NavigationResponse> {
    try {
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", userId)
        .single();

      if (profileError) {
        throw profileError;
      }

      const { data: goalsData, error: goalsError } = await supabase
        .from("goals")
        .select("title")
        .eq("user_id", userId);

      if (goalsError) {
        throw goalsError;
      }

      const profile = {
        username: profileData.username || "User"
      };

      const goals = goalsData.map((goal) => ({
        title: goal.title
      }));

      return {
        success: true,
        data: {
          profile,
          identities: [{ name: "Default" }],
          goals
        },
      };
    } catch (error) {
      console.error("Error fetching navigation data:", error);
      return { success: false, error: error as Error };
    }
  }
}