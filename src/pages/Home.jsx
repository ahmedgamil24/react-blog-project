import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import AddPostForm from "../components/AddPostForm";
import PostCard from "../components/PostCard";
import { PlusIcon } from "lucide-react";

export default function Home() {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState(null);

  // Load posts from localStorage
  useEffect(() => {
    const savedPosts = JSON.parse(localStorage.getItem("posts")) || [];
    setPosts(savedPosts);
  }, []);

  // Function to add a new post
  const handleAddPost = (newPost) => {
    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem("posts", JSON.stringify(updatedPosts));
    setShowForm(false);
  };

  // Function to delete post
  const handleDeletePost = (id) => {
    const updated = posts.filter(post => post.id !== id);
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
  };

  const handleEditPost = (post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleUpdatePost = (updatedPost) => {
    const updated = posts.map(post =>
      post.id === updatedPost.id ? updatedPost : post
    );
    setPosts(updated);
    localStorage.setItem("posts", JSON.stringify(updated));
    setEditingPost(null);
    setShowForm(false);
  };

  return (
    <div className="dark:bg-[#0a243f] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8 ">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Latest Posts
        </h1>
        {user && (
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 cursor-pointer rounded-full shadow-md transition-colors dark:bg-blue-700 dark:hover:bg-blue-600"
            aria-label={showForm ? "Cancel" : "Create new post"}
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">No posts yet.</p>
          {user && (
            <p className="mt-2 text-gray-500 dark:text-gray-500">
              Be the first to create a post!
            </p>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              currentUser={user}
              onDelete={handleDeletePost}
              onEdit={handleEditPost}
            />
          ))}
        </div>
      )}

      {(showForm || editingPost) && (
        <AddPostForm
          onAddPost={handleAddPost}
          user={user}
          editingPost={editingPost}
          onUpdatePost={handleUpdatePost}
          cancelEdit={() => {
            setEditingPost(null);
            setShowForm(false);
          }}
        />
      )}
    </div>
  );
}
