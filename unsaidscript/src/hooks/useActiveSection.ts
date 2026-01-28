import { useEffect, useState } from "react";

export function useActiveSection(ids: string[], rootMargin = "-40% 0px -55% 0px") {
  const [active, setActive] = useState<string>(ids[0] ?? "");

  useEffect(() => {
    if (typeof window === "undefined") return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (els.length === 0) return;

    const io = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (!vis.length) return;

        // pick the most visible
        vis.sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0));
        setActive((vis[0].target as HTMLElement).id);
      },
      { root: null, rootMargin, threshold: [0.1, 0.2, 0.35, 0.5, 0.65] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids, rootMargin]);

  return active;
}
