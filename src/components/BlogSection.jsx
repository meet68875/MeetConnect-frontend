// src/components/BlogSection.jsx
import React from "react";

export const BlogSection = ({ blogs }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Relevant Blogs</h3>
      <ul className="space-y-4">
        {blogs.map((blog) => (
          <li key={blog.id}>
            <a
              href={blog.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              {blog.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
