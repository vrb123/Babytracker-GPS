import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import MuiPhoneInput from 'material-ui-phone-number';
import {validateEmail,validatePhoneNumber} from '../../../../utils/validation';

export default ({onSubmit}) => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [phoneNumber,setPhoneNumber] = useState('');

    const [errors,setErrors] = useState({});

    const handleSubmitPress = () => {
        const newErrors = {};
        if(email.length < 5) newErrors.email = 'Минимальное количество символов email - 5';
        else if( !validateEmail(email) ) newErrors.email = 'Email не совпадает с шаблоном';

        if(password.length < 5) newErrors.password = 'Минимальное количество символов пароля - 5';
        
        const phone = phoneNumber.split('').filter( c => c !== ' ' && c !== '(' && c !== ')').join('');

        if(!validatePhoneNumber(phone)) newErrors.phoneNumber = 'Неправильный номер телефона';

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
        }      
        else
            onSubmit({
                email,
                password,
                phoneNumber
            })
    };

    return (
        <div className="login-form-wrapper">
            <div className="login-form-container">
                <div className="login-form-brand-logo">
                    <img src={require('./baby_transfer.jpg')} alt='brand' />
                </div>
                <div className="welcome-login-form-title">
                    <h2>Регистрация</h2>
                </div>
                <div className="login-form-input">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                </div>
                <div className="login-form-input">
                    <input 
                        type="password" 
                        placeholder="Пароль" 
                        value={password} 
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="login-form-input">
                    <MuiPhoneInput 
                            error={errors.phoneNumber && errors.phoneNumber.length > 0} 
                            placeholder="Введите номер телефона" 
                            value={phoneNumber} 
                            defaultCountry={'ua'} 
                            onChange={setPhoneNumber}
                    />
                </div>
                <div className="login-form-submit">
                    <button onClick={handleSubmitPress}>Регистрация</button>
                </div>
                <div className="login-form-links">
                    <Link to="/login">Вход</Link>
                    <Link to="/forgotPassword">Восстановить пароль</Link>
                </div>
            </div>
        </div>
    )
};