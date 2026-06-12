import { Injectable } from '@nestjs/common';

import type { SandboxGrading, SandboxMission } from '../sandbox/sandbox.types';

export type ProgressionResult = {
  applied: boolean;
  xpAwarded: number;
  portfolioCreated: boolean;
};

@Injectable()
export class ProgressionService {
  private readonly appliedGradingIds = new Set<string>();

  applyMissionGraded(mission: SandboxMission, grading: SandboxGrading): ProgressionResult {
    if (this.appliedGradingIds.has(grading.id)) {
      return { applied: false, xpAwarded: 0, portfolioCreated: false };
    }

    this.appliedGradingIds.add(grading.id);

    return {
      applied: true,
      xpAwarded: mission.xpReward,
      portfolioCreated: grading.score >= 85,
    };
  }
}
