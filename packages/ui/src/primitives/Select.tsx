import type { SelectHTMLAttributes } from "react";

import { cx } from "./shared";

export type SelectOption = {
  value: string;
  label: string;
};

export function Select({
  label,
  description,
  options,
  className,
  ...props
}: {
  label: string;
  description?: string;
  options: SelectOption[];
  className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <label className={cx("am-field", className)}>
      <span className="am-field-label">{label}</span>
      <select className="am-input am-select" {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {description ? <span className="am-field-description">{description}</span> : null}
    </label>
  );
}
