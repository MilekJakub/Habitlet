import { z } from "zod";
import { supabase } from "@/lib/supabase";
import { Goal } from "@/types/goal";
import { createGoalInputSchema } from "../schemas/create-goal.schema";
export type CreateGoalInput = z.infer<typeof createGoalInputSchema>;

export const createGoal = async (
  createGoalInput: CreateGoalInput
): Promise<Goal> => {
  const goalDataToInsert = {
    title: createGoalInput.title,
    description: createGoalInput.description,
    target_date: createGoalInput.when,
    category: createGoalInput.category,
    priority: createGoalInput.priority,
    tags: createGoalInput.tags,
    status: createGoalInput.status,
    progress: createGoalInput.progress,
    is_archived: createGoalInput.is_archived,
    user_id: createGoalInput.user_id
  };

  const { data, error } = await supabase
    .from("goals")
    .insert(goalDataToInsert)
    .select()
    .single();

  if (error) {
    throw new Error(`Failed to create goal: ${error.message}`);
  }

  if (!data) {
    throw new Error("Failed to create goal: No data returned");
  }

  return data as Goal;
};
