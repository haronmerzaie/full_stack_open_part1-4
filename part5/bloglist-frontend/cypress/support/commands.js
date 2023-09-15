// Define a constant key for storing logged-in user data in local storage
const STORAGE_KEY = 'blogAppLoggedUser';

// Add a new Cypress command for user login
Cypress.Commands.add('login', ({ username, password }) => {
  const apiBaseURL = 'http://localhost:3001/api';

  // Make a POST request to login and on success, store the user data in local storage and visit the main page
  cy.request('POST', `${apiBaseURL}/login`, { username, password })
    .then(({ body }) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(body));
      cy.visit('http://localhost:3000');
    });
});

// Add a new Cypress command to create a blog
Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  const apiBaseURL = 'http://localhost:3001/api';

  // Make a POST request to create a blog using the user's authentication token from local storage
  cy.request({
    url: `${apiBaseURL}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem(STORAGE_KEY)).token}`
    }
  });

  // After creating the blog, visit the main page
  cy.visit('http://localhost:3000');
});
