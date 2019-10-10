import React,{useEffect,useState,useContext} from 'react';
import { Marker,Map, GoogleApiWrapper ,Polygon,InfoWindow} from 'google-maps-react';

import {LoginContext} from '../../../contexts/LoginContext';
import {AccessContext} from '../../../contexts/AccessContext';
import { Container,Row,Col } from 'react-bootstrap';
import {getUserOrderById} from '../../../api';
import {Link,Redirect} from 'react-router-dom';

import Moment from 'react-moment';

const mapStyles = {
    width: '100%',
    height: '100vh',
};

const ViewOrder = (props) => {
    const [userId] = useContext(LoginContext);
    const [role] = useContext(AccessContext);
    
    const [startInfoWindow,setStartInfoWindow] = useState(null);
    const [endInfoWindow,setEndInfoWindow] = useState(null);

    useEffect(() => {
        const provideOrderInfo = async () => {
            let providedOrderInfo = null;
            if(role === 'CUSTOMER'){
                providedOrderInfo = await getUserOrderById(userId,orderId); 
            }
            providedOrderInfo && providedOrderInfo.ok && setOrderDetails(providedOrderInfo.order);
        }
        provideOrderInfo();
    },[]);

    const onHoverStartMarker = (props,marker,e) => {
        setStartInfoWindow(marker);
    };

    const onHoverEndMarker = (props,marker,e) => {
        console.log('OK');
        setEndInfoWindow(marker);
    }
    
    const [orderDetails,setOrderDetails] = useState(null);

    const orderId = props.match.params.id;

    if(!role && !userId) return <Redirect to="login" />

    if(!orderDetails) return null;

    const [startLocation,endLocation] = orderDetails.route;

    const carLocation = {lat: orderDetails.drivenBy.lat,lng: orderDetails.drivenBy.lng};

    return (
        <>
            <Map
            zoom={8}
            style={mapStyles}
            google={props.google}
            // initialCenter={{ lat: 47.444, lng: -122.176}}
            >
                    {
                        startLocation && (
                                <Marker
                                        optimized
                                        onMouseover={onHoverStartMarker}
                                        icon={{url: "http://maps.google.com/mapfiles/ms/icons/red.png"}}
                                        position={startLocation}
                                />
                        )
                    }

                    {
                        startInfoWindow   && (
                            <InfoWindow
                                marker={startInfoWindow}
                                visible={true}>
                                    <div>
                                        <Moment format="HH:mm">{orderDetails.startsAt}</Moment>
                                    </div>
                            </InfoWindow>
                        )
                    }

                    {
                        endLocation && (
                                <Marker
                                        optimized  
                                        onMouseover={onHoverEndMarker}
                                        icon={{url: "http://maps.google.com/mapfiles/ms/icons/green.png"}} 
                                        position={endLocation}
                                />
                        )
                    }

                    {
                        endInfoWindow   && (
                            <InfoWindow
                                marker={endInfoWindow}
                                visible={true}>
                                    <div>
                                        <Moment format="HH:mm">{orderDetails.endsAt}</Moment>
                                    </div>
                            </InfoWindow>
                        )
                    }

                   
                    
                    

                    {
                        carLocation && (
                            <Marker  
                                    icon={require('./car.ico')} 
                                    position={carLocation}
                            />
                        )
                    }

                    {
                        endLocation && startLocation && (
                            <Polygon
                                paths={[{...startLocation},{...endLocation}]}
                                strokeColor="#0000FF"
                                strokeOpacity={0.8}
                                strokeWeight={2}
                                fillColor="#0000FF"
                                fillOpacity={0.35}
                            />
                        )
                    }

            </Map>
        </>
    )
    
}

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDwYzFj9ZdoXVmoIV-BIopl7npSNY-h7z4'
})(ViewOrder);