# Aggregate Design

## Identity Change Context
**Purpose**: Supports users in changing their identity.
**Core Features**: Identity creation, linking identity to behaviors.

### Aggregates

```typescript
type Identity = {
  id: IdentityId;
  name: IdentityName;
  description: IdentityDescription;
  createdAt: Date;
  updatedAt: Date;
  habits: HabitId[];
  goals: GoalId[];
};
```

## Goals Context
**Purpose**: Supports users in achieving their goals.
**Core Features**: Goal setup, milestone definition, roadmap visualization.

### Aggregates

```typescript
type Roadmap = {
  id: RoadmapId;
  name: RoadmapName;
  description: RoadmapDescription;
  createdAt: Date;
  updatedAt: Date;
  goal: GoalId;
  habits: HabitId[];
  milestones: MilestoneId[];
  steps: StepId[];
  sessions: SessionId[];
};
```

### Entities

```typescript
type Goal = {
  id: GoalId;
  name: GoalName;
  description: GoalDescription; // SMART - 5 strings, with validation
  createdAt: Date;
  updatedAt: Date;
  roadmap: RoadmapId;
  identity: IdentityId;
  milestones: MilestoneId[];
  steps: StepId[];
  sessions: SessionId[];
};
```

```typescript
type Milestone = {
  id: MilestoneId;
  name: MilestoneName;
  description: MilestoneDescription; // SMART - 5 strings, with validation
  createdAt: Date;
  updatedAt: Date;
  goal: GoalId;
  steps: StepId[];
  sessions: SessionId[];
};
```

```typescript
type Step = {
  id: StepId;
  name: StepName;
  description: StepDescription; // SMART - 5 strings, with validation
  createdAt: Date;
  updatedAt: Date;
  milestone: MilestoneId;
  sessions: SessionId[];
};
```

## Habit Development Context
**Purpose**: Supports users in developing habits.
**Core Features**: Habit creation.

### Aggregates

```typescript
type Habit = {
  id: HabitId;
  name: HabitName;
  description: HabitDescription; // SMART - 5 strings, with validation
  createdAt: Date;
  updatedAt: Date;
  identity: IdentityId;
  roadmap: RoadmapId;
  steps: StepId[];
  sessions: SessionId[];
};
```

## Session Tracking Context
**Purpose**: Supports users in tracking their sessions.
**Core Features**: Session monitoring, Pomodoro integration.

### Aggregates

```typescript
type Session = {
  id: SessionId;
  name: SessionName;
  description: SessionDescription;
  createdAt: Date;
  updatedAt: Date;
  identity: IdentityId;
  reflection: ReflectionId;
};
```

### Entities

```typescript
type Reflection = {
  id: ReflectionId;
  name: ReflectionName;
  description: ReflectionDescription;
  createdAt: Date;
  updatedAt: Date;
  session: SessionId;
};
```

## Progress Tracking Context
**Purpose**: Supports users in seeing their progress.
**Core Features**: Level system, streak tracking, visual heatmaps.

### Aggregates

```typescript
type Level = {
  id: LevelId;
  name: LevelName;
  description: LevelDescription;
  createdAt: Date;
  updatedAt: Date;
  identity: IdentityId;
};
```

```typescript
type Streak = {
  id: StreakId;
  name: StreakName;
  description: StreakDescription;
  createdAt: Date;
  updatedAt: Date;
  identity: IdentityId;
  habit: HabitId;
};
```

```typescript
type Heatmap = {
  id: HeatmapId;
  name: HeatmapName;
  description: HeatmapDescription;
  createdAt: Date;
  updatedAt: Date;
  identity: IdentityId;
};
```

## Notifications Context
**Purpose**: Supports users in being reminded to achieve their goals.
**Core Features**: Sending notifications.

### Aggregates

```typescript
type Notification = {
  id: NotificationId;
  name: NotificationName;
  description: NotificationDescription;
};
```

### User Management Context
**Purpose**: Supports users in managing their accounts and profiles.
**Core Features**: Registration, profile settings, authentication.

### Aggregates

```typescript
type User = {
  id: UserId;
  name: UserName;
  email: UserEmail;
  password: UserPassword;
  createdAt: Date;
  updatedAt: Date;
  identity: IdentityId;
};
```

---

