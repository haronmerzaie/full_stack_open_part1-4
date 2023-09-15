import React, { useState } from 'react';
import blogService from '../services/blogs';

// Blog component which represents each individual blog in the application
const Blog = ({ blog, setBlogs, username }) => {
  // State to manage the visibility of blog details
  const [showDetails, setShowDetails] = useState(false);

  // Style for each blog item
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  // Handler for when the like button is clicked
  const handleLikeClicked = async () => {
    // Formulate the updated blog data
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      id: undefined,
      user: blog.user?.id,
    };

    // Update the blog on the server side
    await blogService.update(updatedBlog, blog.id);

    // Update the local blogs state
    setBlogs(prevBlogs => {
      const index = prevBlogs.indexOf(blog);
      prevBlogs[index] = { ...blog, likes: blog.likes + 1 };
      return [...prevBlogs];
    });
  };

  // Handler for when the remove button is clicked
  const handleRemoveClicked = async () => {
    // Ask for user confirmation before removing
    if (confirm(`Remove blog ${blog.title} by ${blog.author}?`)) {
      try {
        // Attempt to remove the blog from the server side
        await blogService.remove(blog.id);
        // Update the local blogs state to exclude the removed blog
        setBlogs(prevBlogs => prevBlogs.filter(b => b !== blog));
      } catch (error) {
        // Log errors to the console
        console.error(error);
      }
    }
  };

  // Render the blog component
  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      {/* Toggle button to show or hide blog details */}
      <button id="showExtraBtn" onClick={() => setShowDetails(!showDetails)}>
        {showDetails ? 'hide' : 'view'}
      </button>

      {/* Render blog details if showDetails is true */}
      {showDetails && (
        <div id='extraInfo'>
          <p>{blog.url}</p>
          <p>
            likes <span id="likes">{blog.likes}</span>
            <button id="likeBtn" onClick={handleLikeClicked}>like</button>
          </p>
          <p>{blog.user?.name}</p>
          {/* Show remove button only if the blog belongs to the currently logged-in user */}
          {blog.user?.username === username && (
            <button id="removeBtn" onClick={handleRemoveClicked}>remove</button>
          )}
        </div>
      )}
    </div>
  );
}

// Export the Blog component for use in other parts of the application
export default Blog;
