import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import SignIn from './pages/sign-in';
import Home from './pages/home';
import { Toaster } from './components/ui/toaster';
import axios from './lib/axios';
import Create from './pages/create';
import { useStateValue } from './lib/context';

function App() {
  const [auth] = useStateValue();
  const [user, setUser] = useState<JwtPayload | null>(null);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <SignIn />,
    },
    {
      path: 'home',
      element: <Home user={user!} />,
    },
    {
      path: 'create',
      element: <Create user={user!} />,
    },
  ]);

  useEffect(() => {
    if (auth) {
      setUser(jwtDecode(auth));
      axios.defaults.headers.common.Authorization = auth;
      if (window.location.pathname === '/') window.location.assign('/home');
    } else {
      setUser(null);
      if (window.location.pathname !== '/') window.location.assign('/');
    }
  }, [auth]);

  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  );
}

export default App;
