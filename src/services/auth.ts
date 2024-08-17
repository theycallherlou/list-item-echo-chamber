import { AuthResponse } from '@supabase/supabase-js';
import { client, checkAuthError } from './client';
import { ICredentials } from '../lib/types';

async function registerUser(credentials: ICredentials) {
  const response: AuthResponse = await client.auth.signUp({
    email: credentials.email,
    password: credentials.password
  });

  return checkAuthError(response);
}

async function loginUser(credentials: ICredentials) {
  const response = await client.auth.signInWithPassword({
    email: credentials.email,
    password: credentials.password
  });

  return checkAuthError(response);
}

async function logoutUser() {
  const response = await client.auth.signOut();
  
  if (response.error) {
    console.error(`There was an error logging out: ${response.error.message}`);
  }

  return response; 
}

async function getCurrentUser() {
  const response = await client.auth.getUser();
  
  if (response.error) {
    console.error(`There was an error getting the current user: ${response.error.message}`);
  }

  return response.data;
}

export { registerUser, loginUser, logoutUser, getCurrentUser };
