import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import SignIn from './pages/sign-in';
import Home from './pages/home';
import { Toaster } from './components/ui/toaster';
import axios from './lib/axios';
import Create from './pages/create';

function App() {
  const [user, setUser] = useState<JwtPayload | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('auth:token');
    if (token) {
      setUser(jwtDecode(token));
      axios.defaults.headers.common.Authorization = token;
      if (window.location.pathname === '/') window.location.assign('/home');
    } else {
      setUser(null);
      if (window.location.pathname !== '/') window.location.assign('/');
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/home" element={<Home user={user!} />} />
        <Route path="/create" element={<Create user={user!} />} />
      </Routes>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
