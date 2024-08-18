export interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  id?: string | undefined;
  email: string | undefined;
}

export interface IContextProps {
  children: React.ReactNode;
}

export interface IItem {
  id: string;
  list_id: string;
  item_name: string;
  quantity: number;
  completed: boolean;
}


export interface IItemManagerProps {
  listId: string;
}

export interface IList {
  id?: string;
  list_name: string;
  user_id?: string;
  items: IItem[];
}

export interface State {
  lists: IList[];
  handleCreateList: (newList: Omit<IList, 'id' | 'user_id'>) => Promise<void>;
  handleCreateItem: (newItem: Omit<IItem, 'id'>) => Promise<void>;
}

export type Action =
  | { type: 'LOAD_LISTS'; payload: IList[] }
  | { type: 'CREATE_LIST'; payload: IList }
  | { type: 'UPDATE_LIST'; payload: IList }
  | { type: 'DELETE_LIST'; payload: string }
  | { type: 'CREATE_ITEM'; payload: IItem }
  | { type: 'UPDATE_ITEM'; payload: IItem }
  | { type: 'DELETE_ITEM'; payload: { listId: string; itemId: string } };
