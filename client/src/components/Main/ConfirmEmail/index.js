import React,{useEffect,useState,useContext} from 'react';

import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';

import {Redirect} from 'react-router-dom';

import {confirmEmail} from '../../../api';

export default (props) => {
    
    const {token} = props.match.params;

    const [userId,setUserId] = useContext(LoginContext);
    const [role,setRole] = useContext(AccessContext);

    const [isLoading,toggleLoading] = useState(true);

    useEffect( () => {
        const provideEmailConfirmationResult = async () => {
            const {ok,userId,role} = await confirmEmail(token);
            if(ok){
                setUserId(userId);
                setRole(role);
            }
            else{
                console.log('Error');
            }
        };
        provideEmailConfirmationResult();
    },[token]);

    useEffect(() => {
        userId && role && toggleLoading(false);
    },[userId,role]);

    if(isLoading) return null;
    return (
        <Redirect to="/" />
    )
};