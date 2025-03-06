import { z } from "zod";
import { createGoalInputSchema } from "../../../schemas/create-goal.schema";

export type CreateGoalProps = {
  onSuccess?: () => void;
};

export type FormData = z.infer<typeof createGoalInputSchema>;
