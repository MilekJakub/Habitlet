import { z } from "zod";
import { PRIORITIES, STATUSES, CATEGORIES } from "../../../constants/goals-constants";

export const createGoalInputSchema = z.object({
  title: z
    .string()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be less than 100 characters"),
  description: z.string().min(1, "Description is required"),
  action: z.string().min(1, "Please select an action"),
  what: z
    .string()
    .min(5, "Description must be at least 5 characters")
    .max(200, "Description must be less than 200 characters"),
  when: z.date({
    required_error: "Please select a target date",
    invalid_type_error: "Please select a valid date",
  }),
  where: z.string().min(1, "Please select a location"),
  which: z
    .string()
    .min(1, "Please specify the requirements or obstacles")
    .max(200, "Requirements must be less than 200 characters"),
  why: z
    .string()
    .min(1, "Please explain why this goal is important")
    .max(200, "Reason must be less than 200 characters"),
  category: z.enum(CATEGORIES as [string, ...string[]]),
  priority: z.enum(PRIORITIES as [string, ...string[]]),
  tags: z.array(z.string()).optional().default([]),
  status: z
    .enum(STATUSES as [string, ...string[]])
    .default("not_started"),
  progress: z.number().min(0).max(100).default(0),
  user_id: z.string().optional(),
  is_archived: z.boolean().default(false),
});
