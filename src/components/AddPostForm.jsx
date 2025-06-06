import { useState } from "react";
import { XIcon } from "lucide-react";
import { Navigate, useNavigate } from "react-router-dom";

export default function AddPostForm({ onAddPost, onUpdatePost, user, editingPost, cancelEdit }) {
  const [title, setTitle] = useState(editingPost?.title || "");
  const [description, setDescription] = useState(editingPost?.description || "");
  const [content, setContent] = useState(editingPost?.content || "");
  const [imageUrl, setImageUrl] = useState(editingPost?.image || "");
  const [uploading, setUploading] = useState(false);
  const Navigate = useNavigate()

  const API_KEY = "0fa11b01df99731c4407cee233288a69";

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    setUploading(true);
    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const data = await res.json();
      setImageUrl(data.data.url); 
    } catch (err) {
      console.error("Upload error", err);
      alert("Image upload failed!");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !content || !imageUrl) {
      alert("Please fill all fields and upload an image.");
      return;
    }

    const postData = {
      id: editingPost ? editingPost.id : Date.now(),
      title,
      description,
      content,
      image: imageUrl,
      email: user.email,
      username: user.username,
    };

    if (editingPost) {
      onUpdatePost(postData);
    } else {
      onAddPost(postData);
    }

    setTitle("");
    setDescription("");
    setContent("");
    setImageUrl("");

    Navigate("/")
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-300">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              {editingPost ? "Edit Post" : "Create New Post"}
            </h2>
            <button onClick={cancelEdit} className=" text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors" aria-label="Close">
              <XIcon className="h-6 w-6" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Title"
              required
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              placeholder="Description"
              required
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <textarea
              placeholder="Content"
              required
              className="w-full border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
            <input
              type="file"
              accept="image/*"
              className="w-52 px-2 py-2 dark:text-slate-200 cursor-pointer border rounded "
              onChange={(e) => {
                if (e.target.files?.length) {
                  uploadImage(e.target.files[0]);
                }
              }}
            />

            {uploading && <p className="text-blue-600">Uploading image...</p>}

            {imageUrl && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Preview</p>
                <div className="h-40 overflow-hidden rounded-md">
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "https://via.placeholder.com/640x360?text=Invalid+Image+URL";
                    }}
                  />
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 mt-6">
              {editingPost && (
                <button type="button" onClick={cancelEdit} className="bg-gray-400 text-white px-4 py-2 rounded-md hover:bg-gray-500 transition">
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition"
                disabled={uploading}
              >
                {editingPost ? "Update Post" : "Create Post"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
