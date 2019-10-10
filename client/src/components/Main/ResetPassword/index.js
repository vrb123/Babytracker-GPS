import React,{useContext,useState,useEffect} from 'react';
import ResetPasswordForm from './ResetPasswordForm';
import { Container,Row,Col } from 'react-bootstrap';
import {resetPassword,updatePasswordViaEmail} from '../../../api';
import {Link,Redirect} from 'react-router-dom';

export default (props) => {
    const [userEmail,setUserEmail] = useState(null);
    const {token} = props.match.params;
    const [error,setError] = useState(null);

    console.log(token);

    useEffect(() => {
        const getUserEmail = async () => {
            const {ok,email} = await resetPassword(token);
            console.log('Email: '+email);
            console.log(email);
            if(!ok) setError('Error');
            else {
                setUserEmail(email);
            }
        };
        getUserEmail();
    },[]);


    const onSubmit = async formData => {
        console.log('Form data');
        console.log({...formData,email:userEmail});
        const {ok} = await updatePasswordViaEmail({...formData,email:userEmail});
        if(ok) {
            console.log('Password has been reset')
        }   
        else{
            console.log('Error while reseting an email');
        }
    };

    if(error) 
        return (
            <div>
                <h2>{error}</h2>
            </div>
        );
    return (
        <Container fluid>
            <Row>
                <Col xl={12} md={12} xm={12} xs={12}>
                    <ResetPasswordForm onSubmit={onSubmit}/>
                </Col>
            </Row>
        </Container>
    )    
};