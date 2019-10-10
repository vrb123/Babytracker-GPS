import React,{useEffect,useState} from 'react';
import { Marker,Map, GoogleApiWrapper } from 'google-maps-react';

import {getAllCars,addCar, getCar} from '../../../api';

const mapStyles = {
    width: '100%',
    height: '100%',
};

const MapContainer = (props) => {

    const [carLocation,setCarLocation] = useState(null);

    const provideCarLocation = async () => {
      const {car,ok} = await getCar(props.match.params.id);
      if(ok){
        setCarLocation(car);
      }
      else{
        //Todo on error
      }
    };

    useEffect(() => {
      provideCarLocation();
      const locationUpdate = setInterval(provideCarLocation,5000);
      return () => {
        clearInterval(locationUpdate);
      };
    },[]);

    if(!carLocation) return null;
    return (
      <>
        {/* <button onClick={addNewCar}>ADD CAR</button> */}
        <Map
          zoom={8}
          style={mapStyles}
          google={props.google}
          // initialCenter={{ lat: 47.444, lng: -122.176}}
        >
        {
            <Marker 
                icon={require('./car.ico')} 
                position={{ lat: carLocation.latitude, lng: carLocation.longitude}}
            />
        }

        </Map>
      </>
        
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDwYzFj9ZdoXVmoIV-BIopl7npSNY-h7z4'
})(MapContainer);