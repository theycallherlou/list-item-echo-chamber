import { useList } from '../contexts/ListProvider';

export default function ListDisplay() {
  const { state } = useList();

  return (
    <div>
      <h2>Your Lists</h2>
      {state.lists.map(list => (
        <div key={list.id}>
          <h3>{list.list_name}</h3>
          <ul>
            {list.items.map(item => (
              <li key={item.id}>{item.item_name}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

