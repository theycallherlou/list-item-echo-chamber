import { createContext, useContext, useState } from 'react';
import { IContextProps, ICredentials, IUser } from '../lib/types';
import { register, login, logout } from '../services/auth';

interface AuthContextType {
  user: IUser | null;
  registerUser: (credentials: ICredentials) => Promise<void>;
  loginUser: (credentials: ICredentials) => Promise<void>;
  logoutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function AuthProvider({ children }: IContextProps) {
  const [user, setUser] = useState<IUser | null>(null);

  const registerUser = async (credentials: ICredentials) => {
    console.log('registerUser function called');
    try {
      const { user } = await register(credentials);
      setUser({ id: user?.id, email: user?.email });
      console.log('user', user);
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  const loginUser = async (credentials: ICredentials) => {
    console.log('loginUser function called');
    try {
      const { user } = await login(credentials);
      setUser({ id: user?.id, email: user?.email });
      console.log('user', user);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logoutUser = async () => {
    try {
      await logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, registerUser, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export { AuthProvider, useAuth }
