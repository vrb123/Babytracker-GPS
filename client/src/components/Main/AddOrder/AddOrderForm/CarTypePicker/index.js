import React,{useState} from 'react';

import './style.css';

export default ({cars,onChange,selected=''}) => {

    return (
        <div className="car-picker-block">
            {
                cars.map(car => (
                    <div
                        className={"car-picker-child "+(car === selected && "active-car" )}
                        onClick={() => onChange(car)}
                    >
                        <img 
                            src={require(`./cars/${car}.png`)} 
                            alt={car} 
                        />
                    </div>
                ))
            }
        </div>
    );
};