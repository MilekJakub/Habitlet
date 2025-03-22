## Description
In this process we assume that the user created their **Goal**. The **Goal** follows the principles of S.M.A.R.T. (Specific, Measurable, Achievable, Relevant, Time-bound).
   
This is the example result of completing the goal creation process:

**Title:** Write an Engineering Thesis  
**Description:** I will write an Engineering Thesis in Applied Computer Science by June 1, 2025, in the comfort of my home, which will require deep knowledge of software architecture, machine learning algorithms, and distributed systems, as well as strong research and technical writing skills. This goal will advance my expertise, enhance my career opportunities, and increase valuable research skills.

Now, we want to build a **roadmap** from the starting point to achieving the goal.

We will use techniques inspired by Event Storming (ES), a method that helps analysts and software architects explore problem spaces and visualize processes. While we are not strictly replicating Event Storming, the core principles remain similar.

**1. List all possible steps.**
- In the Event Storming sessions, an event is expressed in the past tense as a completed action. Example events: *Payment was collected*, *Customer was promoted*, *Resource was blocked*.
- We begin by placing sticky notes with steps on a board.
- First, we define the initial event, the final event, and some key intermediary steps that are crucial to the process.
- In our application, instead of an **event**, we will use **step**.
- A **step** is a task that must be completed to move forward.
- **Question:** Should we use follow the terminology from Event Storming in our application?
- Examples of steps: *First chapter written*, *Stylistic errors checked*, *Advisor reviewed the thesis*, *Thesis submitted*.
- Chronology does not matter at this stage. The goal is to create as many steps as possible for further analysis.
- Users should conduct a **brainstorming session** and list everything that comes to mind.
- **Question:** What should the interface for the brainstorming session look like?

**2. Select the most important steps.**
- Users will identify **milestones** that define the core structure of their roadmap.
- **Question:** What is a **milestone**, and how should it be defined so users can easily recognize it?
- According to Wikipedia: "A milestone is a significant point in a project that marks the completion of a phase or an important achievement."

**3. Arrange milestones chronologically.**
- The user will be presented with a **Reorderable List** where they can drag and reorder milestones into a logical sequence.

**4. Position remaining steps between milestones.**
- Exact chronology is not required, but steps should be placed within general time frames.

**5. Identify gaps.**
- Take the first milestone (e.g., START) and the next milestone and look for missing steps between them.

## Motivation & Goals  
- Users need a clear and actionable path to achieving their objectives.
- Helps in structuring complex goals by breaking them down into manageable steps.
- Encourages users to stay organized and track progress.
- Provides a visualization of milestones and dependencies.

## Scope  
- Users can define steps required to achieve a goal.
- Users can designate key milestones within the roadmap.
- Steps can be arranged chronologically or grouped between milestones.
- Users can establish dependencies between steps.
- Users can track progress and completion.

## Architecture Overview  
- The roadmap creation feature follows a structured data model linking goals to steps and milestones.
- Steps and milestones are linked through a hierarchy allowing chronological arrangement and dependency tracking.
- The front-end will offer an intuitive drag-and-drop interface for reordering steps and setting dependencies.

## Data Models  
- **Goals Table**: Contains goal-related information (title, description, target date, owner, etc.).
- **Steps Table**: Stores individual steps, status, and related milestone data.
- **Milestones Table**: Defines key moments in goal progression.
- **Dependencies Table**: Stores relationships between steps.

## **API Changes**  
**Endpoints to be added:**
- `POST /api/goals/{id}/steps` – Add a step.
- `GET /api/goals/{id}/steps` – Retrieve steps for a goal.
- `PUT /api/steps/{id}` – Edit a step.
- `DELETE /api/steps/{id}` – Remove a step.
- `POST /api/steps/{id}/dependencies` – Define step dependencies.
- `GET /api/goals/{id}/progress` – Retrieve progress status.

## **UI/UX Changes**  
- Users will have an interactive visual roadmap editor.
- Steps can be freely added, removed, or rearranged.
- Milestones will be visibly distinct to highlight key points.
- Users can link dependencies between steps using a visual connection interface.
- Completed steps will be marked visually for easy tracking.

## Q&A Section

**1. Will users understand the concept of Event Storming?**
   - Users don’t need to understand Event Storming. The process will be simplified into intuitive UI steps, ensuring users can brainstorm, structure, and refine their roadmap without requiring prior technical knowledge.

**2. What terminology should be used: “Step,” “Task,” or “Action”?**
   - "Step" implies forward movement towards a goal, making it ideal for motivation-focused applications.
   - "Task" may be more suitable for structured project management tools.
   - "Action" suggests an immediate activity rather than a planned sequence.
   - Recommendation: Use "Step" for user-friendliness.

**3. Is “Milestone” the right term, or should we use “Stage” or “Phase”?**
   - "Milestone" marks key points in goal progression.
   - "Stage" or "Phase" suggests ongoing periods rather than specific checkpoints.
   - Recommendation: Stick with "Milestone," as it aligns well with structured goal-setting practices.

**4. How will milestones be visually distinguished from regular steps?**
   - Use distinct colors, icons (e.g., flag icon), or grouped sections.
   - Ensure milestones are positioned clearly on the roadmap view.
   - Provide filtering options to show only milestones when needed.

**5. Should roadmap creation be step-by-step or freeform?**
   - Freeform entry allows flexibility.
   - A guided flow can help less experienced users.
   - Solution: Offer a basic mode for simple entry and an advanced mode for structured step-by-step organization.

**6. How will onboarding work?**
   - Provide a brief tutorial explaining step creation and milestone selection.
   - Use in-app hints and tooltips to guide users.
   - Offer a sample roadmap for users to explore before creating their own.

**7. Will users need dependency management between steps?**
   - Advanced users may want this feature.
   - Dependencies will be visually represented and enforce logical step progression.

**8. How will users modify roadmaps over time?**
   - Drag-and-drop reordering.
   - Ability to insert or remove steps dynamically.
   - Warnings when modifying steps that affect dependent ones.

**9. How will progress tracking be implemented?**
   - Steps will have a "Completed" status.
   - Milestones will be automatically marked complete when all related steps are done.
   - A progress bar will summarize overall completion.

**10. Will users receive notifications?**
   - MVP: No.
   - Future: Email or in-app reminders for upcoming milestones.

**11. Can users share their roadmaps?**
   - Initially, roadmaps are private.
   - Future versions could introduce shareable public links or mentor collaboration.

**12. Will users be able to categorize or tag steps?**
   - MVP: No.
   - Future: Tags, colors, or icons for better organization.
