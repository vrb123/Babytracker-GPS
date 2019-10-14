import React,{useState,useEffect} from 'react';
import './style.css';

import Moment from 'react-moment';
import DisplayRouteMap from './DisplayRouteMap';

import {geoCode} from '../../../../api/index';

const carTypeCyrrilic = {
    bus: 'Бус',
    sedan: 'Седан',
    suv: 'Сув'
};

export default ( { orderInfo = {},onEdit } ) => {

    const [origin,setOrigin] = useState(null);
    const [destination,setDestination] = useState(null);

    const {
        startTime,
        startAddress,
        endAddress,
        carType,
        primaryChildAge,
        childsAges
    } = orderInfo;

    useEffect( () => {
        const provideCoords = async () => {
            const result = await Promise.all([geoCode(startAddress),geoCode(endAddress)]);
            console.log(result);
            setOrigin(result[0].location);
            setDestination(result[1].location);
        };
        provideCoords();
    },[]);

    if(!origin || !destination) return null;

    return (
        <div className="checkout-form-wrapper">
            <div className="checkout-form-container">
                
                <div className="checkout-order-details-container">

                    <div className="checkout-order-details-row">
                        <div className="checkout-order-details-row-data-block">
                            <div className="checkout-order-details-row-data-key">
                                    <h4>Время и дата подачи машины</h4>
                            </div>
                            <div className="checkout-order-details-row-data-value">
                                    <h4>
                                        <Moment format="HH:mm DD/MM/YYYY">
                                            {startTime}
                                        </Moment>
                                    </h4>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-order-details-row">
                        <div className="checkout-order-details-row-data-block">
                            <div className="checkout-order-details-row-data-key">
                                <h4>Адрес подачи машины</h4>
                            </div>
                            <div className="checkout-order-details-row-data-value">
                                <h4>{startAddress}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-order-details-row">
                        <div className="checkout-order-details-row-data-block">
                            <div className="checkout-order-details-row-data-key">
                                <h4>Адрес перевозки</h4>
                            </div>
                            <div className="checkout-order-details-row-data-value">
                                <h4>{endAddress}</h4>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-order-details-row">
                        <div className="checkout-order-details-row-data-block">
                            <div className="checkout-order-details-row-data-key">
                                <h4>Тип машины</h4>
                            </div>
                            <div className="checkout-order-details-row-data-value">
                                <h4>{ carTypeCyrrilic[carType] }</h4>
                            </div>
                        </div>
                    </div>

                    <div className="checkout-order-details-row">
                        <div className="checkout-order-details-row-data-block">
                            <div className="checkout-order-details-row-data-key">
                                <h4>Возраст ребенка</h4>
                            </div>
                            <div className="checkout-order-details-row-data-value">
                                <h4>
                                { primaryChildAge.years > 0 && (
                                    <>
                                        <span className="underlined_age">
                                                {primaryChildAge.years}
                                        </span>
                                        <span>&nbsp;лет&nbsp;</span>
                                    </>
                                ) 
                                }
                                { primaryChildAge.months > 0 && (
                                    <>
                                        <span className="underlined_age">
                                                {primaryChildAge.months}
                                        </span>
                                        <span>&nbsp;месяцев</span>
                                    </>
                                ) 
                                }
                                </h4>
                            </div>
                        </div>
                    </div>


                </div>

                <div className="checkout-order-details-button-group">
                        <div className="checkout-order-details-button-container">
                                <button className="checkout-order-details-button purple">
                                    <p>
                                        Отменить
                                    </p>
                                    <p>
                                        заказ
                                    </p>
                                </button>
                        </div>
                        <div className="checkout-order-details-button-container">
                                <button className="checkout-order-details-button blue">
                                    <p>
                                        Изменить
                                    </p>
                                    <p>
                                        заказ
                                    </p>
                                </button>
                        </div>
                        <div className="checkout-order-details-button-container">
                                <button className="checkout-order-details-button green">
                                    <p>
                                        Утвердить
                                    </p>
                                    <p>
                                        и оплатить
                                    </p>
                                </button>
                        </div>
                </div>

                <div className="checkout-order-details-route-map-container">
                        <div className="checkout-order-details-route-map-title">
                            <h5>Карта маршрута</h5>
                        </div>
                        <DisplayRouteMap origin={ origin } destination={ destination } />
                </div>

            </div>
        </div>
    );
};