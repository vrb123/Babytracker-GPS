import React,{useState} from 'react';
import MuiPhoneInput from 'material-ui-phone-number';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {Link} from 'react-router-dom';
import {validateEmail,validatePhoneNumber} from '../../../../utils/validation';

import './style.css';

export default ({onSubmit}) => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    const [errors,setErrors] = useState({});

    const handleSubmitPress = () => {
        const newErrors = {};
        if(email.length < 5) newErrors.email = 'Email should have at least 5 characters';
        else if( !validateEmail(email) ) newErrors.email = 'Email should match with pattern';

        if(password.length < 5) newErrors.password = 'Password should have at least 5 characters';
        
        if(Object.keys(newErrors).length > 0)
            setErrors(newErrors);
        else
            onSubmit({
                email,
                password,
            })
    };

    return (
        <div class="login-form">
            <h1>Login</h1>
            <FormControl error={errors.email && errors.email.length > 0}>
                <InputLabel htmlFor="email-input">Email</InputLabel>
                <Input
                    id="email-input"
                    value={email}
                    type="email"
                    placeholder="Enter email"
                    onChange={ e => setEmail(e.target.value)}
                    aria-describedby="email-error-text"
                />
                <FormHelperText id="email-error-text">{errors.email || ''}</FormHelperText>
            </FormControl>

            <FormControl error={errors.password && errors.password.length > 0}>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input
                id="password-input"
                value={password}
                type="password"
                placeholder="Enter password"
                onChange={e => setPassword(e.target.value)}
                aria-describedby="password-error-text"
                />
                <FormHelperText id="password-error-text">{errors.password || ''}</FormHelperText>
            </FormControl>

            {/* <MuiPhoneInput error={errors.phoneNumber && errors.phoneNumber.length > 0} placeholder="Provide number" value={phoneNumber} defaultCountry={'ua'} onChange={setPhoneNumber}/> */}
            <Button variant="contained" color="primary" onClick={handleSubmitPress}>
                Submit
            </Button>
            <Link to="/register" >Not yet registered?</Link>
            <Link to="/forgotPassword" >Forgot password?</Link>
        </div>
    )
};