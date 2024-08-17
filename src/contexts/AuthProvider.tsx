import { createContext, useContext, useEffect, useState } from 'react';
import { IUser, IContextProps, IAuthContext, ICredentials } from '../lib/types';
import { 
  registerUser,
  loginUser, 
  logoutUser, 
  getCurrentUser 
} from '../services/auth';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext<IAuthContext | undefined>(undefined);

function AuthProvider({ children }: IContextProps) {
  const [user, setUser] = useState<IUser | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUser() {
      try {
        const response = await getCurrentUser();
        if (response?.user) {
          setUser(response.user);
        } else {
          navigate('/auth/login');
        }
      } catch (error) {
        console.error(`There was an error fetching the current user: ${error}`);
      }
    }
    fetchUser();
  }, []);

  async function handleRegisterUser(credentials: ICredentials) {
    try {
      const response = await registerUser(credentials);
      if (response.user) {
        setUser(response.user);
        navigate('/lists');
      }
    } catch (error) {
      console.error(`There was an error registering the user: ${error}`);
    }
  }

  async function handleLoginUser(credentials: ICredentials) {
    try {
      const response = await loginUser(credentials);
      if (response.user) {
        setUser(response.user);
        navigate('/lists');
      }
    } catch (error) {
      console.error(`There was an error logging in the user: ${error}`);
    }
  }

  async function handleLogoutUser() {
    try {
      const response = await logoutUser();
      if (response.error) {
        console.error(`There was an error logging out: ${response.error.message}`);
      } else {
        setUser(null);
        navigate('/auth/login');
      }
    } catch (error) {
      console.error(`There was an error logging out: ${error}`);
    }
  }

  return (
    <AuthContext.Provider value={{ user, setUser, handleRegisterUser, handleLoginUser, handleLogoutUser }}>{children}</AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth };
