'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  labels?: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, labels }) => {
  return (
    <div className="w-full">
      {/* Progress bars */}
      <div className="flex gap-1.5 mb-3">
        {Array.from({ length: totalSteps }, (_, i) => (
          <div
            key={i}
            className={cn(
              'h-1.5 rounded-full flex-1 transition-colors duration-300',
              i + 1 <= currentStep ? 'bg-aurora' : 'bg-gray-200'
            )}
          />
        ))}
      </div>

      {/* Step labels */}
      {labels && (
        <div className="flex justify-between">
          {labels.map((label, i) => (
            <span
              key={i}
              className={cn(
                'text-[10px] font-medium transition-colors',
                i + 1 <= currentStep ? 'text-aurora' : 'text-gray-400',
                i + 1 === currentStep && 'font-bold'
              )}
            >
              {i + 1}. {label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default StepIndicator;
