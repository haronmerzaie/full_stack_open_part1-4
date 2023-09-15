import React from 'react';

const Notification = ({ message }) => {

  // Render the notification message if present
  return (
    <>
      {message?.text && (
        <div className={`notification ${message?.error && "error"}`}>
          <h3>{message?.text}</h3>
        </div>
      )}
    </>
  );
};

export default Notification;