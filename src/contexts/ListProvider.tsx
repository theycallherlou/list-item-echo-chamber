import { 
  createContext, 
  useContext, 
  useEffect, 
  useReducer 
} from 'react';
import {
  getAllLists,
  createList,
  deleteList,
  updateList
} from '../services/lists';
import { IContextProps, IListContext, IList, ListProviderContext } from '../lib/types';
import listReducer from '../reducers/list-reducer';
import logger from '../reducers/logger';

const initialState: IListContext = { 
   lists: [],
   items: []
};

const ListContext = createContext<ListProviderContext | undefined>(undefined);

function ListProvider({ children }: IContextProps) {
  const [state, dispatch] = useReducer(logger(listReducer), initialState);

  useEffect(() => {
    async function fetchLists() {
      try {
        const response = await getAllLists();

        if (response) {
          dispatch({ type: 'LOAD_LISTS', payload: response });
        } else {
          console.error('No lists found. Response was null or undefined.');
          // Optionally dispatch an empty array to maintain consistency
          dispatch({ type: 'LOAD_LISTS', payload: [] });
        }
      } catch (error) {
        console.error(`There was an error fetching the lists: ${error}`);
      }
    }
    fetchLists();
  }, []);

  async function handleAddList(newList: IList) {
    try {
      const response = await createList(newList);
      if (response) {
        dispatch({ type: 'ADD_LIST', payload: response });
      } else {
        console.error('Failed to create list. Response was null or undefined.');
      }
    } catch (error) {
      console.error(`There was an error creating the list: ${error}`);
    }
  }

  async function handleUpdateList(listId: string, updatedList: IList) {
    try {
      const response = await updateList(listId, updatedList);
      if (response) {
        dispatch({ type: 'UPDATE_LIST', payload: response });
      } else {
        console.error('Failed to update list. Response was null or undefined.');
      }
    } catch (error) {
      console.error(`There was an error updating the lists: ${error}`);
    }
  }

  async function handleDeleteList(listId: string) {
    try {
      await deleteList(listId);
      dispatch({ type: 'DELETE_LIST', payload: listId });
    } catch (error) {
      console.error(`There was an error deleting the list: ${error}`);
    }
  }

  return (
    <ListContext.Provider value={{ ...state, dispatch, handleAddList, handleUpdateList, handleDeleteList }}>
      {children}
    </ListContext.Provider>
  );
};

function useList() {
  const context = useContext(ListContext);
  if (!context) {
    throw new Error('useList must be used within a ListProvider');
  }
  return context;
}

export { ListProvider, useList }
