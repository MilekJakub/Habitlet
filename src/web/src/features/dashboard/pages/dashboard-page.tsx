import React, { useEffect, useState } from "react";
import { Header } from "@/components/typography/header";
import { MainLayout } from "@/layout/main-layout";
import { CreateGoal } from "@/features/dashboard/components/goals/create-goal-form/goal-creation-form";
import { GoalCard } from "@/features/dashboard/components/goals/goal-card";
import { supabase } from "@/lib/supabase";
import type { Goal } from "@/types/goal";
import { Loader2 } from "lucide-react";
import { Inbox } from "lucide-react";
import { Body } from "@/components/typography/body";

export const DashboardPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const { data, error } = await supabase
          .from("goals")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) {
          throw error;
        }

        setGoals(data || []);
      } catch (error) {
        console.error("Error fetching goals:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoals();
  }, []);

  const handleEdit = (goal: Goal) => {
    console.log("Edit goal:", goal);
  };

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase.from("goals").delete().eq("id", id);

      if (error) {
        throw error;
      }

      setGoals(goals.filter((goal) => goal.id !== id));
    } catch (error) {
      console.error("Error deleting goal:", error);
    }
  };

  const handleArchive = async (id: string, isArchived: boolean) => {
    try {
      const { error } = await supabase
        .from("goals")
        .update({ is_archived: isArchived })
        .eq("id", id);

      if (error) {
        throw error;
      }

      setGoals(
        goals.map((goal) =>
          goal.id === id ? { ...goal, is_archived: isArchived } : goal
        )
      );
    } catch (error) {
      console.error("Error archiving goal:", error);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="animate-spin" size={24} />
          </div>
        ) : goals.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mb-4">
              <Inbox className="h-8 w-8 text-yellow-500" />
            </div>
            <Header type="h3" className="border-none">Welcome to Habitlet!</Header>
            <Body type="b1" className="mt-2 mb-6 max-w-md text-zinc-600 dark:text-zinc-400">
              You don't have any goals yet. Create your first goal to start tracking your progress and building better habits.
            </Body>
            <CreateGoal onSuccess={() => window.location.reload()} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {goals.map((goal) => (
              <GoalCard
                key={goal.id}
                goal={goal}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onArchive={handleArchive}
              />
            ))}
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DashboardPage;
