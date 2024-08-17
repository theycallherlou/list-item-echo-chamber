export interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  id?: string;
  email?: string | undefined;
  name?: string;
}

export interface IItem {
  id?: string;
  list_id: string;
  item_name: string;
  quantity: number;
  completed?: boolean;
}

export interface IList {
  id?: string;
  list_name: string;
  user_id: string;
}

export interface IContextProps {
  children: React.ReactNode;
}

export interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
  handleRegisterUser: (credentials: ICredentials) => Promise<void>;
  handleLoginUser: (credentials: ICredentials) => Promise<void>;
  handleLogoutUser: () => Promise<void>;
}
