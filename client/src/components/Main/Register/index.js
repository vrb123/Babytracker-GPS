import React,{useContext} from 'react';
import RegisterForm from './RegisterForm';

import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';

import {signUp} from '../../../api';
import {Redirect} from 'react-router-dom';

export default () => {
    const [userId] = useContext(LoginContext);
    const [role] = useContext(AccessContext);

    const onSubmit = async formData => {
        const {ok} = await signUp(formData);
        if(ok) {
            console.log('Confirmation email sent');
        }
        else {
            console.log('Error');
        }
    };
    if(userId && role) return <Redirect to="/profile" />
    return (
        <>
            <RegisterForm onSubmit={onSubmit}/>
        </>
    );
};