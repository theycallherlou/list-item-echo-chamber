import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import { RedirectProps } from '../lib/types';

export default function Protected({ redirectPath = '/login' }: RedirectProps) {  
  const { user } = useAuth();

  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};
