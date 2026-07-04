import { useState, useEffect } from "react"
import BlogFeed from "./components/BlogFeed"
import PostDetails from "./components/PostDetails"


export default function App(){
    const [posts, setPost] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    useEffect(() => {
        // collect all records targetting public readers list
        fetch('http://localhost:3000/api/post')
        .then(res => res.json())
        .then(data => setPost(data))
        .catch(err => console.error("Error parsing posts feed items:", err));
    },[])

    return(
        <div className="min-h-screen  bg-slate-950 text-slate-100 p-4 sm:p-6 lg:p-8 font-sans">
           <header className="max-w-2xl mx-auto text-center mb-8"> 
               <h1 className="text-3xl font-bold">Blog</h1>
                <p className="text-slate-400 text-sm mt-2">Welcome to my blog!</p>
           </header>
        <main>
          {selectedPost ? (
            <PostDetails post={selectedPost} onBack={() => setSelectedPost(null)} />
          ) : (
            <BlogFeed posts={posts} onSelectClick={(post) => setSelectedPost(post)} />
          )}

        </main>





        </div>
    );
}