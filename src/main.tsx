import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { StateProvider } from './lib/context.tsx';
import reducer from './lib/reducer.ts';

createRoot(document.getElementById('root')!).render(
  <StateProvider initialState={null} reducer={reducer}>
    <App />
  </StateProvider>,
);
