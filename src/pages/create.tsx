import { JwtPayload } from 'jwt-decode';
import { useEffect } from 'react';
import Header from '@/components/header';
import CreateQuote from '@/components/create-quote';
import axios from '@/lib/axios';
import { useNavigate } from 'react-router-dom';
axios.defaults.headers.common.Authorization = localStorage.getItem('auth:token');

interface IProps {
  user?: JwtPayload;
}

export default function Create({ user }: IProps) {
  const navigate = useNavigate();

  const handleBack = () => navigate('/home');

  useEffect(() => {
    axios.defaults.headers.common.Authorization = localStorage.getItem('auth:token');
  }, []);

  return (
    <>
      <Header />
      <div className="max-w-xl mx-auto p-4 -mb-4">
        <span className="cursor-pointer" onClick={handleBack}>
          {'< '}
        </span>
        <span className="underline cursor-pointer" onClick={handleBack}>
          Back
        </span>
      </div>
      <CreateQuote user={user} />
    </>
  );
}
