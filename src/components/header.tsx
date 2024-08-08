import { useNavigate } from 'react-router-dom';
import Logo from './logo';
import { LogOut } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('auth:token');
    navigate('/', { replace: true });
  };

  const handleRefresh = () => {
    navigate(0);
  };

  return (
    <div className="sticky top-0 left-0 w-screen shadow-md bg-slate-800 text-primary-foreground z-50">
      <div className="w-full flex p-4 justify-between items-center">
        <Logo onClick={handleRefresh} className="cursor-pointer" />
        <div className="hover:opacity-80 transition-opacity">
          <span className="cursor-pointer flex" onClick={handleLogout}>
            <LogOut />
            <span className="inline-block ms-2">Logout</span>
          </span>
        </div>
      </div>
    </div>
  );
}
