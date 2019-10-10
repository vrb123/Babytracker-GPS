import React,{useEffect,useState} from 'react';
import {getAllOrders,getDriverOrders,getUserOrders} from '../../../../api';
import {Table} from 'react-bootstrap';

import Moment from 'react-moment';

export default ({userId,role,onSingleOrderClick}) => {

    const [orders,setOrders] = useState(null);

    useEffect( () => {
        const provideOrders = async () => {
            let result = null;
            console.log('User role: ' + role);
            if(role === 'DRIVER')
                        result = await getDriverOrders(userId);
            else if(role === 'CUSTOMER')
                        result = await getUserOrders(userId);
            else if(role === 'MANAGER')
                        result = await getAllOrders(userId);
            console.log(result);
            if(result.ok)  setOrders(result.orders);
        };
        provideOrders();
    },[]);

    if(!orders) return null;

    return (
        <Table responsive>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Created at</th>
                    <th>Distance</th>
                    <th>Cost</th>
                    <th>Status</th>
                    <th>Starts at</th>
                    <th>Ends at</th>
                    <th>Car number</th>
                </tr>
            </thead>
            <tbody>
            {
                orders.map( (order,index) => (
                    <tr onClick={() => onSingleOrderClick(order.id)} key={index}>
                        <td>{index+1}</td>
                        <td>
                            <Moment format="YYYY/MM/DD">{order.createdAt}</Moment>
                        </td>
                        <td>{order.distance}</td>
                        <td>{order.cost}</td>
                        <td>{order.status}</td>
                        <td>
                            <Moment format="YYYY/MM/DD">{order.startsAt}</Moment>
                        </td>
                        <td>
                            <Moment format="YYYY/MM/DD">{order.endsAt}</Moment>
                        </td>
                        <td>{order.drivenBy.carNumber}</td>
                    </tr>
                ) )
            }
            </tbody>
        </Table>
    );
}