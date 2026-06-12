import { Badge, Button, Card, Input, Select } from "@automagic/ui";

import { PageHeader } from "../../_components/page-header";
import { providers } from "../../_data/sandbox";

export default function SettingsPage() {
  return (
    <div className="sandbox-page">
      <PageHeader route="/settings" />

      <section className="provider-grid">
        <Card title="AI providers" eyebrow="Bring your own key">
          <ul className="provider-list">
            {providers.map((provider) => (
              <li className="provider-row" key={provider.id}>
                <div className="inline-row">
                  <strong>{provider.label}</strong>
                  <Badge tone={provider.status === "connected" ? "success" : "neutral"}>
                    {provider.status === "connected"
                      ? `connected · ${provider.keySuffix}`
                      : "not connected"}
                  </Badge>
                  {provider.isDefault ? <Badge tone="accent">default</Badge> : null}
                </div>
                <p className="muted">Model: {provider.model}</p>
                <div className="inline-row">
                  <Button size="sm" label={provider.status === "connected" ? "Rotate key" : "Add key"} />
                  <Button size="sm" label="Set default" />
                </div>
              </li>
            ))}
          </ul>
        </Card>

        <Card title="Add or rotate key" eyebrow="Secrets never leave API">
          <div className="progress-list">
            <Select
              label="Provider"
              defaultValue="anthropic"
              options={[
                { value: "anthropic", label: "Anthropic" },
                { value: "openai", label: "OpenAI" },
                { value: "deepseek", label: "DeepSeek" },
              ]}
            />
            <Input label="API key" type="password" placeholder="Paste provider key" />
            <Input label="Default model" defaultValue="claude-sonnet" />
            <p className="schema-note">
              Save calls a cheap validation ping. The list endpoint returns provider, suffix,
              default model, default status, and connection status only.
            </p>
            <Button variant="primary" label="Validate and save key" />
          </div>
        </Card>
      </section>

      <Card title="Simulator" eyebrow="Mission controls">
        {[
          ["Live coach hints during missions", true],
          ["Timed missions", true],
          ["Difficulty auto-adjusts to skill level", false],
        ].map(([label, enabled]) => (
          <div className="settings-row" key={String(label)}>
            <span>{label}</span>
            <span className={`toggle ${enabled ? "on" : ""}`} aria-hidden="true">
              <span />
            </span>
          </div>
        ))}
      </Card>

      <Card title="Account, notifications, billing" eyebrow="MVP stubs">
        <p className="muted">
          These sections are present in the navigation contract, but billing remains later scope for
          the sandbox MVP.
        </p>
      </Card>
    </div>
  );
}
