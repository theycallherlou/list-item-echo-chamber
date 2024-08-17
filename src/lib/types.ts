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
  items: IItem[];
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

export interface IListContext {
    lists: IList[];
    items: IItem[];
    handleAddList?: (newList: IList) => Promise<void>;
    handleDeleteList?: (listId: string) => Promise<void>;
    handleUpdateList?: (listId: string, newList: IList) => Promise<void>;
}

export interface ListProviderContext extends IListContext {
  dispatch: React.Dispatch<Action>;
  handleAddList: (newList: IList) => Promise<void>;
  handleUpdateList: (listId: string, updatedList: IList) => Promise<void>;
  handleDeleteList: (listId: string) => Promise<void>;
}

export type Action =
  | { type: 'ADD_LIST'; payload: IList }
  | { type: 'UPDATE_LIST'; payload: IList }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'ADD_ITEM'; payload: IItem }
  | { type: 'UPDATE_ITEM'; payload: IItem }
  | { type: 'DELETE_ITEM'; payload: string }
  | { type: 'LOAD_LISTS'; payload: IList[] };

