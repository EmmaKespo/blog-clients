import { useEffect, useState, useCallback } from 'react';

export default function PostDetails({ post, onBack }) {
const [comments, setComments] = useState([]);
const [newComment, setNewComment] = useState("");
const [isSubmitting, setIsSubmitting] = useState(false);

// fetch comments specific to this post whenever the view mounts

// 1. Wrap the function in useCallback and use backticks for the URL string
const fetchComments = useCallback(async () => {
    try {
        // CHANGED: Uses backticks (`) so ${post.id} works dynamically
        const res = await fetch(`http://localhost:3000/api/posts/${post.id}/comments`);
        const data = await res.json();
        setComments(data);
    } catch (error){
        console.error("error loading conversation threads:", error);
    }
}, [post.id]); // Re-runs function definition only if post.id changes

useEffect(() => {
    const timer = setTimeout(() => {
        fetchComments();
    }, 0);

    return () => clearTimeout(timer);
}, [fetchComments]); // Safe dependency array

 // submit viewer comment payload
 const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setIsSubmitting(true);
    try{
    const res = await fetch('http://localhost:3000/api/posts/${post.id}/comments', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ content: newComment }), //match Zod schema requirement
    });
    if (res.ok) {
        setNewComment(''); // wipe out text content area box upon succesful save
        fetchComments(); // refresh thread listing to display newly added entry at the bottom
    } else {
       const errorData = await res.json();
       alert(errorData.errors?.[0]?.message || "failed to submit comment.");
    }

    } catch (error){
        console.err("error issue submitting feedback:", error);
    
 } finally {
    setIsSubmitting(false);
 }
};
 return (
    <div className="max-w-2.5 mx-auto bg-slate-900 border border-slate-500 rounded-2xl p-6 md:p-8 shadow-xl">
        {/* top header return toolbar navigation row */}
        <button onClick={onBack} className="text-sm text-slate-300 hover:text-white transition-colors mb-6 flex items-center gap-1">
            ...Return to Reading feed
        </button>
        {/* Main blog post core text reprensentation */}
        <article className="border-b border-slate-800 pb-8 mb-8">
             <span className="text-xs font-semibold bg-indigo-900 text-indigo-300 border border-indigo-800 px-3 py-1 rounded-full">
                published {new Date(post.createdAt).toLocaleDateString()}
             </span>
             <hi className="text-3xl font-extrabold text-white mt-4 tracking-tight leading-tight">{post.title}</hi>
             <p className="text-slate-400 leading-relaxed whitespace-pre-line mt-6 text-base">{post.content} </p>
        </article>

        {/* comments panel module */}
        <section space-y-6 >
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
                comments ({comments.length})
            </h3>
        

        {/* form submission */}
        <form onSubmit={handleCommentSubmit} className="space-y-4">
           <textarea
           value={newComment}
           onChange={(e) => setNewComment(e.target.value)}
           placeholder="Type your thought anonymously"
           rows="3"
           className="w-full bg-slate-800 border border-slate-600 text-white rounded-xl p-3 focus:outline-none focus:border-indigo-200 text-sm transition-colors"
           required
           disabled={isSubmitting}
           />
           <div className="flex justify-end">
            <button 
            type="submit"
            disabled={isSubmitting || !newComment.trim()}
            className="bg-indigo-600 hover:bg-indigo-400 disabled:bg-indigo-700 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-all shadow-md"
            >
                {isSubmitting ? 'posting...' : 'post Comment'}
            </button>
           </div>
        </form>

        {/* Existing  Historical comment thread nodes rendering flow */}
        <div className="space-y-4 pt-4 border-t border-slate-700">
            {comments.length === 0 ? (
              <p className="text-sm text-slate-500 italic text-center py-4">No comment yet, Be the first to comment!</p>
            ) : (
        comments.map((comment) => (
            <div key={comment.id} className="bg-slate-800 border border-slate-400 p-4 rounded-xl shadow-inner">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-semibold text-slate-400">Anonymous reader</span>
                    <span className="text-[11px] text-slate-400">
                       {/* prints custom formating style matching authour request criteria */}
                       {new Date(comment.createAt).toLocaleString([], { hour: '2-digit', minutes: "2-digits", month: 'short', day: 'numeric'  }  ) }

                    </span>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{comment.content}  </p>
                    </div>
        )
        
        )


            )
        }
        </div>
        </section>






    </div>

 )



}