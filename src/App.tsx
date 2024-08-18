import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AuthPage from './components/Auth/AuthPage';
import Protected from './components/Protected';
import Home from './components/Home';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<AuthPage />} />
        <Route path="/login" element={<AuthPage />} />
        <Route element={<Protected />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </Router>
  );
}
