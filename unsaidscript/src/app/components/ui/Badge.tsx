type Props = {
  children: React.ReactNode;
};

export function Badge({ children }: Props) {
  return (
    <span className="rounded-lg border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/75">
      {children}
    </span>
  );
}
