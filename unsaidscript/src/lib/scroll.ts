export function scrollToHash(href: string) {
  if (!href?.startsWith("#")) return;

  const id = href.slice(1);
  const el = document.getElementById(id);
  if (!el) return;

  el.scrollIntoView({ behavior: "smooth", block: "start" });
}
