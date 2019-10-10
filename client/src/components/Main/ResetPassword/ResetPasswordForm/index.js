import React,{useState} from 'react';
import Button from '@material-ui/core/Button';

import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';

export default ({onSubmit}) => {
    const [password,setPassword] = useState('');
    const [passwordSame,setPasswordSame] = useState('');
    const [errors,setErrors] = useState({});

    const handleSubmitPress = () => {
        const newErrors = {};
        if(password.length < 5) newErrors.password = 'Password should containt at least 5 characters';
        if(passwordSame !== password) newErrors.passwordSame = 'Passwords should match...';
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
        }
        else {
            onSubmit({password})
        }
    };

    return (
        <div style={{display:'flex','justifyContent':'center','alignItems':'center','height':'100vh',flexDirection:'column'}}>
            <h1>Reset password</h1>
            <FormControl error={errors.password && errors.password.length > 0}>
                <InputLabel htmlFor="password-input">Password</InputLabel>
                <Input
                    id="password-input"
                    value={password}
                    type="password"
                    placeholder="Enter password"
                    onChange={ e => setPassword(e.target.value)}
                    aria-describedby="password-error-text"
                />
                <FormHelperText id="password-error-text">{errors.password || ''}</FormHelperText>
            </FormControl>
            <FormControl error={errors.passwordSame && errors.passwordSame.length > 0}>
                <InputLabel htmlFor="password-input">Password Same</InputLabel>
                <Input
                    id="passwordSame-input"
                    value={passwordSame}
                    type="password"
                    placeholder="Re-enter password"
                    onChange={ e => setPasswordSame(e.target.value)}
                    aria-describedby="passwordSame-error-text"
                />
                <FormHelperText id="passwordSame-error-text">{errors.passwordSame || ''}</FormHelperText>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubmitPress}>
                Reset
            </Button>
        </div>
    )
};