import { notifications } from "../../_data/studio";
import { PageHeader, Panel, StatusPill, type StatusTone } from "../ui";

export function NotificationsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Alerts"
        title="Notifications"
        description="Task changes, client messages, proposal updates, payments, deadlines, and agent runs."
      />
      <Panel title="Today" action={{ href: "/settings/notifications", label: "Notification settings" }}>
        <div className="notification-list">
          {notifications.map((notification) => (
            <div className={`notification-row ${notification.tone}`} key={notification.title}>
              <span />
              <div>
                <strong>{notification.title}</strong>
                <small>{notification.detail}</small>
              </div>
              <StatusPill tone={notification.tone as StatusTone}>{notification.type}</StatusPill>
              <time>{notification.time}</time>
              {notification.unread ? <b /> : null}
            </div>
          ))}
        </div>
      </Panel>
    </>
  );
}
