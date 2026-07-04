export default function BlogFeed({ posts, onSelectPost }) {
    if (posts.length === 0) {
        return(
            <div className="text-center py-12 text-slate-500">
                No articles have been published. checkout soon!
            </div>
        );
    }

return(
    <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">

{posts.map((post) => (
  <div
  key={post.id}
  className="bg-slate-700 border border-slate-600 rounded-2xl p-6 shadow-md hover:border-indigo-400 transition-all cursor-pointer group"
  onClick={() => onSelectPost(post)} //clicking anywhere opens the full article
  >
    <span className="text-xs text-indigo-400 font-medium">
        {new Date(post.createdAt).toLocaleDateString()}
    </span>
    <h2 className="text-xl font-bold text-white mt-2 group-hover:text-indigo-500">
        {post.title}
    </h2>
    <p className="text-slate-400 text-sm mt-3 line-clamp-4">
        {post.content}
    </p>
    <div className="text-indigo-700 font-semibold text-xs mt-4 flex items-center gap-2 group-hover:translate-x-1 transiform-transform">
        Read article and comment ---
    </div>
</div>
))}
</div>

);
}
