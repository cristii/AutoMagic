export type SkillKey =
  | "inbox_calendar"
  | "research"
  | "crm_sheets"
  | "client_comms"
  | "ecommerce"
  | "automation";

export type MissionStatus = "new" | "in_progress" | "submitted" | "graded";
export type ToolType =
  | "inbox"
  | "calendar"
  | "crm"
  | "spreadsheet"
  | "support"
  | "ecommerce"
  | "automation";

export type Skill = {
  key: SkillKey;
  name: string;
  level: number;
  xp: number;
  avgScore: number;
  progressPercent: number;
};

export type Mission = {
  id: string;
  title: string;
  brief: string;
  skill: SkillKey;
  difficulty: 1 | 2 | 3;
  toolType: ToolType;
  status: MissionStatus;
  xpReward: number;
  estMinutes: number;
  score?: number;
  generatedByProvider?: string;
  generatedByModel?: string;
  objectives: Array<{ id: string; text: string; done: boolean }>;
};

export type ProviderConnection = {
  id: string;
  provider: "anthropic" | "openai" | "deepseek";
  label: string;
  model: string;
  keySuffix?: string;
  status: "connected" | "invalid" | "not_connected";
  isDefault: boolean;
};

export const skills: Skill[] = [
  { key: "inbox_calendar", name: "Inbox and calendar", level: 4, xp: 1840, avgScore: 86, progressPercent: 72 },
  { key: "research", name: "Research and reporting", level: 5, xp: 2210, avgScore: 88, progressPercent: 81 },
  { key: "crm_sheets", name: "CRM and spreadsheets", level: 3, xp: 1190, avgScore: 82, progressPercent: 58 },
  { key: "client_comms", name: "Client communication", level: 2, xp: 760, avgScore: 74, progressPercent: 44 },
  { key: "ecommerce", name: "Ecommerce support", level: 1, xp: 420, avgScore: 71, progressPercent: 28 },
  { key: "automation", name: "Automation", level: 1, xp: 300, avgScore: 69, progressPercent: 21 },
];

export const providers: ProviderConnection[] = [
  {
    id: "provider-anthropic",
    provider: "anthropic",
    label: "Anthropic Claude",
    model: "claude-sonnet",
    keySuffix: "3f9",
    status: "connected",
    isDefault: true,
  },
  {
    id: "provider-openai",
    provider: "openai",
    label: "OpenAI",
    model: "gpt-4o",
    keySuffix: "a21",
    status: "connected",
    isDefault: false,
  },
  {
    id: "provider-deepseek",
    provider: "deepseek",
    label: "DeepSeek",
    model: "deepseek-chat",
    status: "not_connected",
    isDefault: false,
  },
];

export const missions: Mission[] = [
  {
    id: "m-217",
    title: "Triage a messy client inbox",
    brief:
      "A client returns from holiday to 40 unread emails. Sort, prioritise, draft urgent replies and book callbacks without missing the hidden invoice dispute.",
    skill: "inbox_calendar",
    difficulty: 2,
    toolType: "inbox",
    status: "in_progress",
    xpReward: 120,
    estMinutes: 25,
    generatedByProvider: "anthropic",
    generatedByModel: "claude-sonnet",
    objectives: [
      { id: "o-1", text: "Archive low-priority mail", done: true },
      { id: "o-2", text: "Label by client", done: true },
      { id: "o-3", text: "Draft 2 of 5 urgent replies", done: true },
      { id: "o-4", text: "Draft remaining urgent replies", done: false },
      { id: "o-5", text: "Book 2 callbacks", done: false },
      { id: "o-6", text: "Flag the invoice dispute", done: false },
    ],
  },
  {
    id: "m-218",
    title: "Build a weekly sales report",
    brief:
      "Summarise a weekly sales export, identify the top products, and write a concise client update with next actions.",
    skill: "research",
    difficulty: 1,
    toolType: "spreadsheet",
    status: "new",
    xpReward: 90,
    estMinutes: 25,
    objectives: [
      { id: "o-1", text: "Find top products by revenue", done: false },
      { id: "o-2", text: "Flag unusual return patterns", done: false },
      { id: "o-3", text: "Draft client-ready summary", done: false },
    ],
  },
  {
    id: "m-219",
    title: "Handle an angry refund request",
    brief:
      "Resolve a tense ecommerce support thread while following policy and preserving the client relationship.",
    skill: "ecommerce",
    difficulty: 3,
    toolType: "support",
    status: "new",
    xpReward: 160,
    estMinutes: 40,
    objectives: [
      { id: "o-1", text: "Acknowledge the issue calmly", done: false },
      { id: "o-2", text: "Apply the return policy", done: false },
      { id: "o-3", text: "Escalate edge case to client", done: false },
    ],
  },
  {
    id: "m-220",
    title: "Update CRM records from email",
    brief:
      "Extract account changes from a client email thread and update CRM rows without overwriting verified fields.",
    skill: "crm_sheets",
    difficulty: 2,
    toolType: "crm",
    status: "graded",
    xpReward: 110,
    estMinutes: 30,
    score: 92,
    generatedByProvider: "anthropic",
    generatedByModel: "claude-sonnet",
    objectives: [
      { id: "o-1", text: "Update 20 contacts", done: true },
      { id: "o-2", text: "Preserve verified owner fields", done: true },
      { id: "o-3", text: "Flag duplicates", done: true },
    ],
  },
  {
    id: "m-221",
    title: "Schedule meetings across timezones",
    brief:
      "Coordinate five meetings across three timezones while respecting working hours and client preferences.",
    skill: "inbox_calendar",
    difficulty: 1,
    toolType: "calendar",
    status: "graded",
    xpReward: 90,
    estMinutes: 20,
    score: 78,
    generatedByProvider: "openai",
    generatedByModel: "gpt-4o",
    objectives: [
      { id: "o-1", text: "Avoid conflicts", done: true },
      { id: "o-2", text: "Use correct timezone labels", done: false },
      { id: "o-3", text: "Send clear invites", done: true },
    ],
  },
];

