import type { InputHTMLAttributes, ReactNode, TextareaHTMLAttributes } from "react";

import { cx } from "./shared";

type FieldProps = {
  label: string;
  description?: string;
  error?: string;
  trailing?: ReactNode;
  className?: string;
};

export function Input({
  label,
  description,
  error,
  trailing,
  className,
  ...props
}: FieldProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className={cx("am-field", className)}>
      <span className="am-field-label">{label}</span>
      <span className="am-input-wrap">
        <input className="am-input" {...props} />
        {trailing ? <span className="am-input-trailing">{trailing}</span> : null}
      </span>
      {description ? <span className="am-field-description">{description}</span> : null}
      {error ? <span className="am-field-error">{error}</span> : null}
    </label>
  );
}

export function Textarea({
  label,
  description,
  error,
  className,
  ...props
}: FieldProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <label className={cx("am-field", className)}>
      <span className="am-field-label">{label}</span>
      <textarea className="am-input am-textarea" {...props} />
      {description ? <span className="am-field-description">{description}</span> : null}
      {error ? <span className="am-field-error">{error}</span> : null}
    </label>
  );
}
