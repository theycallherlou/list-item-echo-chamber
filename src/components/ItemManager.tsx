import { useState, ChangeEvent, FormEvent } from 'react';
import { useList } from '../contexts/ListProvider';
import { IItem } from '../lib/types';
import { IItemManagerProps} from '../lib/types';

export default function ItemManager({ listId }: IItemManagerProps) {
  const { handleCreateItem } = useList();
  const [itemName, setItemName] = useState('');
  const [quantity, setQuantity] = useState(0);

  function createNewItem(e: FormEvent) {
    e.preventDefault();
    const newItem: Omit<IItem, 'id'> = {
      list_id: listId,
      item_name: itemName,
      quantity: quantity,
      completed: false,
    };
    console.info('Creating new item:', newItem);
    handleCreateItem(newItem);
    setItemName('');
    setQuantity(0);
  }

  return (
    <form onSubmit={createNewItem}>
      <h3>Add an Item</h3>
      <input  
        type="text"
        value={itemName}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setItemName(e.target.value)}
        placeholder="Item Name"
      />
      <input
        type="number"
        value={quantity}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
        placeholder="Quantity"
      />
      <button type="submit">Add Item</button>
    </form>
  );
}
