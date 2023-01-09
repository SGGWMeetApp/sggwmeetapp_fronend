import { useContext, createContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }) => {
   const [user, setUser] = useState(null);

   useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));

      if (userData) {
         if(userData.token){
         setUser(userData);}
      }
   }, []);

   return (
      <AuthContext.Provider value={{ user, setUser }}>
         {children}
      </AuthContext.Provider>
   );
};
