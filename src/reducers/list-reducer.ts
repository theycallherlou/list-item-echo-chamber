import { State, Action } from '../lib/types';

function listReducer(state: State, action: Action): State {
  switch (action.type) {
    case 'LOAD_LISTS':
      return { ...state, lists: action.payload };
      
    case 'ADD_LIST':
      return { ...state, lists: [...state.lists, action.payload] };
      
    case 'UPDATE_LIST':
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.id ? action.payload : list
        ),
      };
      
    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter(list => list.id !== action.payload),
      };
      
    case 'ADD_ITEM':
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.list_id
            ? { ...list, items: [...list.items, action.payload] }
            : list
        ),
      };
      
    case 'UPDATE_ITEM':
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.list_id
            ? {
                ...list,
                items: list.items.map(item =>
                  item.id === action.payload.id ? action.payload : item
                ),
              }
            : list
        ),
      };
      
    case 'DELETE_ITEM':
      return {
        ...state,
        lists: state.lists.map(list =>
          list.id === action.payload.listId
            ? {
                ...list,
                items: list.items.filter(item => item.id !== action.payload.itemId),
              }
            : list
        ),
      };
      
    default:
      return state;
  }
}

export default listReducer;
