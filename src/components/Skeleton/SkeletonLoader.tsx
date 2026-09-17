import React from 'react';
import { motion } from 'motion/react';

interface SkeletonProps {
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({ className = '' }) => {
  return (
    <div
      className={`relative overflow-hidden bg-[#1a1d2d] rounded-lg before:absolute before:inset-0 before:-translate-x-full before:animate-[shimmer_2s_infinite] before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent ${className}`}
    />
  );
};

export const PortfolioSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 animate-fade-in">
      {/* Hero Header Skeleton */}
      <div className="relative rounded-2xl bg-[#12141c] border border-white/10 p-8 sm:p-12 overflow-hidden space-y-6">
        <div className="flex items-center gap-3">
          <Skeleton className="h-5 w-40 rounded-full" />
        </div>
        <Skeleton className="h-10 w-3/4 max-w-xl" />
        <Skeleton className="h-4 w-full max-w-2xl" />
        <Skeleton className="h-4 w-2/3 max-w-lg" />
        <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 max-w-md">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
        </div>
      </div>

      {/* Filter Tabs Skeleton */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-9 w-28 rounded-full" />
        ))}
      </div>

      {/* Project Cards Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-[#161822] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between h-96 p-0"
          >
            {/* Thumbnail */}
            <Skeleton className="h-52 w-full rounded-none" />
            
            {/* Content */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-5 w-5 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in">
      {/* Top Banner Skeleton */}
      <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-3 w-full max-w-md">
          <Skeleton className="h-4 w-32 rounded-full" />
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-80" />
        </div>
        <div className="flex gap-3">
          <Skeleton className="h-10 w-28 rounded-xl" />
          <Skeleton className="h-10 w-28 rounded-xl" />
        </div>
      </div>

      {/* Metric Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="bg-[#161822] border border-white/10 rounded-2xl p-5 space-y-3">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
            <Skeleton className="h-8 w-28" />
            <Skeleton className="h-3 w-36" />
          </div>
        ))}
      </div>

      {/* Tabs Skeleton */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-white/10">
        {[1, 2, 3, 4, 5].map((i) => (
          <Skeleton key={i} className="h-10 w-32 rounded-xl shrink-0" />
        ))}
      </div>

      {/* Content Table / Cards Skeleton */}
      <div className="bg-[#12141c] border border-white/10 rounded-2xl p-6 space-y-4">
        <div className="flex justify-between items-center pb-4 border-b border-white/10">
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-9 w-64 rounded-xl" />
        </div>

        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-[#161822] border border-white/10 rounded-xl p-4 flex justify-between items-center gap-4">
              <div className="space-y-2 w-1/3">
                <Skeleton className="h-5 w-full max-w-[200px]" />
                <Skeleton className="h-3 w-2/3 max-w-[150px]" />
              </div>
              <Skeleton className="h-6 w-20 rounded-full" />
              <Skeleton className="h-5 w-24" />
              <Skeleton className="h-8 w-8 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
