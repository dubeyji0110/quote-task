import { IFile, IQuote } from './interfaces';
import axios from './axios';
import { SignInSchema } from '@/components/sign-in';

interface IPagination {
  limit: number;
  offset: number;
}

interface ICreateQuoteParams {
  text: string;
  mediaUrl?: string;
}

export const signIn = async (data: SignInSchema): Promise<string | null> => {
  try {
    const response = await axios.post('/login', data);
    if (response.data && response.data.token) return response.data.token ?? null;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getQuotes = async (params: IPagination): Promise<IQuote[] | null> => {
  try {
    const response = await axios.get('/getQuotes', {
      params,
    });
    if (response.status === 200) return response.data.data ?? [];
    return [];
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const createQuote = async (data: ICreateQuoteParams): Promise<IQuote[] | null> => {
  try {
    const response = await axios.post('/postQuote', data);
    if (response.status === 200) return response.data ?? [];
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const uploadImage = async (data: FormData): Promise<IFile[] | null> => {
  try {
    const response = await axios.request({
      baseURL: 'https://crafto.app/crafto/v1.0/media/assignment/upload',
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      data,
    });
    if (response.status === 200) return response.data ?? [];
    return [];
  } catch (error) {
    console.error(error);
    return null;
  }
};
