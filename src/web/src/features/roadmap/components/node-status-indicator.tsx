import React, { ReactNode } from "react";
import clsx from "clsx";
import { GoalStatus } from "@/types/goal";
import { MilestoneStatus } from "@/types/milestone";
import { StepStatus } from "@/types/step";

export type NodeStatusIndicatorProps = {
  status?: GoalStatus | MilestoneStatus | StepStatus;
  children: ReactNode;
};

export const LoadingIndicator = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className="absolute -left-[1px] -top-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)]">
        <style>
          {`
        @keyframes spin {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .spinner {
          animation: spin 2s linear infinite;
          position: absolute;
          left: 50%;
          top: 50%;
          width: 140%;
          aspect-ratio: 1;
          transform-origin: center;
        }
      `}
        </style>
        <div className="absolute inset-0 overflow-hidden rounded-[7px]">
          <div className="spinner rounded-full bg-[conic-gradient(from_0deg_at_50%_50%,_rgb(42,67,233)_0deg,_rgba(42,138,246,0)_360deg)]" />
        </div>
      </div>
      {children}
    </>
  );
};

const StatusBorder = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <>
      <div
        className={clsx(
          "absolute -left-[1px] -top-[1px] h-[calc(100%+2px)] w-[calc(100%+2px)] rounded-[7px] border-2",
          className,
        )}
      />
      {children}
    </>
  );
};

export const NodeStatusIndicator = ({
  status,
  children,
}: NodeStatusIndicatorProps) => {
  switch (status) {
    case "locked":
      return <StatusBorder className="border-zinc-50">{children}</StatusBorder>
    case "unlocked":
      return <StatusBorder className="border-zinc-600">{children}</StatusBorder>
    case "in_progress":
      return <StatusBorder className="border-yellow-400">{children}</StatusBorder>;
    case "completed":
      return <StatusBorder className="border-green-400">{children}</StatusBorder>;
    case "skipped":
      return <StatusBorder className="border-gray-400">{children}</StatusBorder>;
    default:
      return <>{children}</>;
  }
};
