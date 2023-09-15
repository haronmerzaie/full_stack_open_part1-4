// Tests for the Blog application

// Base URLs for backend and frontend services
describe('Blog app', function() {
  const baseURL = 'http://localhost:3001/api';
  const frontEndURL = 'http://localhost:3000';

  // Default user and blog details used for testing
  const user = {
    name: 'admin',
    username: 'admin',
    password: 'admin'
  };
  const blogDetails = {
    title: 'First class tests',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html'
  };

  // Pre-test setup: Reset the backend state and ensure user is created
  beforeEach(function() {
    cy.request('POST', `${baseURL}/testing/reset`);
    cy.request('POST', `${baseURL}/users`, user);
    cy.visit(frontEndURL);
  });

  // Test to check if the login form is visible
  it('Login form is shown', function() {
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  // Test cases related to login functionality
  describe('Login', function() {
    // Successful login
    it('succeeds with correct credentials', function() {
      cy.contains('login').click();
      cy.get('#username').type(user.username);
      cy.get('#password').type(user.password);
      cy.get('#login-button').click();
      cy.contains('haron merzaie logged in');
    });

    // Failed login due to incorrect password
    it('fails with wrong password', function() {
      cy.contains('login').click();
      cy.get('#username').type(user.username);
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();

      cy.get('#error')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)');
      
      cy.get('html').should('not.contain', 'haron merzaie logged in');
    });
  });

  // Test cases when the user is logged in
  describe('when logged in', function() {
    beforeEach(function() {
      cy.login(user);
    });

    it('a new blog can be created', function() {
      cy.contains('Add new blog').click();
      cy.get('#title').type(blogDetails.title);
      cy.get('#author').type(blogDetails.author);
      cy.get('#url').type(blogDetails.url);
      cy.contains('add').click();

      cy.contains(`${blogDetails.title} - ${blogDetails.author}`);
    });

    it('user can like a blog', function() {
      cy.createBlog(blogDetails);
      cy.contains(`${blogDetails.title} - ${blogDetails.author}`).click();
      cy.contains('view').click();
      cy.get('#like-button').click();
      cy.contains('1');
    });

    it('user who created a blog can delete it', function() {
      cy.createBlog(blogDetails);
      cy.contains(`${blogDetails.title} - ${blogDetails.author}`).click();
      cy.contains('view').click();
      cy.get('#remove').click();

      cy.get('html').should('not.contain', `${blogDetails.title} - ${blogDetails.author}`);
    });
  });

  // Test the ordering of blogs based on likes
  describe('Blogs ordered by number of likes', function() {
    const blogs = [
      { author: 'John Doe', title: 'test1', url: 'http://example.com./test1' },
      { author: 'John Doe', title: 'test2', url: 'http://example.com./test2' },
      { author: 'Jane Doe', title: 'test3', url: 'http://example.com./test3' }
    ];

    beforeEach(function() {
      cy.login({ username: user.username, password: user.password });

      blogs.forEach(blog => {
        cy.createBlog(blog);
        cy.contains(blog.title).parent().parent().as(blog.title);
      });
    });

    it('they are ordered by number of likes', function() {
      blogs.forEach(blog => {
        cy.get(`@${blog.title}`).contains('view').click();
      });

      cy.get('@test2').contains('like').click().wait(500);
      cy.get('@test1').contains('like').click().click().wait(500);
      cy.get('@test3').contains('like').click().click().click().wait(500);

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('3');
        cy.wrap(blogs[1]).contains('2');
        cy.wrap(blogs[2]).contains('1');
      });
    });
  });
});
