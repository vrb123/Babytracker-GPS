import React,{useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {getRouteInfo,getPermissiveCars} from '../../../../api'
import {addSeconds} from '../../../../utils/date'

import { Marker,Map, GoogleApiWrapper ,Polygon} from 'google-maps-react';

import './style.css';

const mapStyles = {
    width: '100%',
    height: '30vh',
};

const AddOrderForm = ({onSubmit,userId, ...rest}) => {
    const [carId,setCarId] = useState('');
    const [errors,setErrors] = useState({});

    const [selectStartLoc,toggleSelectStartLoc] = useState(false);
    const [selectEndLoc,toggleSelectEndLoc] = useState(false);

    const [startLocation,setStartLocation] = useState(null);
    const [endLocation,setEndLocation] = useState(null);

    const [startTime,setStartTime] = useState('');

    const [duration,setDuration] = useState(null);
    const [distance,setDistance] = useState(null);

    const [cost,setCost] = useState(0);

    const [permissiveCars,setPermissiveCars] = useState([]);

    useEffect(() => {
       startLocation && endLocation && provideRouteInfo();
    },[startLocation,endLocation]);

    useEffect(() => {
        duration && providePermissiveCars();
    },[duration]);

    useEffect(() => {
        distance && setCost(distance.value * 0.0000114);
    },[distance]);

    const handleSubmitPress = () => {
        const newErrors = {};
        if(!carId) newErrors['carId'] = 'Provide car';
        if(!startLocation) newErrors['startLocation'] = 'Provide origin location';
        if(!endLocation) newErrors['endLocation'] = 'Provide destination location';
        if(!startTime) newErrors['startTime'] = 'Provide start time';

        if(Object.keys(newErrors).length > 0 || !duration || !distance)
            setErrors(newErrors);
        else {
            onSubmit({
                startsAt: startTime,
                endsAt: addSeconds(new Date(startTime),duration.value).toISOString(),
                drivenBy: carId,
                createdBy: userId,
                route: [{...startLocation},{...endLocation}]
            })
        }
    };

    const providePermissiveCars = async () => {
        const start = new Date(startTime);
        const end = addSeconds(start,duration.value);
        console.log(start);
        console.log(end);
        const {ok,cars} = await getPermissiveCars(userId,start,end);
        ok && setPermissiveCars(cars);
    };

    const provideRouteInfo = async () => {
        const {ok,duration,distance} = await getRouteInfo(startLocation,endLocation);
        if(ok){
            setDuration(duration);
            setDistance(distance);
        }
        else{
            //Todo error occured
        }
    };

    const onMapClick =  (t, map, coord) => {
        if(!selectEndLoc && !selectStartLoc) return;

        const { latLng } = coord;
        const lat = latLng.lat();
        const lng = latLng.lng();

        if(selectStartLoc) {
            setStartLocation({lat,lng});
            toggleSelectStartLoc(!selectStartLoc);
        }
        else if (selectEndLoc) {
            setEndLocation({lat,lng});
            toggleSelectEndLoc(!selectEndLoc);
        }
      }

    const onPickStartLocationButtonClick = () => {
        if(selectEndLoc) return;
        toggleSelectStartLoc(!selectStartLoc);
    };

    const onPickEndLocationButtonClick = () => {
        if(selectStartLoc) return;
        toggleSelectEndLoc(!selectEndLoc);
    };

    return (
        <div class="login-form">
            <h1>Order the car</h1>
            <FormControl >
                <TextField
                    id="date-input"
                    label="Start time: "
                    type="datetime-local"
                    value={startTime}
                    onChange={e => setStartTime(e.target.value)}
                    aria-describedby="email-date-input"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormHelperText id="email-date-input">{errors.date || ''}</FormHelperText>
            </FormControl>

            <FormControl>
                <Select
                value={carId}
                onChange={e => setCarId(e.target.value)}
                inputProps={{
                    name: 'age',
                    id: 'age-simple',
                }}
                >
                {
                    permissiveCars.map( (car) => (
                        <MenuItem key={car._id} value={car._id}>{car.carNumber}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
            
            <div className="form-group-location">
                <Button variant="outlined" onClick={onPickStartLocationButtonClick} color={selectStartLoc?"primary":"secondary"}>
                {!selectStartLoc?"Select":"Unselect"} start location
                </Button>
                <Button variant="outlined" onClick={onPickEndLocationButtonClick} color={selectEndLoc?"primary":"secondary"}>
                    {!selectEndLoc?"Select":"Unselect"} end location
                </Button>
            </div>

            <div>
                {
                    cost && <p>Costs approxomitely {cost}</p>
                }

                {
                    duration && <p>Takes approxomitely {duration.text}</p>
                }

                {
                    distance && <p>Takes approxomitely {distance.text}</p>
                }
            </div>

            <div className="form-group-map">
                <Map
                    zoom={8}
                    style={mapStyles}
                    google={rest.google}
                    onClick={onMapClick}
                    // initialCenter={{ lat: 47.444, lng: -122.176}}
                >

                {
                    startLocation && (
                        <Marker 
                                icon={{url: "http://maps.google.com/mapfiles/ms/icons/red.png"}}
                                position={startLocation}
                        />
                    )
                }

                {
                    endLocation && (
                        <Marker  
                                icon={{url: "http://maps.google.com/mapfiles/ms/icons/green.png"}} 
                                position={endLocation}
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
            </div>

            
            

            <Button variant="contained" color="primary" onClick={handleSubmitPress}>
                Submit
            </Button>
        </div>
    )
};

export default GoogleApiWrapper({
    apiKey: 'AIzaSyDwYzFj9ZdoXVmoIV-BIopl7npSNY-h7z4'
})(AddOrderForm);