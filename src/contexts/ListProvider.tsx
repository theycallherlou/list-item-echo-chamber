import { createContext, useContext, useReducer, useEffect } from 'react';
import listReducer from '../reducers/list-reducer';
import { State, IList, IContextProps, IItem } from '../lib/types';
import { loadLists } from '../services/lists';
import { createList } from '../services/lists';
import logger from '../reducers/logger';
import { createItem } from '../services/items';

const initialState: State = {
  lists: [],
  handleCreateList: async () => {},
  handleCreateItem: async () => {},
};

const ListContext = createContext<State | undefined>(undefined);

function ListProvider({ children }: IContextProps) {
  const [state, dispatch] = useReducer(logger(listReducer), initialState);

  useEffect(() => {
    async function fetchLists() {
      const lists: IList[] | null = await loadLists();
      dispatch({ type: 'LOAD_LISTS', payload: lists || [] });
    }

    fetchLists();
  }, []);

  async function handleCreateList(newList: Omit<IList, 'id' | 'user_id'>) {
   const createdList = await createList(newList);
   if (createdList) {
    dispatch({ type: 'CREATE_LIST', payload: createdList });
   }
  }

  async function handleCreateItem(newItem: Omit<IItem, 'id'>) {
    console.log('sending item to service function', newItem);
    const createdItem = await createItem(newItem);
    console.log('created item response', createdItem);
    if (createdItem) {
      dispatch({ type: 'CREATE_ITEM', payload: createdItem });
    }
  }

  return (
    <ListContext.Provider value={{ ...state, handleCreateList, handleCreateItem }}>
      {children}
    </ListContext.Provider>
  );
}

const useList = () => {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
};

export { ListProvider, useList };
