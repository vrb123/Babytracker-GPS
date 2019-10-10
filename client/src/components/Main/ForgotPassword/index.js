import React,{useContext} from 'react';
import ForgotPasswordForm from './ForgotPasswordForm';
import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';
import { Container,Row,Col } from 'react-bootstrap';
import {forgotPassword} from '../../../api';
import {Link,Redirect} from 'react-router-dom';

export default () => {
    const [userId,setUserId] = useContext(LoginContext);
    const [role,setUserRole] = useContext(AccessContext);

    const onSubmit = async formData => {
        const {ok} = await forgotPassword(formData);
        if(ok) {
            console.log('Email has been sent...');
        }   
        else{
            console.log('Error while sending email...');
        }
    };
    if(userId && role) return <Redirect to="/" />
    return (
        <Container fluid>
            <Row>
                <Col xl={12} md={12} xm={12} xs={12}>
                    <ForgotPasswordForm onSubmit={onSubmit}/>
                </Col>
            </Row>
        </Container>
    )    
};