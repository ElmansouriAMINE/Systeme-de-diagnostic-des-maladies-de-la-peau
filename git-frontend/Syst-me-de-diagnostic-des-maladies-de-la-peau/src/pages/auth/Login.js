import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useUserData } from '../../contexts/UserDataContext';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';
import "./style.css"
import Transition from '../../constants/transition';

function Login() {
  const { login, isLoggedIn } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { path } = useUserData();
  const [errorMessage, setErrorMessage] = useState("");
  const [showError, setShowError] = useState(false);


  if (localStorage.getItem('user')) {
    login()
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${path}/login`, {
        username,
        password,
      });

      if (response.status === 200) {
        const token = response.data.token;
        const user_id = response.data.user_id;

        // Stockez le token JWT dans le stockage local
        localStorage.setItem('token', token);
        localStorage.setItem('user_id', user_id);
        // Ajoutez le token JWT aux en-têtes de toutes les requêtes Axios ultérieures
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        console.log(response.data.token);
        login();
      }
    } catch (error) {
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      console.error('Erreur d\'authentification', error);
      setErrorMessage("Username or password incorrect")
    }
  };

  if (isLoggedIn) {
    return <Navigate to='/dashboard' />;
  }
 

  return (
    <Transition>
<div className="Auth-form-container">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <hr/>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="button" className="btn btn-primary" onClick={handleSubmit}>
              Sign In
            </button>
          </div>
          {
            showError && <div className='text-center justify-content-center d-flex'>
            <p className='text-danger'>{errorMessage}</p>
          </div>
          }
          <p className="small mb-2 pb-lg-2 text-dark mt-2"><Link to="/forget-password">Forgot password?</Link></p>
        </div>
      </div>
    </div>

    </Transition>

  );
}

export default Login;
