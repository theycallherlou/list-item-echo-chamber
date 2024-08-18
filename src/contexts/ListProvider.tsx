import React, { createContext, useContext, useReducer, useEffect } from 'react';
import listReducer from '../reducers/list-reducer';
import { State, IList, Action, IContextProps } from '../lib/types';
import { loadLists } from '../services/lists';

const initialState: State = {
  lists: [],
};

const ListContext = createContext<{
  state: State;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

function ListProvider({ children }: IContextProps) {
  const [state, dispatch] = useReducer(listReducer, initialState);

  useEffect(() => {
    async function fetchLists() {
      const lists: IList[] | null = await loadLists();
      dispatch({ type: 'LOAD_LISTS', payload: lists || [] });
    }

    fetchLists();
  }, []);

  return (
    <ListContext.Provider value={{ state, dispatch }}>
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
