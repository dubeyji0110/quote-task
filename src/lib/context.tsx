import React, { createContext, Dispatch, useContext, useReducer } from 'react';
import { IAction } from './reducer';

interface IProviderProps {
  reducer: (state: string | null, action: IAction) => string | null;
  initialState: string | null;
  children: React.ReactNode;
}

export const StateContext = createContext<[string | null, Dispatch<IAction> | null]>([null, null]);

export const StateProvider = ({ reducer, initialState, children }: IProviderProps) => (
  <StateContext.Provider value={useReducer<IProviderProps['reducer']>(reducer, initialState)}>
    {children}
  </StateContext.Provider>
);

export const useStateValue = () => useContext(StateContext);
