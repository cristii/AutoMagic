import { Injectable } from '@nestjs/common';

export type AiRunKind = 'generate' | 'grade' | 'coach';

export type AiRun = {
  id: string;
  userId: string;
  kind: AiRunKind;
  provider: string;
  model: string;
  missionId?: string;
  tokensIn: number;
  tokensOut: number;
  latencyMs: number;
  createdAt: string;
};

@Injectable()
export class AiRunsService {
  private readonly runs: AiRun[] = [];

  record(run: Omit<AiRun, 'id' | 'createdAt'>): AiRun {
    const saved: AiRun = {
      ...run,
      id: `airun-${this.runs.length + 1}`,
      createdAt: new Date().toISOString(),
    };
    this.runs.push(saved);
    return saved;
  }

  listForUser(userId: string): AiRun[] {
    return this.runs.filter((run) => run.userId === userId);
  }
}
