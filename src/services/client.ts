import { createClient, PostgrestSingleResponse } from '@supabase/supabase-js';
import { AuthTokenResponsePassword, AuthResponse } from '@supabase/supabase-js';

const url = import.meta.env.VITE_APP_SUPABASE_URL;
const key = import.meta.env.VITE_APP_SUPABASE_KEY;

const client = createClient(url, key);

function checkError<T>(response: PostgrestSingleResponse<T> | undefined): T {
  if (!response) {
    throw new Error('An error occurred while fetching the data.');
  }

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

function checkAuthError(response: AuthTokenResponsePassword | AuthResponse |undefined) {
  if (!response) {
    throw new Error('An error occurred while fetching the data.');
  }

  if (response.error) {
    throw response.error;
  }

  return response.data;
}

export { checkAuthError, checkError, client }
