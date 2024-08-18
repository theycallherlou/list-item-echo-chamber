import { useState, ChangeEvent } from 'react';
import { useList } from '../contexts/ListProvider';
import { IList } from '../lib/types';

export default function ListManager() {
  const { dispatch } = useList();
  const [newListName, setNewListName] = useState('');

  const addList = () => {
    const newList: IList = {
      id: 'list-id-placeholder',
      list_name: newListName,
      user_id: 'user-id-placeholder',
      items: [],
    };
    dispatch({ type: 'ADD_LIST', payload: newList });
    setNewListName('');
  };

  return (
    <div>
      <h2>Add a New List</h2>
      <input
        type="text"
        value={newListName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewListName(e.target.value)}
        placeholder="List Name"
      />
      <button onClick={addList}>Add List</button>
    </div>
  );
};

