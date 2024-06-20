import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Success = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:8800/user', {
        withCredentials: true,
      })
      .then((response) => {
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log('Error fetching user:', error);
      });
  }, []);

  const getProfilePicture = () => {
    if (user.photos && user.photos.length > 0) {
      return user.photos[0].value;
    } else if (user.picture) {
      return user.picture;
    }
    return null;
  };

  return (
    <div>
      <h1>Success</h1>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <p>
            Name: {user.name.givenName} {user.name.familyName}
          </p>
          <p>Email: {user.email}</p>
          <img src={getProfilePicture()} alt="Profile" />
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Success;
