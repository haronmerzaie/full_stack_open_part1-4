import React from 'react';

const LoginForm = ({ handleLogin, username, setUsername, password, setPassword }) => {
  
  // Handle input changes
  const handleInputChange = (setter) => (event) => {
    setter(event.target.value);
  };

  // Render the login form
  return (
    <form onSubmit={handleLogin}>
      <h1>log in to application</h1>
      <div>
        <label htmlFor="username">username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={handleInputChange(setUsername)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={handleInputChange(setPassword)}
        />
      </div>
      <button type="submit" id="login-btn">login</button>
    </form>
  );
};

export default LoginForm;
