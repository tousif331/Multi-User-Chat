import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import Chat from './components/Chat';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from './components/Navbar';

function App() {
  return (
    <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route element={<Navigate to="/login" />} path="/" />
            <Route element={<Login />} path="login" />
            <Route element={<Signup />} path="signup" />
            <Route element={<Chat />} path="chat/:username" />
            {/* <Route element={<NotFound />} path="*" /> */}
          </Routes>
      </BrowserRouter>
  );
}

export default App;
