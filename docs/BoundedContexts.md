# Bounded Contexts for Achieving Goals and Habit Formation

Based on the identified subdomains, the system can be organized into several **bounded contexts**. Each context has clear responsibilities, encapsulated domain logic, and minimal dependencies to maintain a simple, modular architecture. Below are the contexts defined for each subdomain:

## 1. Goal Management Context (Achieving Goals Subdomain)
- **Responsibilities:**
    - Manages goal creation, tracking progress, and marking completion.
    - Ensures goals follow SMART criteria (Specific, Measurable, Achievable, Relevant, Time-bound).
    - Breaks down goals into milestones and actionable steps for structured achievement.
- **Key Entities/Aggregates:**
    - `Goal` – Aggregate root representing a goal with SMART attributes.
    - `Milestone` – Milestones linked to a goal for progress tracking.
    - `Step` – Individual steps linked to milestones (actionable tasks contributing to the goal).
- **Domain Events:**
    - `GoalCreated`, `GoalUpdated`, `GoalAchieved` (fired when a goal is created/modified or successfully completed).
- **Interactions:**
    - Publishes events to the **Progress Tracking Context** when milestones or steps are completed (to update overall progress).
    - Listens for identity-related events from the **Identity Management Context** to ensure goals remain aligned with the user’s identity or values.
    - Communicates with the **Habit Management Context** to align daily/weekly habits with long-term goals (for example, creating habit suggestions based on a new goal).

## 2. Identity Management Context (Identity Change Subdomain)
- **Responsibilities:**
    - Manages the user’s identity profile and tracks personal evolution or growth.
    - Maintains identity-related attributes like roles, values, or identity statements (e.g., “I am a runner”), and an experience points (XP) system reflecting personal progress.
    - Links identity changes to user behaviors, habits, and goals (to reinforce identity through actions).
- **Key Entities/Aggregates:**
    - `IdentityProfile` – The core identity entity (contains user’s identity attributes and accumulated XP/level).
    - `IdentityBehavior` – Links between identity aspects and behaviors/habits (for example, linking the identity “runner” to the habit “run daily”).
- **Domain Events:**
    - `IdentityDefined` (when a user sets or updates their identity statement/attributes),
    - `IdentityUpdated` (general updates to identity profile),
    - `XPUpdated` (when the user’s experience points change, possibly leading to a level-up in identity).
- **Interactions:**
    - Provides identity data to the **Goal Management Context** – for example, when a user’s identity is set to “healthy person,” the goal context can ensure new goals align with this identity.
    - Consumes progress and XP events from the **Progress Tracking Context** to update the `IdentityProfile` (reflecting overall progress in the user’s identity XP and possibly triggering identity level-ups or transformations).
    - Sends identity-linked triggers or suggestions to the **Habit Management Context** – for instance, if the user identifies as a “writer,” the identity context can suggest or prioritize habits like “write every day.”

## 3. Habit Management Context (Habit Development Subdomain)
- **Responsibilities:**
    - Manages habit creation and tracking of habit execution over time.
    - Aligns habits with the user’s identity and goals to ensure consistency (habits reinforce identity and contribute to goals).
    - Tracks habit performance metrics such as streaks (continuous days of habit completion) and consistency rates.
- **Key Entities/Aggregates:**
    - `Habit` – Aggregate root representing a habit (with details like frequency, schedule, and associated identity or goal if applicable).
    - `HabitLog` – Records occurrences of habit execution (e.g., daily check-ins, timestamps for each completion) to track streaks and history.
- **Domain Events:**
    - `HabitCreated`, `HabitUpdated` (when habits are added or modified),
    - `HabitCompleted` (when a habit action is performed for the day/session),
    - `StreakUpdated` (when a habit streak counter changes, e.g., a new consecutive day is added or a streak is broken).
- **Interactions:**
    - Publishes habit completion and streak events to the **Progress Tracking Context** (so overall progress and XP can be updated based on habit consistency).
    - Receives goal alignment information from the **Goal Management Context** – for example, if a new goal is set to "Run a marathon," the habit context might create or suggest a daily running habit.
    - Listens to identity-related events from the **Identity Management Context** to create or adjust habits that support the user’s declared identity. (E.g., identity = “mindful person” could prompt a meditation habit.)

## 4. Session Tracking Context (Session Tracking Subdomain)
- **Responsibilities:**
    - Manages focused work or study sessions (e.g. Pomodoro sessions or any timed focus period).
    - Tracks session details such as duration, objectives, and outcomes, including whether the session was completed successfully or interrupted.
    - Stores session reflections or notes to help the user review performance and identify improvements.
- **Key Entities/Aggregates:**
    - `Session` – Represents a focus session with properties like start time, end time (or duration), purpose (which goal or habit it’s tied to, if any), and results (completed or not, outcome notes).
- **Domain Events:**
    - `SessionStarted` (when a focus session begins),
    - `SessionCompleted` (when a session ends, especially if it was completed successfully),
    - *Potentially* `SessionInterrupted` (if a session is canceled or broken).
- **Interactions:**
    - Sends XP or progress events to the **Identity Management Context** upon session completion – for example, awarding experience points for focused work that can contribute to identity growth (especially if the session was tied to an identity-building activity).
    - Updates the **Progress Tracking Context** when sessions are completed, contributing to overall progress metrics (like number of focus hours, session success rate, etc.).
    - Works with the **Habit Management Context** for habit-based sessions: if a habit involves doing a daily focus session (e.g., “study for 1 hour daily”), the session context will report the completion of that session to the habit context so it counts toward the habit streak.

