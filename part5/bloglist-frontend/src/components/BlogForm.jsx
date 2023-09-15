import React, { useState } from 'react';

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
  });

  // Handle form submission
  const addBlog = (event) => {
    event.preventDefault();
    createBlog(newBlog);
    setNewBlog({
      title: "",
      author: "",
      url: "",
    });
  };

  // Update the state based on input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewBlog((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  
  // Render the form
  return (
    <form onSubmit={addBlog}>
      <h1>create new</h1>
      <div>
        <label htmlFor="title">title:</label>
        <input
          id="title"
          type="text"
          value={newBlog.title}
          name="title"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="author">author</label>
        <input
          id="author"
          type="text"
          value={newBlog.author}
          name="author"
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label htmlFor="url">url</label>
        <input
          id="url"
          type="text"
          value={newBlog.url}
          name="url"
          onChange={handleInputChange}
        />
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;