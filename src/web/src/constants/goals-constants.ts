import { createGoalInputSchema } from "@/features/dashboard/components/goals/create/create-goal.schema";
import { GoalStatus, GoalPriority, GoalCategory } from "@/types/goal";
import { z } from "zod";

export const ACTIONS = [
  "Oversee",
  "Update",
  "Write",
  "Coordinate",
  "Upgrade",
  "Process",
  "Supervise",
  "Develop",
  "Provide",
  "Manage",
  "Create",
  "Maintain",
  "Plan",
  "Implement",
  "Reconcile",
  "Support",
  "Evaluate",
  "Direct",
  "Transition",
  "Produce",
  "Administer",
];

type FormData = z.infer<typeof createGoalInputSchema>;

export const INITIAL_CREATE_GOAL_FORM_DATA : FormData = {
  title: "",
  description: "",
  action: "",
  what: "",
  when: new Date(),
  where: "",
  which: "",
  why: "",
  category: "personal" as GoalCategory,
  priority: "medium" as GoalPriority,
  tags: [] as string[],
  status: "unlocked" as GoalStatus,
  is_archived: false
};

export const GOAL_CATEGORIES = [
  "work",
  "personal",
  "health",
  "finance",
  "education",
  "family",
  "social",
  "spiritual",
  "home",
] as const;

export const GOAL_STATUSES = [
  "locked",
  "unlocked",
  "in_progress",
  "completed",
] as const;

export const MAX_TAGS = 5;

export const GOAL_PRIORITIES = ["low", "medium", "high"] as const;