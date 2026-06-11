export type StudioNavItem = {
  href: string;
  label: string;
  icon: string;
  badge?: string;
};

export type StudioTask = {
  id: string;
  title: string;
  client: string;
  status: "available" | "in-progress" | "waiting" | "completed" | "blocked";
  due: string;
  budget: string;
  category: string;
  owner: string;
  agent?: string;
};

export type StudioClient = {
  id: string;
  name: string;
  industry: string;
  status: string;
  activeTasks: number;
  retainer: string;
  contact: string;
};

export type StudioAgent = {
  id: string;
  name: string;
  description: string;
  runs: number;
  status: string;
};

export const primaryNav: StudioNavItem[] = [
  { href: "/dashboard", label: "Dashboard", icon: "grid" },
  { href: "/calendar", label: "Calendar", icon: "calendar" },
  { href: "/messages", label: "Chat", icon: "message", badge: "3" },
  { href: "/notifications", label: "Notifications", icon: "bell" },
  { href: "/clients", label: "Clients", icon: "users" },
  { href: "/agents", label: "Agents", icon: "spark" },
  { href: "/tasks", label: "Tasks", icon: "check" },
  { href: "/profile", label: "Profile", icon: "user" },
];

export const workspaceNav: StudioNavItem[] = [
  { href: "/projects", label: "Projects", icon: "folder" },
  { href: "/files", label: "Files", icon: "file" },
  { href: "/approvals", label: "Approvals", icon: "shield" },
  { href: "/deliverables", label: "Deliverables", icon: "send" },
  { href: "/earnings", label: "Earnings", icon: "wallet" },
  { href: "/support", label: "Support", icon: "life" },
  { href: "/settings", label: "Settings", icon: "settings" },
];

export const dashboardMetrics = [
  {
    label: "Income / wk",
    value: "$1,250",
    detail: "+12% vs last week",
    icon: "trend",
    tone: "purple",
    series: [26, 44, 38, 55, 42, 63, 45, 70],
  },
  {
    label: "Completed",
    value: "24",
    detail: "+8 this week",
    icon: "check",
    tone: "gold",
    bars: [2, 2, 3, 5, 7, 4, 6],
  },
  {
    label: "Pending pay",
    value: "$750",
    detail: "1 invoice",
    icon: "wallet",
    tone: "gold",
    series: [28, 46, 32, 58, 39, 61, 40, 56],
  },
  {
    label: "Service fees",
    value: "$125",
    detail: "this week",
    icon: "spark",
    tone: "gold",
    series: [20, 42, 35, 40, 54, 48, 66, 45, 64],
  },
  {
    label: "Active clients",
    value: "3",
    detail: "+1 this week",
    icon: "users",
    tone: "gold",
    series: [30, 42, 36, 48, 66, 55, 62, 76],
  },
];

export const tasks: StudioTask[] = [
  {
    id: "482",
    title: "Weekly report & competitor research",
    client: "Nova Consulting",
    status: "in-progress",
    due: "Today 2pm",
    budget: "$240",
    category: "Research",
    owner: "Cristi Ș.",
    agent: "Research",
  },
  {
    id: "481",
    title: "Update product listings for client",
    client: "BrightEra Store",
    status: "in-progress",
    due: "Today 2pm",
    budget: "$120",
    category: "Ecommerce",
    owner: "Cristi Ș.",
  },
  {
    id: "480",
    title: "Follow up with leads & email replies",
    client: "Ascend Digital",
    status: "waiting",
    due: "Tomorrow",
    budget: "$80",
    category: "Inbox",
    owner: "Cristi Ș.",
  },
  {
    id: "479",
    title: "Clean CRM duplicates and enrich contacts",
    client: "Acme Co",
    status: "available",
    due: "3 days",
    budget: "$180",
    category: "CRM",
    owner: "Unassigned",
  },
  {
    id: "478",
    title: "Prepare launch checklist for campaign",
    client: "Bloom Studio",
    status: "available",
    due: "Friday",
    budget: "$95",
    category: "Operations",
    owner: "Unassigned",
  },
  {
    id: "477",
    title: "Send weekly update to stakeholders",
    client: "Vela Foods",
    status: "completed",
    due: "Yesterday",
    budget: "$60",
    category: "Reporting",
    owner: "Cristi Ș.",
  },
];

export const clients: StudioClient[] = [
  {
    id: "acme",
    name: "Acme Co",
    industry: "Ecommerce",
    status: "retainer client",
    activeTasks: 2,
    retainer: "$500 / wk",
    contact: "Mara Chen",
  },
  {
    id: "bloom",
    name: "Bloom Studio",
    industry: "Creative services",
    status: "active",
    activeTasks: 1,
    retainer: "$350 / wk",
    contact: "Elena Pop",
  },
  {
    id: "vela",
    name: "Vela Foods",
    industry: "Food & beverage",
    status: "idle",
    activeTasks: 0,
    retainer: "$250 / wk",
    contact: "Andre D.",
  },
];

