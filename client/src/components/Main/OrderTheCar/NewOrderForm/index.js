import React,{useState} from 'react';
import './style.css';
import DatePicker from "react-datepicker";

import InputNumber from 'antd/es/input-number';

import "react-datepicker/dist/react-datepicker.css";
import CarTypePicker from './CarTypePicker';

import AddCircleOutline from '@material-ui/icons/AddCircleOutline';
import Octicon, {getIconByName} from '@githubprimer/octicons-react';

import TickleCheckbox from './TickleCheckbox';

export default () => {

    const [startTime,setStartTime] = useState( new Date() );
    const [startAddress,setStartAddress] = useState('');
    const [endAddress,setEndAddress] = useState('');
    const [carType,setCarType] = useState('');

    const [primaryChildAge,setPrimaryChildAge] = useState({months:0,years:0});

    const [childsAges,setChildsAges] = useState( [] );

    const [num,setNum] = useState(0);

    const onPrimaryChildAgeChange = (type,value) => {
        setPrimaryChildAge({...primaryChildAge,[type]:value});
    };

    const onChildsAgesChange = (index,type,value) => {
        const newChildsAges = [...childsAges].map( (child,child_index) => {
            if(index === child_index) return { ...child, [type]: value };
            return child;
        });
        setChildsAges(newChildsAges);
    };

    const addNewChild = () => {
        setChildsAges([...childsAges,{months:0,years:0}]);
    };

    const deleteChild = index => {
        setChildsAges([...childsAges].filter((_,i) => i !== index ));
    };

    return (
        <div className="new-order-form-container">
            <div className="new-order-form-control">
                <div className="new-order-form-control-title">
                    <h4>Время и дата подачи машины</h4>
                </div>
                <div className="new-order-form-control-input">
                <DatePicker
                    selected={startTime}
                    onChange={setStartTime}
                    locale="ru-Ru"
                    showTimeSelect
                    timeFormat="p"
                    timeIntervals={5}
                    dateFormat="Pp"
                />
                </div>
            </div>
            <div className="new-order-form-control">
                <div className="new-order-form-control-title">
                    <h4>Адрес подачи машины</h4>
                </div>
                <div className="new-order-form-control-input" >
                    <input 
                        type="text" 
                        value={startAddress} 
                        onChange={e => setStartAddress(e.target.value)} 
                    />
                    <button className="show-on-map-button">Показать на карте</button>
                </div>
            </div>
            <div className="new-order-form-control">
                <div className="new-order-form-control-title">
                    <h4>Адрес перевозки</h4>
                </div>
                <div className="new-order-form-control-input">
                    <input 
                        type="text" 
                        value={endAddress} 
                        onChange={e => setEndAddress(e.target.value)} 
                    />
                    <button className="show-on-map-button">Показать на карте</button>
                </div>
            </div>
            <div className="new-order-form-control">
                <div className="new-order-form-control-title">
                    <h4>Тип автомобиля</h4>
                </div>
                <div className="new-order-form-control-input">
                    <CarTypePicker cars={['sedan','suv','bus']} selected={carType} onChange={setCarType} />
                </div>
            </div>
            <div className="new-order-form-control">
                <div className="new-order-form-control-title">
                    <div className="new-order-form-control-group">
                        <h4>Возраст ребенка</h4>
                        <button className="new-order-plus-button" onClick={addNewChild}>                            
                            <AddCircleOutline/>
                        </button>
                    </div>
                    
                </div>
                <div className="new-order-form-control-input">
                    <InputNumber 
                        value={primaryChildAge['years']} 
                        onChange={value => onPrimaryChildAgeChange('years',value)} 
                        max={12}
                    />
                    лет 
                    <InputNumber 
                        value={primaryChildAge['months']} 
                        onChange={value => onPrimaryChildAgeChange('months',value)}
                        max={12}
                    /> 
                    мес
                </div>
            </div>


            {
                childsAges.map( (child,index) => (

                    <div className="new-order-form-control">
                            <div className="new-order-form-control-title">
                                <h4>Возраст ребенка {index+2} </h4>
                                <button 
                                    className="new-order-plus-button" 
                                    onClick={() => deleteChild(index)}
                                >
                                    <Octicon icon={getIconByName('x')} />
                                </button>
                            </div>
                            <div className="new-order-form-control-input">
                                <InputNumber 
                                    value={child['years']} 
                                    onChange={value => onChildsAgesChange(index,'years',value)} 
                                    max={12}
                                />
                                лет 
                                <InputNumber 
                                    value={child['months']} 
                                    onChange={value => onChildsAgesChange(index,'months',value)}
                                    max={12}
                                /> 
                                мес
                            </div>
                    </div>
                ))
            }

            <div className="new-order-form-control">
                <div className="new-order-form-control-title">
                    <div className="new-order-form-control-group">
                        <h4>Туда и обратно</h4>
                        <TickleCheckbox />
                    </div>
                </div>
            </div>

            <div className="calc-order-container">
                <button className="calc-order-button">Просчитать заказ</button>
            </div>
        </div>
    );
};