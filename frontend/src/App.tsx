import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages_resident/Login/Login';
import Register from './pages_resident/Register/Register';
import HomePage from './pages_resident/Home/HomePage';
import AccountantHome from './pages_accountant/Home/Home';
import PoliceHome from './pages_police/Home/Home';
import AdminHome from './pages_admin/Home/Home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/accountant/*" element={<AccountantHome />} />
        <Route path="/police/*" element={<PoliceHome />} />
        <Route path="/admin/*" element={<AdminHome />} />
        <Route path="/*" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;