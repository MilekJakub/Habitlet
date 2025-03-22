import { createGoalInputSchema } from "@/features/dashboard/components/goals/create/create-goal.schema";
import { GoalEntity } from "@/types/goal";
import { z } from "zod";
import { supabase } from "@/lib/supabase";
export type CreateGoalInput = z.infer<typeof createGoalInputSchema>;

export const createGoal = async (
  createGoalInput: CreateGoalInput
): Promise<GoalEntity> => {
  const goalDataToInsert = {
    title: createGoalInput.title,
    description: createGoalInput.description,
    target_date: createGoalInput.when,
    category: createGoalInput.category,
    priority: createGoalInput.priority,
    tags: createGoalInput.tags,
    status: createGoalInput.status,
    is_archived: createGoalInput.is_archived,
    user_id: createGoalInput.user_id,
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

  return data as GoalEntity;
};
