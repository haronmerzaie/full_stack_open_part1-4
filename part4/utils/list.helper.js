const _ = require('lodash');

// Dummy function for testing
const dummy = (blogs) => {
    return 1;
}

// Calculates the total likes for all blogs
const totalLikes = (blogs) => {
    return blogs.reduce((accu, curr) => accu + curr.likes, 0) || 0;
}

// Returns the blog with the highest likes, omitting certain properties
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return {};

    const topBlog = blogs.reduce((a, c) => (c.likes > a.likes ? c : a));
    const { _id, url, __v, ...topBlogProps } = topBlog;

    return topBlogProps;
};

// Finds the author with the most blogs
const mostBlogs = (blogs) => {
    const authorWithMostBlogs = _
    .chain(blogs)
    .countBy('author')
    .map((blogs, author) => ({ author, blogs }))
    .sortBy('blogs')
    .last()
    .value()
    return authorWithMostBlogs
}

// Finds the author with the most likes
const mostLikes = (blogs) => {
    return _.chain(blogs)
            .groupBy('author')
            .map((obj, key) => ({ 'author': key, 'likes': _.sumBy(obj, 'likes') }))
            .sortBy('likes')
            .last()
            .value();
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};
