import { client } from './client';
import { ICredentials } from '../lib/types';

async function register(credentials: ICredentials) {
  const { email, password } = credentials;
  const { data, error } = await client.auth.signUp({ email, password });
  if (error) throw error;
  return data;
}

async function login(credentials: ICredentials) {
  const { email, password } = credentials;
  const { data, error } = await client.auth.signInWithPassword({ email, password });
  if (error) throw error;
  return data;
}

async function logout() {
  const { error } = await client.auth.signOut();
  if (error) throw error;
}

export { register, login, logout }
