import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function AuthForm() {
  const navigate = useNavigate();
  const { registerUser, loginUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  const authType = {
    register: {
      title: 'Register For an Account',
      button: 'Register',
      caption: 'Already have an account?',
      link: 'Login',
      url: '/login',
      action: handleRegister,
    },
    login: {
      title: 'Login to Your Account',
      button: 'Login',
      caption: "Don't have an account?",
      link: 'Register',
      url: '/register',
      action: handleLogin,
    },
  };

  const mode = location.pathname.includes('register') ? 'register' : 'login';

  const { title, button, caption, link, url, action } = authType[mode];

  async function handleRegister(event: React.FormEvent) {
    event.preventDefault();
    console.log('handle register function called');
    await registerUser({ email, password });
    navigate('/');
    setEmail('');
    setPassword('');
  }

  async function handleLogin(event: React.FormEvent) {
    event.preventDefault();
    console.log('handle login function called');
    await loginUser({ email, password });
    navigate('/');
    setEmail('');
    setPassword('');
  }

  return (
    <form onSubmit={action} className="auth-form">
      <h2>{title}</h2>
      <input
        className="control"
        type="email" 
        value={email} 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setEmail(event.target.value)} 
        placeholder="Email" 
        required 
      />
      <input
        className="control"
        type="password" 
        value={password} 
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPassword(event.target.value)} 
        placeholder="Password" 
        required 
      />
      <button type="submit">{button}</button>
      <p>
        {caption} <Link to={url}>{link}</Link>
      </p>
    </form>
  );
}
