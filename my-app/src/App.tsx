import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import SignUp from './page/signup/SignUp.tsx';
import Login from './page/Login/Login.tsx';
import MainPage from './page/mainpage/MainPage.tsx';
import { useSelector } from 'react-redux';
import type { RootState } from './State/store/Store.ts';

function App() {
  const token = useSelector((state: RootState) => state.auth["access-token"]);

  return (
    <Router>
      <Routes>
        {/* Protected route: only accessible with token */}
        <Route
          path="/"
          element={token ? <MainPage /> : <Navigate to="/login" />}
        />

        {/* Public routes */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  )
}

export default App;
