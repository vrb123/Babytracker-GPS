import React,{useContext,useState} from 'react';
import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';
import { Container,Row,Col } from 'react-bootstrap';
import {Link,Redirect} from 'react-router-dom';
import OrderList from './OrderList';

import Header from '../../Header';

export default () => {
    const [userId] = useContext(LoginContext);
    const [role] = useContext(AccessContext);

    if(!userId && !role) return <Redirect to="/login" />

    const [redirectOrder,setRedirectOrder] = useState(null);

    const onSingleOrderClick = orderId => {
        setRedirectOrder(orderId);
    };

    if(redirectOrder)
        return <Redirect to={`/orders/${redirectOrder}`} />

    return (
        <>
            <Header title="Список заказов" />
            <Container fluid>
                <Row>
                    <Col>
                        <OrderList 
                            userId={userId} 
                            role={role}
                            onSingleOrderClick={onSingleOrderClick}
                        />
                    </Col>
                </Row>
            </Container>
        </>
        
    );
}