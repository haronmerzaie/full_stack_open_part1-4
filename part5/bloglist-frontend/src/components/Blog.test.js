// Importing required libraries and components
import React from "react";
import "@testing-library/jest-dom";
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import BlogForm from "./BlogForm";
import blogService from '../services/blogs';

// Mocking the blog services module for isolated testing
jest.mock('../services/blogs');

// Test suite for the Blog component
describe('Blog Component Tests', () => {
  // Sample blog data for testing
  const mockBlog = {
    title: "Component testing is done with react-testing-library",
    author: "me",
  };

  // Check if the component correctly renders content
  test("renders content", () => {
    render(<Blog blog={mockBlog} />);
    expect(screen.getByText(/Component testing is done with react-testing-library/)).toBeDefined();
  });

  // Check if the component renders only title and author by default and hides the URL
  test("renders blog's title and author only and hides url", () => {
    const testBlog = {
      ...mockBlog,
      url: "not displayed",
    };

    render(<Blog blog={testBlog} />);
    expect(screen.queryByText("not displayed")).not.toBeInTheDocument();
    expect(screen.getByText("view")).toBeInTheDocument();
  });

  // Test visibility of URL after the "view" button is clicked
  test("url is shown after clicking the 'view' button", async () => {
    const testBlog = {
      ...mockBlog,
      url: "not displayed",
    };

    render(<Blog blog={testBlog} />);
    userEvent.click(screen.getByText("view"));
    expect(screen.getByText("not displayed")).toBeInTheDocument();
  });

  // Mock function to simulate blog updates and a sample blog data
  const mockSetBlogs = jest.fn();
  const dummyBlog = {
    title: "Test Blog",
    author: "Test Author",
    likes: 5,
    user: { id: '123', username: 'testUser', name: 'Test User' },
  };

  // Test if clicking the "like" button multiple times invokes the handler multiple times
  test('like button clicked twice calls event handler twice', async () => {
    jest.clearAllMocks();
    blogService.update.mockResolvedValue();

    render(<Blog blog={dummyBlog} setBlogs={mockSetBlogs} username="testUser" />);
    userEvent.click(screen.getByText('like'));
    userEvent.click(screen.getByText('like'));

    await waitFor(() => {
      expect(blogService.update).toHaveBeenCalledTimes(2);
    });
  });
});

// Test suite for the BlogForm component
describe('BlogForm Component Tests', () => {
  
  // Check if form submission correctly triggers the create blog handler with appropriate values
  test('submitting the form calls event handler with right details', () => {
    const createBlogMock = jest.fn();
    render(<BlogForm createBlog={createBlogMock} />);
    
    fireEvent.change(screen.getByLabelText('title:'), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText('author'), { target: { value: 'Test Author' } });
    fireEvent.change(screen.getByLabelText('url'), { target: { value: 'http://test.url' } });
    
    fireEvent.submit(screen.getByLabelText('title:'));
    
    expect(createBlogMock).toHaveBeenCalledWith({
      title: 'Test Title',
      author: 'Test Author',
      url: 'http://test.url',
    });
  });
});
