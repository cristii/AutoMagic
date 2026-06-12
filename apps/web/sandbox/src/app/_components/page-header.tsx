import type { ReactNode } from "react";

import { sandboxRouteByHref, type SandboxRouteKey } from "../_data/routes";

type PageHeaderProps =
  | {
      route: SandboxRouteKey;
      title?: never;
      subtitle?: never;
      action?: ReactNode;
    }
  | {
      route?: never;
      title: string;
      subtitle: string;
      action?: ReactNode;
    };

export function PageHeader(props: PageHeaderProps) {
  const title = props.route ? sandboxRouteByHref(props.route).title : props.title;
  const subtitle = props.route ? sandboxRouteByHref(props.route).subtitle : props.subtitle;

  return (
    <header className="page-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      {props.action ? <div className="page-header-action">{props.action}</div> : null}
    </header>
  );
}
