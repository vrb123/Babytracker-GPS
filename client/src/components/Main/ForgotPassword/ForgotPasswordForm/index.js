import React,{useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import './style.css';
import {validateEmail} from '../../../../utils/validation';

export default ({onSubmit}) => {

    const [email,setEmail] = useState('');

    const [errors,setErrors] = useState({});

    const handleSubmitPress = () => {
        const newErrors = {};
        if(email.length < 5) newErrors.email = 'Минимальное количество символов email - 5';
        else if( !validateEmail(email) ) newErrors.email = 'Email не совпадает с шаблоном';

        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors);
        }      
        else
            onSubmit({
                email,
            })
    };

    return (
        <div className="login-form-wrapper">
            <div className="login-form-container">
                <div className="login-form-brand-logo">
                    <img src={require('./baby_transfer.jpg')} alt='brand' />
                </div>
                <div className="welcome-login-form-title">
                    <h2>Восстановление пароля</h2>
                </div>
                <div className="login-form-input">
                    <input 
                        type="text" 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)} 
                    />
                </div>
                <div className="login-form-submit">
                    <button onClick={handleSubmitPress}>Восстановить</button>
                </div>
                <div className="login-form-links">
                    <Link to="/register">Регистрация</Link>
                    <Link to="/login">Вход</Link>
                </div>
            </div>
        </div>
    )
};