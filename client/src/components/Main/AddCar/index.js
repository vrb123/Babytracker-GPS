import React,{useContext} from 'react';
import AddCarForm from './AddCarForm';
import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';
import { Container,Row,Col } from 'react-bootstrap';
import {addCar} from '../../../api';
import {Redirect} from 'react-router-dom';

export default () => {
    const [userId] = useContext(LoginContext);
    const [role] = useContext(AccessContext);

    const onSubmit = async formData => {
        const {ok} = await addCar(userId,formData);
        if(ok) {
           console.log('OK');
        }
        else {
            console.log('ERROR');
            //Todo An error occured
        }
    };
    if(!userId && !role && role !== 'MANAGER')
        return <Redirect to="/profile" />
    
    return (
        <Container fluid>
            <Row>
                <Col xl={12} md={12} xm={12} xs={12}>
                    <AddCarForm 
                        userId={userId} 
                        onSubmit={onSubmit}
                    />
                </Col>
            </Row>
        </Container>
    );    
};