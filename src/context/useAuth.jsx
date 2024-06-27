// Example of fetching user details on frontend after Google login
import { useEffect, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import apiRequest from '../../lib/apiRequest';

const useAuth = () => {
  const { updateUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await apiRequest.get('/auth/user'); // Adjust the endpoint as needed
        updateUser(res.data);
      } catch (err) {
        console.log('Failed to fetch user', err);
      }
    };

    fetchUser();
  }, [updateUser]);

  return null;
};

export default useAuth;
