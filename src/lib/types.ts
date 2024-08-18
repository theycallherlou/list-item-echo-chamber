export interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  id?: string | undefined;
  email: string | undefined;
}

export interface IAuthContextProps {
  children: React.ReactNode;
}

export interface RedirectProps {
  redirectPath?: string;
}

