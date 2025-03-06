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

export const CATEGORIES = [
  "Work",
  "Personal",
  "Health",
  "Finance",
  "Education",
  "Family",
  "Social",
  "Spiritual",
  "Home",
  "Other",
];

export const PRIORITIES = [
  "low",
  "medium",
  "high",
];

export const STATUSES = [
  "not_started",
  "in_progress",
  "completed",
  "cancelled",
];

export const MAX_TAGS = 5;

export const INITIAL_CREATE_GOAL_FORM_DATA = {
  title: "",
  action: "",
  what: "",
  when: new Date(),
  where: "",
  which: "",
  why: "",
  description: "",
  category: "",
  priority: "" as "" | "low" | "medium" | "high",
  tags: [] as string[],
  status: "not_started" as "not_started" | "in_progress" | "completed" | "cancelled",
  progress: 0,
  is_archived: false
}; 