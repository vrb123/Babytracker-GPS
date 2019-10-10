import React,{useEffect,useState,createContext} from 'react';
import {sessionSet,sessionGet} from '../utils/session';

export const LoginContext = createContext();

export const LoginProvider = ({children}) => {
    const userId = sessionGet('userId');
    const [token,provideToken] = useState(userId);


    const setToken = userId => {
        sessionSet('userId',userId,15000);
        provideToken(userId);
    };
    
    return (
       <LoginContext.Provider value={[token,setToken]}>
            {children}
       </LoginContext.Provider>
    );
}