import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ReactFlowProvider } from '@xyflow/react';
import { MainLayout } from '@/layout/main-layout';
import { RoadmapCanvas } from '@/features/roadmap/components/roadmap-canvas';
import { RoadmapData, RoadmapStoreProvider } from '@/store/roadmap.store';
import { fetchDependencies, fetchGoal, fetchMilestones, fetchSteps } from '@/services/roadmap.service';
import { Loader2 } from 'lucide-react';

export const RoadmapPage = () => {
  const { goalId } = useParams<{ goalId: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [roadmapData, setRoadmapData] = useState<RoadmapData>({
    goal: null!,
    milestones: [],
    steps: [],
    dependencies: []
  });

  useEffect(() => {
    if (!goalId) {
      navigate('/goals');
      return;
    }

    const loadRoadmapData = async () => {
      try {
        setLoading(true);
        // Fetch the goal, milestones, and steps data
        const goal = await fetchGoal(goalId);
        const milestones = await fetchMilestones(goalId);
        const steps = await fetchSteps(goalId);
        const dependencies = await fetchDependencies(goalId);
        setRoadmapData({
          goal,
          milestones,
          steps,
          dependencies
        });
      } catch (error) {
        console.error('Failed to load roadmap data:', error);
        // Handle error (maybe show an error message)
      } finally {
        setLoading(false);
      }
    };

    loadRoadmapData();
  }, [goalId, navigate]);

  if (loading) {
    return (
      <MainLayout>
        <div className="flex h-full items-center justify-center">
          <Loader2 className="animate-spin" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <ReactFlowProvider>
        <RoadmapStoreProvider initialData={roadmapData}>
          <RoadmapCanvas />
        </RoadmapStoreProvider>
      </ReactFlowProvider>
    </MainLayout>
  );
};