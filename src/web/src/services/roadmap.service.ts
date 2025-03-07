import { supabase } from '@/lib/supabase';
import { GoalEntity } from '@/types/goal';
import { MilestoneEntity } from '@/types/milestone';
import { RoadmapNodeData } from '@/types/roadmap';
import { PostgrestSingleResponse } from '@supabase/supabase-js';
import { StepEntity } from '@/types/step';
import { DependencyEntity } from '@/types/dependency';
import { RoadmapEdge } from '@/features/roadmap/components/edges/roadmap-edge';

export const fetchGoal = async (goalId: string): Promise<RoadmapNodeData> => {
  const response: PostgrestSingleResponse<GoalEntity> = await supabase
  .from('goals')
  .select('*')
  .eq('id', goalId)
  .single();

  if (!response.data) {
    throw new Error('Goal not found');
  }
  
  return {
    id: response.data.id,
    type: 'goal-node',
    title: response.data.title,
    label: response.data.title,
    icon: 'Target',
    status: response.data.status,
  };
};

export const fetchMilestones = async (goalId: string): Promise<RoadmapNodeData[]> => {
  const response: PostgrestSingleResponse<MilestoneEntity[]> = await supabase
  .from('milestones')
  .select('*')
  .eq('goal_id', goalId);

  if (!response.data) {
    throw new Error('Milestones not found');
  }
  
  const milestones: RoadmapNodeData[] = response.data.map((milestone: MilestoneEntity) => ({
    id: milestone.id,
    type: 'milestone-node',
    title: milestone.title,
    label: milestone.title,
    icon: 'Flag',
    status: milestone.status,
  })) || [];

  return milestones;
};

export const fetchSteps = async (goalId: string): Promise<RoadmapNodeData[]> => {
  const response: PostgrestSingleResponse<StepEntity[]> = await supabase
  .from('steps')
  .select('*')
  .eq('goal_id', goalId);

  if (!response.data) {
    throw new Error('Steps not found');
  }
  
  const steps: RoadmapNodeData[] = response.data?.map((step: any) => ({
    id: step.id,
    title: step.title,
    type: 'step-node',
    icon: 'ListTodo',
    status: step.status,
    label: step.title,
  })) || [];

  return steps;
};

export const fetchDependencies = async (goalId: string): Promise<RoadmapEdge[]> => {
  const response: PostgrestSingleResponse<DependencyEntity[]> = await supabase
  .from('dependencies')
  .select('*')
  .eq('goal_id', goalId);

  if (!response.data) {
    throw new Error('Dependencies not found');
  }

  const dependencies: RoadmapEdge[] = response.data.map((dependency: DependencyEntity) => ({
    id: dependency.id,
    source: dependency.source_type,
    target: dependency.target_type,
    sourceHandleId: dependency.source_id,
    targetHandleId: dependency.target_id,
  }));

  return dependencies;
};