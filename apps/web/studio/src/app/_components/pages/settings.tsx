import { PageHeader, Panel } from "../ui";

export function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Preferences"
        title="Settings"
        description="Profile, services, availability, billing, payouts, notifications, integrations, and security."
      />
      <div className="settings-grid">
        {[
          ["Profile", "Identity, public profile, and portfolio"],
          ["Services", "Skills, rates, and accepted work categories"],
          ["Availability", "Capacity, weekly hours, and vacation blocks"],
          ["Payouts", "Stripe account, tax details, and bank status"],
          ["Notifications", "Email, in-app, deadline, and agent alerts"],
          ["Integrations", "Calendar, files, CRM, and email connections"],
          ["Security", "Password, MFA, devices, and sessions"],
        ].map(([title, description]) => (
          <Panel title={title} key={title}>
            <p className="body-copy">{description}</p>
          </Panel>
        ))}
      </div>
    </>
  );
}
