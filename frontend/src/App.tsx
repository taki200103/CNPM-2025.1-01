import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages_resident/Login/Login';
import Register from './pages_resident/Register/Register';
import HomePage from './pages_resident/Home/HomePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;