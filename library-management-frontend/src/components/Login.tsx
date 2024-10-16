// src/components/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Css/Login.css';
import { useAuth } from './AuthContext';

// Define the types for the response from the login API
interface LoginResponse {
  message: string;
}

// Define the types for the component's state
const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate(); // Initialize useNavigate
  const { login } = useAuth(); // Get login function

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);

    try {
        const response = await axios.post<LoginResponse>('http://localhost:5025/api/User/login', {
            email,
            password,
        });

        // If login is successful
        setMessage(response.data.message);
        login(); 
        navigate('/create'); // Redirect to the CreateBook component
    } catch (error: any) {
        console.error('Login error:', error); // Log the error for debugging

        // Handle specific error responses
        if (error.response) {
            const errorMessage = error.response.data.message;

            // Set specific messages based on the error response
            if (errorMessage.includes('User not found')) {
                setMessage('The email you entered does not match any account.');
            } else if (errorMessage.includes('Incorrect password')) {
                setMessage('The password you entered is incorrect.');
            } else if (errorMessage.includes('Invalid email and password')) {
                setMessage('Both email and password are incorrect.');
            } else {
                setMessage('Login failed. Please try again.'); // Generic error message
            }
        } else {
            setMessage('Login failed. Please try again.'); // Handle network errors or other issues
        }
    } finally {
        setLoading(false);
    }
};


  return (
    <section className="vh-100">
      <div className="container-fluid h-custom">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-md-9 col-lg-6 col-xl-5">
            <img 
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp" 
              className="img-fluid" 
              alt="Login illustration" 
            />
          </div>
          <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
            <form onSubmit={handleLogin}>
              <div className="input-group mb-4">
                <span className="input-group-text"><i className="bi bi-envelope"></i></span>
                <input
                  type="email"
                  className="form-control form-control-lg"
                  placeholder="Enter a valid email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text"><i className="bi bi-lock"></i></span>
                <input
                  type="password"
                  className="form-control form-control-lg"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {message && (
                <div className={`alert ${message.includes('successful') ? 'alert-success' : 'alert-danger'}`} role="alert">
                  {message}
                </div>
              )}

              <div className="text-center text-lg-start mt-4 pt-2">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg"
                  style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  disabled={loading}
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div className="form-check mb-0">
                  <input
                    className="form-check-input me-2"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
              </div>
              <p className="small fw-bold mt-2 pt-1 mb-0">
                  Don't have an account? <a href="/" className="link-danger">Register</a>
                </p>
           
              <div>
                <a href="#!" className="text-white me-4">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="bi bi-google"></i>
                </a>
                <a href="#!" className="text-white me-4">
                  <i className="bi bi-linkedin"></i>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    
      <div className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
        <div className="text-white mb-3 mb-md-0">
          Copyright © 2024. All rights reserved.
        </div>
      </div>
    </section>
  );
};

export default Login;
