import React,{useContext} from 'react';
import LoginForm from './LoginForm';
import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';
import {login} from '../../../api';
import {Redirect} from 'react-router-dom';

export default () => {
    const [userId,setUserId] = useContext(LoginContext);
    const [role,setUserRole] = useContext(AccessContext);

    const onSubmit = async formData => {
        const {ok,userId,role} = await login(formData);
        if(ok) {
           setUserId(userId);
           setUserRole(role);
        }
        else {
            console.log('Error');
        }
    };
    if(userId && role) return <Redirect to="/" />
    return (
        <>
            <LoginForm onSubmit={onSubmit}/>
        </>
    )    
};