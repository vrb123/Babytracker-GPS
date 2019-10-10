import React,{useEffect,useState,createContext} from 'react';
import {sessionSet,sessionGet} from '../utils/session';

export const AccessContext = createContext();

export const AccessProvider = ({children}) => {
    const userRole = sessionGet('role');
    const [role,provideRole] = useState(userRole);

    const setRole = userRole => {
        sessionSet('role',userRole,15000);
        provideRole(userRole);
    };
    
    return (
       <AccessContext.Provider value={[role,setRole]}>
            {children}
       </AccessContext.Provider>
    );
}