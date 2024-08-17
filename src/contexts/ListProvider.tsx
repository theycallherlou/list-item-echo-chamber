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
import {
  getAllItems,
  createItem,
  updateItem,
  deleteItem 
} from '../services/items';
import { IContextProps, IListContext, IList, ListProviderContext, IItem } from '../lib/types';
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
          dispatch({ type: 'LOAD_LISTS', payload: [] });
        }
      } catch (error) {
        console.error(`There was an error fetching the lists: ${error}`);
      }
    }
    fetchLists();
  }, []);

  useEffect(() => {
    async function fetchItems() {
      try {
        const response = await getAllItems();
        if (response) {
          dispatch({ type: 'LOAD_ITEMS', payload: response });
        } else {
          console.error('No items found. Response was null or undefined.');
          dispatch({ type: 'LOAD_ITEMS', payload: [] });
        }
      } catch (error) {
        console.error(`There was an error fetching the items: ${error}`);
      }
    }
    fetchItems();
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

  const handleAddItem = async (newItem: IItem) => {
    try {
      const response = await createItem(newItem);
      if (response) {
        dispatch({ type: 'ADD_ITEM', payload: response });
      }
    } catch (error) {
      console.error(`There was an error creating the item: ${error}`);
    }
  };

  const handleUpdateItem = async (updatedItem: IItem) => {
    try {
      const response = await updateItem(updatedItem);
      if (response) {
        dispatch({ type: 'UPDATE_ITEM', payload: response });
      }
    } catch (error) {
      console.error(`There was an error updating the item: ${error}`);
    }
  };

  const handleDeleteItem = async (listId: string, itemId: string) => {
    try {
      await deleteItem(itemId);
      dispatch({ type: 'DELETE_ITEM', payload: { list_id: listId, item_id: itemId } });
    } catch (error) {
      console.error(`There was an error deleting the item: ${error}`);
    }
  };


  return (
    <ListContext.Provider value={{ ...state, dispatch, handleAddList, handleUpdateList, handleDeleteList, handleAddItem, handleUpdateItem, handleDeleteItem }}>
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
