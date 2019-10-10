import React,{useContext,useEffect,useState} from 'react';
import AddOrderForm from './AddOrderForm';
import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';
import { Container,Row,Col } from 'react-bootstrap';
import {userAddOrder} from '../../../api';
import {Link,Redirect} from 'react-router-dom';

export default () => {
    const [userId,setUserId] = useContext(LoginContext);
    const [role,setUserRole] = useContext(AccessContext);

    const [accesibleCars,setAccessibleCars] = useState([]);

    const onSubmit = async formData => {
        const {ok,order} = await userAddOrder(formData);
        if(ok) {
           console.log(order);
        }
        else {
            console.log('ERROR');
            // Todo An error occured
        }
    };
    if(!userId && !role ) return <Redirect to="/login" />
    return (
        <Container fluid>
            <Row>
                <Col xl={12} md={12} xm={12} xs={12}>
                    <AddOrderForm 
                        userId={userId}
                        onSubmit={onSubmit}
                    />
                </Col>
            </Row>
        </Container>
    )    
};