import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get user data from sessionStorage
    const storedUser = sessionStorage.getItem('user');
    
    if (!storedUser) {
      // If no user is found, redirect to the login page
      navigate('/login');
    } else {
      // Parse the stored user data and set it in state
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  const handleLogout = () => {
    // Clear the sessionStorage to log the user out
    sessionStorage.removeItem('user');
    navigate('/login'); // Redirect to login page after logout
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {user ? (
          <>
            <h2 className="text-3xl font-bold text-gray-900">Welcome, {user.name}</h2>
            <p className="text-gray-600">Email: {user.email}</p>
            <button
              onClick={handleLogout}
              className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
            >
              Log out
            </button>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
