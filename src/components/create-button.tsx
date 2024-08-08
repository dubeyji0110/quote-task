import { Pencil } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CreateButton() {
  const navigate = useNavigate();

  const handleCreateQuote = () => {
    navigate('/create');
  };

  return (
    <div className="fixed bottom-4 right-4 md:right-10 w-16 h-16 rounded-full overflow-hidden cursor-pointer shadow-md z-50">
      <div
        className="bg-slate-800 text-primary-foreground h-full w-full flex justify-center items-center hover:bg-slate-900 transition-colors"
        onClick={handleCreateQuote}
      >
        <Pencil />
      </div>
    </div>
  );
}
