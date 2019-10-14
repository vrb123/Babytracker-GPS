import React,{useState} from 'react';

import NewOrderForm from './NewOrderForm';
import CheckoutForm from './CheckOutForm';

import Header from '../../Header';

export default () => {

    const [orderInfo,setOrderInfo] = useState( {} );
    const [shouldEdit,setShouldEdit] = useState(true);

    const onSubmitOrder = orderInfo => {
        setOrderInfo(orderInfo);
        setShouldEdit(false);
    };

    return (
        <>
        <Header title="Новый заказ"/>
        {
            shouldEdit ? 
                <NewOrderForm onSubmit={onSubmitOrder} />
            :
                <CheckoutForm orderInfo={orderInfo} onEdit={setShouldEdit} />
        }
        
        </>
    )
};