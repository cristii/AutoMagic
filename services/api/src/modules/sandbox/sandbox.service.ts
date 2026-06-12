import { Injectable } from '@nestjs/common';

const skills = [
  { id: 'skill-inbox', key: 'inbox_calendar', name: 'Inbox and calendar', level: 4, xp: 1840, avgScore: 86 },
  { id: 'skill-research', key: 'research', name: 'Research and reporting', level: 5, xp: 2210, avgScore: 88 },
  { id: 'skill-crm', key: 'crm_sheets', name: 'CRM and spreadsheets', level: 3, xp: 1190, avgScore: 82 },
  { id: 'skill-comms', key: 'client_comms', name: 'Client communication', level: 2, xp: 760, avgScore: 74 },
  { id: 'skill-commerce', key: 'ecommerce', name: 'Ecommerce support', level: 1, xp: 420, avgScore: 71 },
  { id: 'skill-automation', key: 'automation', name: 'Automation', level: 1, xp: 300, avgScore: 69 },
] as const;

@Injectable()
export class SandboxService {
  getDashboard(userId: string) {
    return {
      userId,
      level: 4,
      title: 'Apprentice VA',
      xp: 1840,
      nextLevelXp: 2500,
      streak: { current: 7, longest: 11 },
      stats: {
        missionsDone: 23,
        avgScore: 84,
        hoursPracticed: 31,
        badgesEarned: 9,
      },
      skills,
      recentScores: [92, 76, 88],
    };
  }

  getSkills() {
    return skills;
  }

  getAchievements(userId: string) {
    return {
      userId,
      badges: [
        { key: 'inbox_zero', name: 'Inbox Zero', earned: true },
        { key: 'first_90', name: 'First 90+', earned: true },
        { key: 'researcher', name: 'Researcher', earned: false, unlock: '2 more 80+ research missions' },
      ],
      certificates: [
        { skillKey: 'inbox_calendar', status: 'earned', criteria: 'Average 86 over 8 missions' },
        { skillKey: 'research', status: 'locked', criteria: '2 more 80+ missions' },
      ],
    };
  }

  getPortfolio(userId: string) {
    return {
      userId,
      items: [
        { id: 'portfolio-1', missionTitle: 'Weekly sales report', score: 92, skill: 'research', isPublic: true },
        { id: 'portfolio-2', missionTitle: 'CRM record cleanup', score: 88, skill: 'crm_sheets', isPublic: false },
      ],
    };
  }

  updatePortfolioItem(userId: string, itemId: string, isPublic: boolean) {
    return {
      userId,
      itemId,
      isPublic,
      updatedAt: new Date().toISOString(),
    };
  }

  getSettings(userId: string) {
    return {
      userId,
      simulator: {
        liveCoachHints: true,
        timedMissions: true,
        adaptiveDifficulty: false,
      },
      billing: {
        status: 'stub',
      },
    };
  }

  updateSettings(
    userId: string,
    settings: {
      liveCoachHints?: boolean;
      timedMissions?: boolean;
      adaptiveDifficulty?: boolean;
    },
  ) {
    return {
      userId,
      simulator: {
        liveCoachHints: settings.liveCoachHints ?? true,
        timedMissions: settings.timedMissions ?? true,
        adaptiveDifficulty: settings.adaptiveDifficulty ?? false,
      },
      updatedAt: new Date().toISOString(),
    };
  }
}
