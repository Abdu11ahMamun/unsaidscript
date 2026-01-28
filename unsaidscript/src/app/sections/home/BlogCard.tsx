import type { BlogPost } from "../../../content/blog";

export function BlogCard({ post, onRead }: { post: BlogPost; onRead: () => void }) {
  return (
    <button
      onClick={onRead}
      className="group w-full text-left rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl transition hover:border-white/20"
    >
      <div className="flex items-center gap-3 text-xs text-white/60">
        <span>{post.date}</span>
        <span className="text-white/30">•</span>
        <span>{post.readTime}</span>
      </div>

      <h3 className="mt-3 text-xl font-black text-white group-hover:text-white/95">{post.title}</h3>
      <p className="mt-3 text-sm text-white/70">{post.excerpt}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {post.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 text-sm font-bold text-cyan-300">Read Article →</div>
    </button>
  );
}
