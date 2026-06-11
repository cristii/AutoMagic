import { calendarEvents } from "../../_data/studio";
import { PageHeader, Panel } from "../ui";

export function CalendarPage() {
  const days = ["Mon 8", "Tue 9", "Wed 10", "Thu 11", "Fri 12"];

  return (
    <>
      <PageHeader
        eyebrow="Schedule"
        title="Calendar"
        description="Calls, task deadlines, accepted work, agent runs, and availability in a single week view."
      />
      <Panel title="This week" eyebrow="Jun 8 – 12">
        <div className="calendar-board">
          {days.map((day) => (
            <div className="calendar-day" key={day}>
              <strong>{day}</strong>
              <div>
                {calendarEvents
                  .filter((event) => event.day === day)
                  .map((event) => (
                    <span className={`calendar-chip ${event.tone} ${event.position}`} key={event.title}>
                      {event.title}
                    </span>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
