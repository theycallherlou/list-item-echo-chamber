import { useList } from '../contexts/ListProvider';

export default function ListDisplay() {
  const { lists } = useList();

  if (!lists || lists.length === 0) {
    return <p>No lists available. Please add a list.</p>;
  }

  return (
    <div>
      <h2>Lists</h2>
      {lists.map((list) => (
        <div key={list.id}>
          <h3>{list.list_name}</h3>
          <ul>
            {list.items.length > 0 ? (
              list.items.map((item) => (
                <li key={item.id}>{item.item_name}</li>
              ))
            ) : (
              <p>No items in this list.</p>
            )}
          </ul>
        </div>
      ))}
    </div>
  );
};

