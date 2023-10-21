import React, { useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useUserData } from '../../contexts/UserDataContext';

function ForgetPass() {
  const [email, setEmail] = useState('');
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isResponse, setResponse] = useState(false);
  const inputRef = useRef();
  // const navigate = useNavigate();
  const { path } = useUserData();
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Valider le format de l'e-mail (par exemple, en utilisant une expression régulière)
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

    if (emailRegex.test(email)) {
      // L'e-mail est valide, naviguer vers la page de destination
      setIsEmailValid(true);

      try {
        const requestData = {
          email: email,
        };

        const config = {
          headers: {
            'Content-Type': 'application/json',
          },
        };
console.log("test test");
        let response = await axios.post(`${path}/request_password_reset`, requestData, config);
        // console.log("Response Status:", response.status);
        setError('');
        setMessage('');
        setResponse(true);

        if (response.status === 200) {
          setMessage('An email has been sent with instructions to reset your password');
        } else if (response.status === 422) {
          setError('User with this email not found');
        } else {
          console.log(response.data);
          setError('Error, please try again!');
        }
      } catch (error) {
        setError('Error, please try again!');
      }
    } else {
      setIsEmailValid(false);
      console.log('invalid email');
    }
  };

  return (
    <div className="container mt-5" style={styles.container}>
      {/* <img src="https://cdn-icons-png.flaticon.com/512/6146/6146587.png" style={styles.image} className="mx-auto d-block" alt="Logo" /> */}
      <form onSubmit={handleSubmit} style={styles.form}>
        <div className="form-group">
          <label htmlFor="email" className="mb-2 label-control">E-mail address</label>

          <input
            type="text"
            className={`form-control ${isEmailValid ? '' : 'is-invalid'}`}
            id="email"
            placeholder="your-email@example.com"
            ref={inputRef}
            onChange={(e) => setEmail(e.target.value)}
          />

          {!isEmailValid && (
            <div className="invalid-feedback">The email address is not valid</div>
          )}
        </div>

        <button className="btn btn-primary" style={styles.button}>Reset Password</button>
        {isResponse && message !== "" && <div className="p-3 text-success">{message}</div>}
        {isResponse && error !== "" && <div className="p-3 text-danger">{error}</div>}
      </form>
    </div>
  );
}

export default ForgetPass;

const styles = {
  container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  form: {
    width: 400,
    marginTop: 20,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    boxShadow: '0px 0px 10px 2px #ccc',
  },
  button: {
    marginTop: 20,
    width: '100%',
  },
  image: {
    width: 80,
    height: 80,
    marginTop: -40,
  },
};