export const agents: StudioAgent[] = [
  {
    id: "email-drafting",
    name: "Email drafting",
    description: "Turns briefs and threads into polished client-ready replies.",
    runs: 18,
    status: "Ready",
  },
  {
    id: "research",
    name: "Research",
    description: "Collects competitor notes, links, and structured findings.",
    runs: 12,
    status: "Running",
  },
  {
    id: "support-reply",
    name: "Support reply",
    description: "Drafts concise support answers from task and account context.",
    runs: 9,
    status: "Ready",
  },
  {
    id: "report-generator",
    name: "Report generator",
    description: "Summarizes weekly work into client update reports.",
    runs: 15,
    status: "Ready",
  },
  {
    id: "crm-update",
    name: "CRM update",
    description: "Normalizes contact records and suggests follow-up actions.",
    runs: 7,
    status: "Ready",
  },
  {
    id: "automation-planner",
    name: "Automation planner",
    description: "Maps repeatable workflows into automation steps.",
    runs: 5,
    status: "Draft",
  },
];

export const messages = [
  {
    client: "Nova Consulting",
    initials: "NK",
    preview: "Thanks! The report looks great.",
    time: "10:24 AM",
    unread: true,
  },
  {
    client: "BrightEra Store",
    initials: "BE",
    preview: "Can we update the banner copy?",
    time: "9:15 AM",
    unread: true,
  },
  {
    client: "Ascend Digital",
    initials: "AD",
    preview: "Please send the weekly update.",
    time: "Yesterday",
    unread: false,
  },
];

export const incomeBars = [
  { label: "8 wks ago", value: 380 },
  { label: "7 wks ago", value: 520 },
  { label: "6 wks ago", value: 460 },
  { label: "5 wks ago", value: 690 },
  { label: "4 wks ago", value: 620 },
  { label: "3 wks ago", value: 810 },
  { label: "2 wks ago", value: 840 },
  { label: "This week", value: 980 },
];

export const calendarEvents = [
  { day: "Mon 8", title: "9:30 Acme call", tone: "purple", position: "top" },
  { day: "Mon 8", title: "Research run", tone: "gold", position: "bottom" },
  { day: "Tue 9", title: "Report due 2p", tone: "red", position: "middle" },
  { day: "Wed 10", title: "10a Bloom call", tone: "purple", position: "top" },
  { day: "Wed 10", title: "Task block", tone: "neutral", position: "middle" },
  { day: "Thu 11", title: "PM blocked", tone: "green", position: "bottom" },
  { day: "Fri 12", title: "Invoice #18 due", tone: "red", position: "middle" },
];

export const notifications = [
  {
    title: "New proposal accepted",
    detail: "Acme Co accepted the weekly operations proposal.",
    time: "2m",
    type: "Proposal",
    tone: "purple",
    unread: true,
  },
  {
    title: "Task #482 due in 2 hours",
    detail: "Weekly competitor research report needs delivery by 2pm.",
    time: "40m",
    type: "Deadline",
    tone: "red",
    unread: true,
  },
  {
    title: "New message from BrightEra Store",
    detail: "Client asked for banner copy adjustments.",
    time: "1h",
    type: "Message",
    tone: "gold",
    unread: true,
  },
  {
    title: "Payment received · $500",
    detail: "Nova Consulting retainer payment landed.",
    time: "Yest",
    type: "Payment",
    tone: "green",
    unread: false,
  },
  {
    title: "Research agent finished a run",
    detail: "Draft output is ready on task #482.",
    time: "Yest",
    type: "Agent",
    tone: "gold",
    unread: false,
  },
];

export const resourcePages = {
  projects: {
    title: "Projects",
    eyebrow: "Client workstreams",
    description: "Track active retainers, project timelines, linked tasks, and delivery health.",
    stats: [
      ["Active", "4"],
      ["At risk", "1"],
      ["Due this week", "6"],
    ],
  },
  files: {
    title: "Files",
    eyebrow: "Knowledge base",
    description: "Central files by client, task, source system, and agent input status.",
    stats: [
      ["Recent uploads", "18"],
      ["Awaiting review", "5"],
      ["Used by agents", "42"],
    ],
  },
  approvals: {
    title: "Approvals",
    eyebrow: "Client checkpoints",
    description: "Review drafts, assets, delivery notes, and client sign-off requests.",
    stats: [
      ["Pending", "3"],
      ["Approved", "12"],
      ["Changes requested", "2"],
    ],
  },
  deliverables: {
    title: "Deliverables",
    eyebrow: "Ready to send",
    description: "Package completed work, notes, files, and agent outputs before handoff.",
    stats: [
      ["Ready", "5"],
      ["Sent", "24"],
      ["Needs files", "2"],
    ],
  },
};
