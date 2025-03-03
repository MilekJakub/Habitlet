## Goals Module
**Purpose**: Supports users in achieving their goals.
**Core Features**: Goal setup, milestone definition, roadmap visualization.

```typescript
interface Roadmap = {
  id: RoadmapId;
  name: RoadmapName;
  description: RoadmapDescription;
  createdAt: Date;
  updatedAt: Date;
  status: Status;

  goals: Goal[];
};
```

```typescript
interface Goal = {
  id: GoalId;
  name: GoalName;
  description: GoalDescription;
  createdAt: Date;
  updatedAt: Date;
  status: Status;

  milestones: Milestone[];
};
```

```typescript
interface Milestone = {
  id: MilestoneId;
  name: MilestoneName;
  description: MilestoneDescription;
  createdAt: Date;
  updatedAt: Date;
  status: Status;

  steps: Step[];
};
```

```typescript
interface Step = {
  id: StepId;
  name: StepName;
  description: StepDescription;
  createdAt: Date;
  updatedAt: Date;
  status: Status;
};
```