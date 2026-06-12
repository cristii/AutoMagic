import { JsonOutputService } from './json-output.service';
import { parseGeneratedMission, parseGrading } from './ai.schemas';

describe('JsonOutputService', () => {
  it('repairs malformed generated mission JSON once before returning parsed output', async () => {
    const service = new JsonOutputService();

    const result = await service.parseWithRepair('not json', parseGeneratedMission, async () =>
      JSON.stringify({
        title: 'Inbox triage',
        brief: 'Sort urgent messages.',
        skill: 'inbox_calendar',
        difficulty: 2,
        tool_type: 'inbox',
        est_minutes: 25,
        xp_reward: 120,
        objectives: [{ text: 'Find urgent messages' }],
        tool_seed: { messages: [] },
      }),
    );

    expect(result.title).toBe('Inbox triage');
    expect(result.objectives).toHaveLength(1);
  });

  it('fails gracefully when grading JSON remains outside schema after repair', async () => {
    const service = new JsonOutputService();

    await expect(
      service.parseWithRepair(
        JSON.stringify({ score: 200 }),
        parseGrading,
        async () => JSON.stringify({ score: 200 }),
      ),
    ).rejects.toThrow('AI output failed schema validation after repair.');
  });
});
