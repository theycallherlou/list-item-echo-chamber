import ListManager from './ListManager';
import ListDisplay from './ListDisplay';

export default function Home() {
  return (
    <div>
      <h1>Lists for life.</h1>
      <ListManager />
      <ListDisplay />
    </div>
  );
}
