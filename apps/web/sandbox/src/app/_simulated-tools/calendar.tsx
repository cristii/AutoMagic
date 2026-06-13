import { Badge, Button, Select, Textarea } from "@automagic/ui";

import {
  createCalendarInitialValue,
  createCalendarSeed,
  serializeCalendar,
  type CalendarSeed,
  type CalendarState,
} from "./calendar.logic";
import type { SimulatedToolDefinition } from "./types";

export const calendarTool: SimulatedToolDefinition<
  CalendarSeed,
  CalendarState,
  ReturnType<typeof serializeCalendar>
> = {
  type: "calendar",
  label: "Calendar",
  description: "Practice timezone-aware scheduling, conflict checks, and invite notes.",
  seedData: createCalendarSeed,
  initialValue: createCalendarInitialValue,
  Surface: CalendarSurface,
  serialize: serializeCalendar,
};

function CalendarSurface({
  seed,
  value,
  onChange,
}: {
  seed: CalendarSeed;
  mode: "mission" | "freeplay";
  value: CalendarState;
  onChange: (value: CalendarState) => void;
}) {
  const allBusyItems = [...seed.events, ...seed.holds];
  const selectedSlots = seed.requestedMeetings.flatMap((request) => {
    const selectedSlotId = value.proposedSlotsByRequestId[request.id];
    const slot = request.slots.find((candidate) => candidate.id === selectedSlotId);
    return slot ? [slot] : [];
  });
  const conflictIds = Array.from(new Set(selectedSlots.flatMap((slot) => slot.conflictsWith)));

  const updateProposedSlot = (requestId: string, slotId: string) => {
    onChange({
      ...value,
      proposedSlotsByRequestId: {
        ...value.proposedSlotsByRequestId,
        [requestId]: slotId,
      },
    });
  };

  const toggleConflictAvoided = (conflictId: string) => {
    onChange({
      ...value,
      conflictsAvoided: value.conflictsAvoided.includes(conflictId)
        ? value.conflictsAvoided.filter((id) => id !== conflictId)
        : [...value.conflictsAvoided, conflictId],
    });
  };

  return (
    <div className="tool-window">
      <div className="tool-list" aria-label="Calendar conflicts">
        {allBusyItems.map((event) => (
          <div key={event.id}>
            <strong>{event.title}</strong>
            <span>
              {event.window} {event.timezone}
            </span>
          </div>
        ))}
      </div>
      <div className="tool-workspace">
        <div className="section-stack">
          <div className="chip-list">
            {seed.timezoneConstraints.map((constraint) => (
              <span className="chip" key={constraint}>
                {constraint}
              </span>
            ))}
          </div>
          {seed.requestedMeetings.map((request) => {
            const selectedSlotId = value.proposedSlotsByRequestId[request.id] ?? "";
            const selectedSlot = request.slots.find((slot) => slot.id === selectedSlotId);
            const hasConflict = Boolean(selectedSlot?.conflictsWith.length);

            return (
              <div className="tool-subpanel" key={request.id}>
                <div>
                  <h3>{request.attendee}</h3>
                  <p className="muted">
                    {request.durationMinutes} min · {request.preference}
                  </p>
                </div>
                <Select
                  label="Proposed slot"
                  onChange={(event) => updateProposedSlot(request.id, event.currentTarget.value)}
                  options={[
                    { label: "Choose a slot", value: "" },
                    ...request.slots.map((slot) => ({
                      label: `${slot.label}${slot.conflictsWith.length ? " (conflict)" : ""}`,
                      value: slot.id,
                    })),
                  ]}
                  value={selectedSlotId}
                />
                {selectedSlot ? (
                  <Badge tone={hasConflict ? "danger" : "success"}>
                    {hasConflict ? "Conflict needs avoidance" : "No conflict"}
                  </Badge>
                ) : null}
              </div>
            );
          })}
        </div>
        {conflictIds.length ? (
          <div className="section-stack">
            <strong>Conflicts avoided</strong>
            <div className="inline-row">
              {conflictIds.map((conflictId) => {
                const conflict = allBusyItems.find((event) => event.id === conflictId);
                return (
                  <Button
                    key={conflictId}
                    label={conflict?.title ?? conflictId}
                    onClick={() => toggleConflictAvoided(conflictId)}
                    size="sm"
                    variant={value.conflictsAvoided.includes(conflictId) ? "primary" : "secondary"}
                  />
                );
              })}
            </div>
          </div>
        ) : null}
        <Textarea
          label="Invite note"
          onChange={(event) => onChange({ ...value, inviteNote: event.currentTarget.value })}
          placeholder="Confirm proposed slots with clear timezone labels..."
          value={value.inviteNote}
        />
      </div>
    </div>
  );
}
