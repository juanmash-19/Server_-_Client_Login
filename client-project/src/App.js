import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from './components/auth/Register';
import Login from './components/auth/Login'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
