# Bounded Contexts

1. **Identity Change Context**
   - **Purpose**: Supports users in changing their identity.
   - **Core Features**: Identity creation, linking identity to behaviors, managing identity-driven XP.
   - **Mappings**:
     - **Aggregates**: Identity
     - **Subdomains**: Identity Change (Core)
   - **Team Relationships**:
     - **Team**: Identity Team
     - **Collaboration**: Works closely with Habit Development Team to ensure identity changes align with habit formation.
   - **Context Map Patterns**:
     - **Shared Kernel**: Shares core identity models with Habit Development Context.

2. **Goals Context**
   - **Purpose**: Supports users in achieving their goals.
   - **Core Features**: Goal setup, milestone definition, roadmap visualization.
   - **Mappings**:
     - **Aggregates**: Roadmap, Goal, Milestone, Step
     - **Subdomains**: Achieving Goals (Core)
   - **Team Relationships**:
     - **Team**: Goals Team
     - **Collaboration**: Coordinates with Progress Tracking Team for milestone achievements.
   - **Context Map Patterns**:
     - **Customer-Supplier**: Supplies goal data to Progress Tracking Context.

3. **Habit Development Context**
   - **Purpose**: Supports users in developing habits.
   - **Core Features**: Habit creation, tracking completion, notifications.
   - **Mappings**:
     - **Aggregates**: Habit
     - **Subdomains**: Habit Development (Core)
   - **Team Relationships**:
     - **Team**: Habits Team
     - **Collaboration**: Engages with Identity Change Team to align habits with user identity.
   - **Context Map Patterns**:
     - **Shared Kernel**: Shares habit models with Identity Change Context.

4. **Session Tracking Context**
   - **Purpose**: Supports users in tracking their sessions.
   - **Core Features**: Real-time session monitoring, Pomodoro integration, session summaries.
   - **Mappings**:
     - **Aggregates**: Session, Reflection
     - **Subdomains**: Session Tracking (Supporting)
   - **Team Relationships**:
     - **Team**: Sessions Team
     - **Collaboration**: Works with Progress Tracking Team to update session data.
   - **Context Map Patterns**:
     - **Conformist**: Adopts standards from Progress Tracking Context for session data.

5. **Progress Tracking Context**
   - **Purpose**: Supports users in seeing their progress.
   - **Core Features**: XP system, streak tracking, visual heatmaps.
   - **Mappings**:
     - **Aggregates**: Level, Streak, Heatmap
     - **Subdomains**: Progress Tracking (Supporting)
   - **Team Relationships**:
     - **Team**: Progress Team
     - **Collaboration**: Integrates data from Goals and Session Tracking Contexts.
   - **Context Map Patterns**:
     - **Customer-Supplier**: Receives data from Goals Context.

6. **Notifications Context**
   - **Purpose**: Supports users in being reminded to achieve their goals.
   - **Core Features**: Smart notifications, weekly recaps, recovery plans.
   - **Mappings**:
     - **Aggregates**: Notification
     - **Subdomains**: Notification (Supporting)
   - **Team Relationships**:
     - **Team**: Notifications Team
     - **Collaboration**: Coordinates with all other teams to ensure timely notifications.
   - **Context Map Patterns**:
     - **Anticorruption Layer**: Translates data from other contexts into notifications.

7. **User Management Context**
   - **Purpose**: Supports users in managing their accounts and profiles.
   - **Core Features**: Registration, profile settings, authentication.
   - **Mappings**:
     - **Aggregates**: User
     - **Subdomains**: User Management (Generic)
   - **Team Relationships**:
     - **Team**: User Management Team
     - **Collaboration**: Provides user data to all other contexts.
   - **Context Map Patterns**:
     - **Open Host Service**: Exposes user management services to other contexts.

