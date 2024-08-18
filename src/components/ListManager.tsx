import { useState, ChangeEvent } from 'react';
import { useList } from '../contexts/ListProvider';
import { IList } from '../lib/types';

export default function ListManager() {
  const { handleCreateList } = useList();
  const [newListName, setNewListName] = useState('');

  function createNewList() {
    const newList: IList = {
      list_name: newListName,
      items: [],
    };

    handleCreateList(newList);
    setNewListName('');
  }

  return (
    <div>
      <h2>Add a New List</h2>
      <input
        type="text"
        value={newListName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setNewListName(e.target.value)}
        placeholder="List Name"
      />
      <button onClick={createNewList}>Add List</button>
    </div>
  );
};

