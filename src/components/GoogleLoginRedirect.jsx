// GoogleLoginRedirect.jsx
import { useEffect, useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const GoogleLoginRedirect = () => {
  const { updateUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const user = JSON.parse(searchParams.get('user'));
    const token = searchParams.get('token');

    if (user && token) {
      updateUser({ ...user, token });
      navigate('/');
    } else {
      navigate('/login');
    }
  }, [location, navigate, updateUser]);

  return <div>Loading...</div>;
};

export default GoogleLoginRedirect;
