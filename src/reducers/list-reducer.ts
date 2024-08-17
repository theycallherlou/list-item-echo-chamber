import { Action, IListContext, IList, IItem } from '../lib/types';

function listReducer(state: IListContext, action: Action): IListContext {
  switch (action.type) {
    case 'LOAD_LISTS':
      return { ...state, lists: action.payload };

    case 'ADD_LIST':
      return { ...state, lists: [...state.lists, action.payload] };

    case 'UPDATE_LIST':
      return {
        ...state,
        lists: state.lists.map((list: IList) =>
          list.id === action.payload.id ? action.payload : list
        ),
      };

    case 'DELETE_LIST':
      return {
        ...state,
        lists: state.lists.filter((list: IList) => list.id !== action.payload),
      };

    case 'ADD_ITEM':
      return {
        ...state,
        lists: state.lists.map((list: IList) =>
          list.id === action.payload.list_id
            ? { ...list, items: [...list.items, action.payload] }
            : list
        ),
      };

    case 'UPDATE_ITEM':
      return {
        ...state,
        lists: state.lists.map((list: IList) =>
          list.id === action.payload.list_id
            ? {
                ...list,
                items: list.items.map((item: IItem) =>
                  item.id === action.payload.id ? action.payload : item
                ),
              }
            : list
        ),
      };

      case 'DELETE_ITEM':
        return {
          ...state,
          lists: state.lists.map((list: IList) =>
            list.id === action.payload.list_id
              ? {
                  ...list,
                  items: list.items.filter((item: IItem) => item.id !== action.payload.item_id),
                }
              : list
          ),
        };
  
      default:
        return state;
  }
}

export default listReducer;
