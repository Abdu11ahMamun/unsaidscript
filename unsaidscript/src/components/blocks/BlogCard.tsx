import type { BlogPost } from "../../content/blog";
import { Card } from "../../app/components/ui/Card";


type Props = {
  post: BlogPost;
  onOpen: (post: BlogPost) => void;
};

export function BlogCard({ post, onOpen }: Props) {
  const g = post.gradient ?? "from-cyan-500 to-blue-600";

  return (
    <button
      type="button"
      onClick={() => onOpen(post)}
      className="group text-left"
    >
      <div className="relative">
        <div
          className={[
            "absolute inset-0 rounded-3xl bg-gradient-to-r opacity-0 blur-2xl transition-opacity",
            "group-hover:opacity-25",
            g,
          ].join(" ")}
        />
        <Card className="relative overflow-hidden p-0">
          <div className={["relative h-44 bg-gradient-to-br", g].join(" ")}>
            <div className="absolute inset-0 bg-black/35" />
            <div className="relative flex h-full items-center justify-center p-6 text-center">
              <h3 className="text-2xl font-black text-white line-clamp-3">{post.title}</h3>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center gap-4 text-xs text-white/60">
              <span>{post.date}</span>
              <span className="text-white/30">•</span>
              <span>{post.readTime}</span>
            </div>

            <p className="mt-4 text-sm text-white/70 line-clamp-3">{post.excerpt}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-white/70"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="mt-6 text-sm font-bold text-white/80 transition group-hover:text-white">
              Read Article →
            </div>
          </div>
        </Card>
      </div>
    </button>
  );
}
