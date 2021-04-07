import React, {useState} from 'react';
export const SplitFundContext = React.createContext(null);
const initialState = {
  registeredUsers: [
    {
      confirmPassword: 'abcd',
      createdAt: '07-04-2021 13:28:07',
      emailId: 'abcd@gmail.com',
      id: 1617782287718,
      image: '',
      name: 'abcd',
      password: 'abcd',
      plans: [],
      transactions: [],
      wallet: 802,
    },
  ],
  loginUser: {
    emailId: 'abcd@gmail.com',
    image: '',
    name: 'abcd',
  },
  plans: [],
};
export function Context(props) {
  const [state, setState] = useState(initialState);
  return (
    <SplitFundContext.Provider value={{state, setState}}>
      {props.children}
    </SplitFundContext.Provider>
  );
}
