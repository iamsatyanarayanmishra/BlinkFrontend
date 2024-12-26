// GlobalContext.js
import React, { createContext, useState } from 'react';

// Create the context
export const GlobalContext = createContext();

// Create a provider component
export const GlobalProvider = ({ children }) => {
  const [userData, setUserData] = useState({
    name: 'Manisha',
    email: 'abc@blink.com',
    number: '9876054321',
    id: 'MNLKPO09',
    password: 'ABC3456',
    countryCode: '+91',
    preference: "",
  });

  // Function to update user data
  const updateUserData = (newData) => {
    setUserData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  return (
    <GlobalContext.Provider value={{ userData, updateUserData }}>
      {children}
    </GlobalContext.Provider>
  );
};
