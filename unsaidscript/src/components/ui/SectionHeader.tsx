type Props = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeader({ eyebrow, title, subtitle, align = "center" }: Props) {
  const alignCls = align === "left" ? "text-left" : "text-center";
  return (
    <div className={alignCls}>
      {eyebrow ? (
        <div className="mb-4 inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80">
          {eyebrow}
        </div>
      ) : null}

      <h2 className="text-3xl font-black tracking-tight text-white md:text-5xl">{title}</h2>

      {subtitle ? <p className="mx-auto mt-4 max-w-2xl text-base text-white/60 md:text-lg">{subtitle}</p> : null}
    </div>
  );
}
