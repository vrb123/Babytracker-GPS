import React,{useContext} from 'react';
import LoginForm from './LoginForm';
import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';
import { Container,Row,Col } from 'react-bootstrap';
import {login} from '../../../api';
import {Link,Redirect} from 'react-router-dom';

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
            console.log('ERROR');
            //Todo An error occured
        }
    };
    if(userId && role) return <Redirect to="/profile" />
    return (
        <Container fluid>
            <Row>
                <Col xl={12} md={12} xm={12} xs={12}>
                    <LoginForm onSubmit={onSubmit}/>
                </Col>
            </Row>
        </Container>
    )    
};