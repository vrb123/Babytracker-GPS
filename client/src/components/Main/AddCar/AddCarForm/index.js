import React,{useState,useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {getPermissiveDrivers} from '../../../../api';

export default ({onSubmit,userId}) => {

    const [driverId,setDriverId] = useState('');
    const [carNumber,setCarNumber] = useState('');
    
    const [permissiveDrivers,setPermissiveDrivers] = useState([])
    
    const [errors,setErrors] = useState({});

    useEffect(() => {
        const providePermissiveDrivers = async () => {
            const {ok,drivers} = await getPermissiveDrivers(userId);
            if(ok){
                setPermissiveDrivers(drivers);
            }
            else {
                //Todo
            }
        };
        providePermissiveDrivers();
    },[]);

    const handleSubmitPress = () => {
        const newErrors = {};
        if(!carNumber) newErrors['carNumber'] = 'Provide car number';
        if(!driverId) newErrors['driverId'] = 'Provide driver';

        if(Object.keys(newErrors).length > 0)
            setErrors(newErrors);
        else {
            onSubmit({
               driverId,
               carNumber
            });
        }
    };

    return (
        <div class="login-form">
            <h1>Add the car</h1>
            <FormControl >
                <TextField
                    id="car-number-input"
                    label="Car number: "
                    value={carNumber}
                    onChange={e => setCarNumber(e.target.value)}
                    aria-describedby="car-number-input"
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <FormHelperText id="car-number-input">{errors.carNumber || ''}</FormHelperText>
            </FormControl>
            <FormControl>
                <Select
                value={driverId}
                onChange={e => setDriverId(e.target.value)}
                inputProps={{
                    name: 'age',
                    id: 'age-simple',
                }}
                >
                {
                    permissiveDrivers.map( driver => (
                        <MenuItem key={driver._id} value={driver._id}>{driver.email}</MenuItem>
                    ))
                }
                </Select>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmitPress}>
                Submit
            </Button>
        </div>
    );
}