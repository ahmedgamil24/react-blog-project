import React from 'react';

import { EditIcon, TrashIcon } from 'lucide-react';

export default function PostCard({ post, currentUser, onDelete, onEdit }) {
  const isOwner = currentUser?.email === post.email;


  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-colors duration-300 flex flex-col h-full">
      {post.image && (
        <div className="h-48 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      )}
      <div className="p-5 flex-grow flex flex-col">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{post.title}</h2>
        <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow">{post.description}</p>
        <div className="flex items-center justify-between mt-auto">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            <span className="font-medium text-gray-700 dark:text-gray-300">{`By: ${post.username}`}</span>

          </div>
          {isOwner && (
            <div className="flex space-x-2 ">
              <button variant="outline" size="sm" onClick={() => onEdit(post)} aria-label="Edit post">
                <EditIcon className="h-4 w-4 cursor-pointer  text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400" />
              </button>
              <button variant="danger" size="sm" onClick={() => onDelete(post.id)} aria-label="Delete post">
                <TrashIcon className="h-4 w-4 cursor-pointer  text-gray-600 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
