import { createContext, useContext, useReducer, useEffect } from 'react';
import listReducer from '../reducers/list-reducer';
import { State, IList, IContextProps } from '../lib/types';
import { loadLists } from '../services/lists';
import { createList } from '../services/lists';
import logger from '../reducers/logger';

const initialState: State = {
  lists: [],
  handleCreateList: async () => {}
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

  return (
    <ListContext.Provider value={{ ...state, handleCreateList }}>
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
