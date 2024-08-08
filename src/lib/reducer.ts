export const initialState = null;

export const actionTypes = {
  SET: 'SET',
};

export interface IAction {
  type: keyof typeof actionTypes;
  payload: string | null;
}

const reducer = (state: string | null, action: IAction) => {
  switch (action.type) {
    case actionTypes.SET:
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