## 5. Progress Tracking Context (Progress Tracking Subdomain)
- **Responsibilities:**
    - Aggregates and summarizes the user’s progress across goals, habits, and sessions.
    - Calculates experience points (XP), levels, or other gamified progress measures based on user activities.
    - Provides data for visual progress reports and dashboards (such as percentage of goals completed, current streak lengths, XP bars, etc.).
- **Key Entities/Aggregates:**
    - `ProgressSummary` – A consolidated view of progress, including total XP, current level, number of goals achieved, habits maintained, session counts, etc. This might not be a traditional aggregate root but a projection or summary built from other contexts’ data.
    - `Achievement/Level` – (Optional) If the system includes achievement badges or levels separate from identity, they would be tracked here as well.
- **Domain Events:**
    - `ProgressUpdated` (whenever a significant progress metric changes, such as completing a milestone or a day’s habit streak),
    - `XPUpdated` (when XP is added – could be part of ProgressUpdated or separate for clarity),
    - `LevelUp` (when accumulated XP crosses a threshold and the user reaches a new level).
- **Interactions:**
    - Collects and listens for events from **Goal Management**, **Habit Management**, and **Session Tracking** contexts to update the aggregated progress. For example, a `GoalAchieved` or `HabitCompleted` event would cause this context to recalculate progress and XP.
    - Notifies or triggers updates in the **Identity Management Context** with XP changes. (E.g., after updating XP, it emits an `XPUpdated` event that Identity Management uses to update the user’s IdentityProfile and possibly trigger an identity level-up.)
    - Provides progress data to the **Notification Context** for informing the user (such as sending a congratulatory notification when a level is achieved or a weekly progress report).

## 6. Notification Context (Notification Subdomain)
- **Responsibilities:**
    - Handles all user notifications, reminders, and nudges related to goals, habits, and sessions.
    - Schedules and sends reminders for upcoming or due tasks (e.g., *“Time to do your daily workout habit”* or *“Your focus session starts now”*).
    - Sends recaps or alerts, such as daily summaries of progress or recovery suggestions if the user misses a habit or a goal deadline.
- **Key Entities/Aggregates:**
    - `Reminder` – Represents a scheduled notification or reminder, linked to a specific habit, goal, or event (like a session start time). Contains info on when to notify and the message content.
    - *(Notifications might not have complex aggregates; they could be simple scheduling records handled by an external service, but this context defines how and when they occur.)*
- **Domain Events:**
    - `ReminderCreated` (when a new reminder is scheduled, e.g., user sets a daily 8am reminder for a habit),
    - `ReminderSent` (after a notification is dispatched to the user),
    - `GoalMissed` or `HabitStreakBroken` (events that could trigger special notifications, like *“You missed your goal deadline. Here’s how to get back on track.”*).
- **Interactions:**
    - Uses data from **Habit Management** and **Goal Management** to generate reminders. For example, when a new habit is created, this context schedules the appropriate daily reminder; when a goal has a deadline approaching, it may schedule a reminder.
    - Pulls progress/streak information from the **Progress Tracking Context** to send motivational messages or alerts (e.g., *“You’ve studied 5 days in a row, keep it up!”* or *“Your streak was broken; no worries, start again today!”*).
    - Can also integrate with **Session Tracking Context** to send prompts like *“Time to start your next focus session”* or *“Take a break – your 25-minute session is over.”*

## 7. User Management Context (User Management Subdomain)
- **Responsibilities:**
    - Manages user accounts, including registration, authentication, and basic profile information.
    - Handles security concerns such as password storage, login sessions, and permission checks (if needed).
    - Stores user preferences that might affect other contexts (for example, notification preferences or time zone for scheduling).
- **Key Entities/Aggregates:**
    - `User` – The core user account entity containing credentials (login info), contact info (for notifications), and preferences. This is typically an aggregate root in the user management domain.
    - `UserProfile` – (If separate from authentication) holds extended profile info like avatar, display name, or other settings.
- **Domain Events:**
    - `UserRegistered` (when a new user account is created),
    - `UserLoggedIn`, `UserLoggedOut` (for authentication events, if tracked),
    - `UserUpdated` (when profile or preference information changes).
- **Interactions:**
    - Provides authentication and user identity verification to all other contexts. For instance, all actions in other contexts (creating goals, logging habits, etc.) pass through User Management to ensure the user is valid and to retrieve the current user’s ID or profile.
    - Other contexts may query User Management for user-specific settings (e.g., Notification context checking if the user enabled email reminders).
    - Emits events that could be used by other contexts if needed (for example, after `UserRegistered`, the Identity Management Context might initialize a default IdentityProfile, or the Progress Tracking Context might create a new ProgressSummary record).

## **Integration and Communication**
These bounded contexts each operate independently with well-defined responsibilities, which keeps the overall design simple and maintainable for a solo developer. Communication between contexts is mainly **event-driven**. This means when something important happens in one context (such as a goal being achieved, or a habit being logged), an event is published and other interested contexts listen and react to it. This event-driven approach minimizes tight coupling – each context knows about others only through the events they produce or consume, not through direct calls or shared data structures.

By maintaining clear boundaries and using events for interaction, the system remains modular. Each context can evolve internally without breaking others, and the developer can understand and manage each piece of the domain separately. This leads to a scalable and easy-to-maintain architecture, even as new features (or contexts) are added in the future.