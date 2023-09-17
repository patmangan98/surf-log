import React, { createContext, useContext, useState } from 'react';

const MyContext = createContext()

export function useMyContext() {
  return useContext(MyContext)
}

export function MyContextProvider({ children }) {
  const [myState, setMyState] = useState()

  const updateMyState = (newValue) => {
    setMyState(newValue)
  };

  return (
    <MyContext.Provider value={{ myState, updateMyState }}>
      {children}
    </MyContext.Provider>
  )
}
