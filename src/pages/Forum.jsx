import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Forum = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/signin');
    }
  }, []);

  return (
    <div>
      <h1>Welcome to the Forum</h1>
      {/* Show user's charonName or posts here */}
    </div>
  );
};

export default Forum;
