import type { SerializedToolPayload } from "./types";

export type CalendarEvent = {
  id: string;
  title: string;
  window: string;
  timezone: string;
};

export type CalendarSlot = {
  id: string;
  label: string;
  timezone: string;
  conflictsWith: string[];
};

export type CalendarRequest = {
  id: string;
  attendee: string;
  durationMinutes: number;
  preference: string;
  slots: CalendarSlot[];
};

export type CalendarSeed = {
  events: CalendarEvent[];
  holds: CalendarEvent[];
  timezoneConstraints: string[];
  requestedMeetings: CalendarRequest[];
};

export type CalendarState = {
  conflictsAvoided: string[];
  inviteNote: string;
  proposedSlotsByRequestId: Record<string, string>;
};

export type CalendarPayload = SerializedToolPayload & {
  data: {
    proposedMeetings: Array<{
      requestId: string;
      attendee: string;
      slotId: string;
      label: string;
      timezone: string;
    }>;
    conflictsAvoided: string[];
    inviteNote: string;
  };
};

export function createCalendarSeed(): CalendarSeed {
  return {
    events: [
      { id: "evt-1", title: "Client ops sync", window: "Tue 10:00 AM", timezone: "ET" },
      { id: "evt-2", title: "Founder review", window: "Tue 2:30 PM", timezone: "ET" },
      { id: "evt-3", title: "Supplier call", window: "Wed 9:00 AM", timezone: "PT" },
    ],
    holds: [
      { id: "hold-1", title: "Travel buffer", window: "Wed 4:00 PM", timezone: "CET" },
      { id: "hold-2", title: "Focus block", window: "Thu 11:00 AM", timezone: "ET" },
    ],
    timezoneConstraints: [
      "Sarah prefers ET afternoons.",
      "Mara cannot meet before 9:00 AM PT.",
      "Client-facing invites must include timezone labels.",
    ],
    requestedMeetings: [
      {
        id: "meet-1",
        attendee: "Sarah Jensen",
        durationMinutes: 30,
        preference: "Invoice dispute callback before Wednesday noon ET.",
        slots: [
          { id: "slot-1a", label: "Tue 2:30 PM ET", timezone: "ET", conflictsWith: ["evt-2"] },
          { id: "slot-1b", label: "Tue 4:00 PM ET", timezone: "ET", conflictsWith: [] },
          { id: "slot-1c", label: "Wed 10:30 AM ET", timezone: "ET", conflictsWith: [] },
        ],
      },
      {
        id: "meet-2",
        attendee: "Mara Chen",
        durationMinutes: 45,
        preference: "Weekly sync in her afternoon window.",
        slots: [
          { id: "slot-2a", label: "Wed 9:00 AM PT", timezone: "PT", conflictsWith: ["evt-3"] },
          { id: "slot-2b", label: "Wed 1:00 PM PT", timezone: "PT", conflictsWith: [] },
          { id: "slot-2c", label: "Thu 8:30 AM PT", timezone: "PT", conflictsWith: [] },
        ],
      },
      {
        id: "meet-3",
        attendee: "Lina Ramos",
        durationMinutes: 25,
        preference: "Avoid late CET hours.",
        slots: [
          { id: "slot-3a", label: "Wed 4:00 PM CET", timezone: "CET", conflictsWith: ["hold-1"] },
          { id: "slot-3b", label: "Thu 10:00 AM CET", timezone: "CET", conflictsWith: [] },
          { id: "slot-3c", label: "Thu 5:30 PM CET", timezone: "CET", conflictsWith: [] },
        ],
      },
    ],
  };
}

export function createCalendarInitialValue(seed: CalendarSeed): CalendarState {
  return {
    conflictsAvoided: [],
    inviteNote: "",
    proposedSlotsByRequestId: Object.fromEntries(
      seed.requestedMeetings.map((request) => [request.id, ""]),
    ),
  };
}

export function serializeCalendar(value: CalendarState, seed = createCalendarSeed()): CalendarPayload {
  return {
    toolType: "calendar",
    summary: "Calendar scheduling proposal",
    data: {
      proposedMeetings: seed.requestedMeetings.flatMap((request) => {
        const slotId = value.proposedSlotsByRequestId[request.id];
        const slot = request.slots.find((candidate) => candidate.id === slotId);
        if (!slot) return [];

        return [
          {
            requestId: request.id,
            attendee: request.attendee,
            slotId: slot.id,
            label: slot.label,
            timezone: slot.timezone,
          },
        ];
      }),
      conflictsAvoided: value.conflictsAvoided,
      inviteNote: value.inviteNote,
    },
  };
}
