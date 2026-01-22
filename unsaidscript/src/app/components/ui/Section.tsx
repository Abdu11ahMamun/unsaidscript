import React from "react";

type Props = React.HTMLAttributes<HTMLElement> & { id?: string };

export function Section({ id, className, ...props }: Props) {
  return <section id={id} className={className} {...props} />;
}
