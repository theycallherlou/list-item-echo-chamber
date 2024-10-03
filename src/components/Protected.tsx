import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { IRedirectProps } from '../lib/types';

export default function Protected({ redirectPath = '/login' }: IRedirectProps) {  
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
