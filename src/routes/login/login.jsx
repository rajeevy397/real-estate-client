import { useContext, useState } from 'react';
import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import apiRequest from '../../lib/apiRequest';
import { AuthContext } from '../../context/AuthContext';

function Login() {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  
  const { updateUser } = useContext(AuthContext);

  const handleGoogleLogin = () => {
    window.location.href = 'http://localhost:8800/auth/google';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    setIsLoading(true);
    const formData = new FormData(e.target);

    const username = formData.get('username');
    // const email = formData.get('email');
    const password = formData.get('password');

    // console.log(username, email, password);
    try {
      const res = await apiRequest.post(
        '/auth/login',
        {
          username,
          password,
        }
      );

      updateUser(res.data)

      // console.log(res)
      navigate('/');
      // console.log(res.data);
    } catch (err) {
      setError(err.response.data.message);
      // console.log(err);
    }finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="login">
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <h1>Welcome back</h1>
          <input
            name="username"
            required
            minLength={3}
            maxLength={20}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            type="password"
            required
            placeholder="Password"
          />
          <button disabled={isLoading}>Login</button>
          {error && <span>{error}</span>}
          <Link to="/register">{"Don't"} you have an account?</Link>
      <div>
        <button onClick={handleGoogleLogin}>Sign in with Google</button>
      </div>
        </form>
      </div>
      <div className="imgContainer">
        <img src="/bg.png" alt="" />
      </div>
    </div>
  );
}

export default Login;
