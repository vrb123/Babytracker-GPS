import React,{useEffect,useState} from 'react';
import { Marker,Map, GoogleApiWrapper,DirectionsRenderer } from 'google-maps-react';



import {getAllCars,addCar} from '../../../api';

const mapStyles = {
    width: '100%',
    height: '100%',
  };

const MapContainer = (props) => {

    const [carLocations,setCarLocations] = useState([]);

    const provideCarLocations = async () => {
      const {cars,ok} = await getAllCars();
      if(ok){
          setCarLocations(cars);
      }
      else{
        //Todo on error
      }
    };

    useEffect(() => {
      provideCarLocations();
      const locationUpdate = setInterval(provideCarLocations,5000);

      return () => {
        clearInterval(locationUpdate);
      }
    },[]);

    return (
      <>
        <Map
          zoom={8}
          style={mapStyles}
          google={props.google}
        >
          {
            carLocations.map(car => (
              <Marker
                icon={require('./car.ico')} 
                position={{ lat: car.latitude, lng: car.longitude}} 
              />
            ))
          }
        </Map>
      </>
        
    );
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDwYzFj9ZdoXVmoIV-BIopl7npSNY-h7z4'
})(MapContainer);