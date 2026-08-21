import React from 'react';

const AuthMessage = ({ type, message }) => {
  if (!message) return null;

  const getStyle = () => {
    switch (type) {
      case 'error':
        return { backgroundColor: '#fef2f2', color: '#b91c1c', border: '1px solid #fca5a5' };
      case 'success':
        return { backgroundColor: '#f0fdf4', color: '#15803d', border: '1px solid #86efac' };
      case 'info':
      default:
        return { backgroundColor: '#e0f2fe', color: '#0369a1', border: '1px solid #bae6fd' };
    }
  };

  return (
    <div style={{
      ...getStyle(),
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '16px',
      fontSize: '14px',
      fontWeight: '500',
      textAlign: 'center'
    }}>
      {message}
    </div>
  );
};

export default AuthMessage;
