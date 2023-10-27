import React, { createContext, useState, useEffect,useContext } from 'react';
import auth from '@react-native-firebase/auth';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged((user) => {
      setUserData(user);
    });

    return () => unsubscribe();
  }, []);
  const signOut = () => {
    return auth().signOut();
  };
  return (
    <UserContext.Provider value={{ userData, setUserData ,signOut}}>
      {children}
    </UserContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useAuth must be used within a UserProvider');
  }
  return context;
};
export default UserContext;
