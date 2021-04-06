import React, {useState} from 'react';
export const SplitFundContext = React.createContext(null);
const initialState = {
  registeredUsers: [],
  loginUser: {},
};
export function Context(props) {
  const [state, setState] = useState(initialState);
  return (
    <SplitFundContext.Provider value={{state, setState}}>
      {props.children}
    </SplitFundContext.Provider>
  );
}
