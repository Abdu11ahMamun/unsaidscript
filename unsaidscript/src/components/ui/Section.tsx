
import React from "react";

type SectionProps = React.PropsWithChildren<{ className?: string }>;

export function Section({ children, className = "" }: SectionProps) {
	return <section className={className}>{children}</section>;
}

export default Section;
