import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Container({ className, ...props }: Props) {
  return <div className={`mx-auto w-full max-w-7xl px-6 ${className ?? ""}`} {...props} />;
}
