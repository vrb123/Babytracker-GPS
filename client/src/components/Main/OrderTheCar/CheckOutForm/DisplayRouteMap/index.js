import React,{useState,useEffect} from 'react';
import './style.css';

import { Marker,Map, GoogleApiWrapper ,Polygon} from 'google-maps-react';

const mapStyles = {
    width: 'inherit',
    height: 'inherit',
    maxWidth: 'inherit',
    maxHeight: 'inherit'
};

const DisplayRouteMap = ({origin,destination,...rest}) => {
    
    if(!origin || !destination) return null;
    
    return (
        <div className="display-route-map-container">
            <Map
                zoom={3}
                style={mapStyles}
                google={rest.google}
                initialCenter={origin}
            >
                <Marker 
                    optimized
                    // onMouseover={onHoverStartMarker}
                    icon={{url: "http://maps.google.com/mapfiles/ms/icons/red.png"}}
                    position={origin}
                />

                <Marker  
                    optimized  
                    //onMouseover={onHoverEndMarker}
                    icon={{url: "http://maps.google.com/mapfiles/ms/icons/green.png"}} 
                    position={destination}
                />

                <Polygon
                    paths={[{...origin},{...destination}]}
                    strokeColor="#0000FF"
                    strokeOpacity={0.8}
                    strokeWeight={2}
                    fillColor="#0000FF"
                    fillOpacity={0.35}
                />

            </Map>
        </div>
            
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDwYzFj9ZdoXVmoIV-BIopl7npSNY-h7z4'
})(DisplayRouteMap);