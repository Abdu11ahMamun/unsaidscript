import { cn } from "../../lib/cn";

export function Section({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative", className)}>
      {children}
    </section>
  );
}