export const dashboardMetrics = [
  { label: "Missions done", value: "23", detail: "+4 this week" },
  { label: "Average score", value: "84", detail: "last 12 missions" },
  { label: "Hours practiced", value: "31", detail: "tracked time" },
  { label: "Badges", value: "9", detail: "of 24 earned" },
];

export const feedbackHistory = [
  {
    id: "g-1",
    score: 92,
    title: "Update CRM records from email",
    skill: "CRM and spreadsheets",
    model: "Claude Sonnet",
    date: "2 days ago",
    strength: "Accurate field updates",
    issue: "Could batch duplicate review faster",
  },
  {
    id: "g-2",
    score: 76,
    title: "Schedule meetings across timezones",
    skill: "Inbox and calendar",
    model: "GPT-4o",
    date: "4 days ago",
    strength: "No calendar conflicts",
    issue: "Invite language was unclear",
  },
  {
    id: "g-3",
    score: 88,
    title: "Draft a cold outreach sequence",
    skill: "Client communication",
    model: "Claude Sonnet",
    date: "1 week ago",
    strength: "Strong opening hook",
    issue: "Follow-up CTA was soft",
  },
];

export const portfolioItems = [
  { id: "p-1", title: "Weekly sales report", skill: "Research", score: 92, isPublic: true },
  { id: "p-2", title: "CRM record cleanup", skill: "CRM", score: 88, isPublic: false },
  { id: "p-3", title: "Cold outreach sequence", skill: "Comms", score: 90, isPublic: true },
  { id: "p-4", title: "Inbox triage drill", skill: "Inbox", score: 85, isPublic: false },
];

export const badges = [
  { id: "b-1", name: "Inbox Zero", detail: "Complete an inbox mission with 85+", earned: true },
  { id: "b-2", name: "First 90+", detail: "Score 90 or higher", earned: true },
  { id: "b-3", name: "7-day streak", detail: "Practice every day for a week", earned: true },
  { id: "b-4", name: "CRM Pro", detail: "Three CRM missions above 85", earned: true },
  { id: "b-5", name: "Researcher", detail: "Two more 80+ research missions", earned: false },
  { id: "b-6", name: "Perfect 100", detail: "Submit a flawless mission", earned: false },
];

export const certificates = [
  {
    id: "c-1",
    title: "Inbox and Calendar Certified",
    status: "earned",
    detail: "Average 86 over 8 missions",
  },
  {
    id: "c-2",
    title: "Research Certified",
    status: "locked",
    detail: "2 more 80+ missions to unlock",
  },
];

export function skillName(key: SkillKey) {
  return skills.find((skill) => skill.key === key)?.name ?? key;
}

export function difficultyLabel(difficulty: Mission["difficulty"]) {
  return difficulty === 1 ? "Easy" : difficulty === 2 ? "Medium" : "Hard";
}

export function findMission(missionId: string) {
  return missions.find((mission) => mission.id === missionId);
}
