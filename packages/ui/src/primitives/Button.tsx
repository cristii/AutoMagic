import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

import { cx } from "./shared";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "sm" | "md";

type BaseButtonProps = {
  children?: ReactNode;
  label?: string;
  icon?: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
};

type NativeButtonProps = BaseButtonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
  };

type LinkButtonProps = BaseButtonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className" | "type"> & {
    href: string;
  };

export type ButtonProps = NativeButtonProps | LinkButtonProps;

export function Button({
  children,
  label,
  icon,
  variant = "secondary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  const content = (
    <>
      {icon ? <span className="am-button-icon">{icon}</span> : null}
      <span>{children ?? label}</span>
    </>
  );
  const classes = cx("am-button", `am-button-${variant}`, `am-button-${size}`, className);

  if (isLinkButtonProps(props)) {
    return (
      <a className={classes} {...props}>
        {content}
      </a>
    );
  }

  const buttonProps = props as NativeButtonProps;

  return (
    <button {...buttonProps} className={classes} type={buttonProps.type ?? "button"}>
      {content}
    </button>
  );
}

function isLinkButtonProps(props: ButtonProps): props is LinkButtonProps {
  return typeof props.href === "string";
}
