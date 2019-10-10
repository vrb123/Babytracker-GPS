import React,{useContext,useState} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import {Button} from '@material-ui/core';
import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';

import {Redirect} from 'react-router-dom';

export default () => {
    const [userId,setUserId] = useContext(LoginContext);
    const [role,setUserRole] = useContext(AccessContext);

    const _onLogOut = () => {
        setUserId(null);
        setUserRole(null);
    };
    console.log('USER ID: '+userId);
    console.log('ROLE: '+role);

    if(!userId && !role) return <Redirect to="/" />
    return (
        <Container fluid>
            <Row>
                <Col xs={12} xm={12}>
                    <Button onClick={_onLogOut}>Log out</Button>
                </Col>
            </Row>
        </Container>
    )
};