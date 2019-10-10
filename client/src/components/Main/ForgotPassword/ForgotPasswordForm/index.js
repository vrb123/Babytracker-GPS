import React,{useState} from 'react';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import {validateEmail} from '../../../../utils/validation';

export default ({onSubmit}) => {
    const [email,setEmail] = useState('');
    const [errors,setErrors] = useState({});

    const handleSubmitPress = () => {
        const newErrors = {};
        if(email.length < 5) newErrors.email = 'Email should containt at least 5 characters';
        else if(!validateEmail(email)) newErrors.email = 'Email doesn`t match with the pattern';

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
        }
        else {
            onSubmit({email})
        }
    };

    return (
        <div style={{display:'flex','justifyContent':'center','alignItems':'center','height':'100vh',flexDirection:'column'}}>
            <h1>Reset password</h1>
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
            <Button variant="contained" color="primary" onClick={handleSubmitPress}>
                Reset
            </Button>
        </div>
    )
};