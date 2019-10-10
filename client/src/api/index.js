

export const signUp = async formData => {
    try {
        console.log(formData);
        const response = await fetch ('auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const {ok,userId,role} = await response.json();
        if(!ok) throw new Error('An error occured...');
        return {
            ok,
            userId,
            role
        }
    }
    catch(err){
        return {
            ok: false
        }
    }
};

export const login = async formData => {
    try {
        const response = await fetch ('auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const {ok,userId,role} = await response.json();
        if(!ok) throw new Error('An error occured...');
        return {
            ok,
            userId,
            role
        }
    }
    catch(err){
        return {
            ok: false
        }
    }
};

export const forgotPassword = async formData => {
    try {
        const response = await fetch('auth/forgotPassword',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const {ok} = await response.json();
        return {
            ok
        };
    }   
    catch(err){
        return {
            ok: false
        }
    } 
};

export const resetPassword = async (token) => {
    console.log('Token: '+token);
    try {
        const response = await fetch(`/auth/reset/${token}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {ok,email} = await response.json();
        console.log('EMAIL: '+email);
        if(!ok) throw new Error('An error occured');
        return {
            ok,
            email
        };
    }
    catch(err){
        console.log(err);
        return {
            ok: false
        }
    }
};

export const updatePasswordViaEmail = async formData => {
    try {
        const response = await fetch('/auth/updatePasswordViaEmail',{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const {ok} = await response.json();
        console.log(ok);
        return {
            ok
        };
    }   
    catch(err){
        console(err);
        return {
            ok: false
        }
    } 
};

export const getAllCars = async () => {
    try {
        const response = await fetch('car',{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {cars,ok} = await response.json();
        if(!ok) throw new Error('An error occured');
        return {
            cars,
            ok
        };
    }
    catch(err){
        return {
            ok: false
        }
    }
};

export const getCar = async carNumber => {
    try {
        const response = await fetch('/car/'+carNumber,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {car,ok} = await response.json();
        if(!ok) throw new Error('An error occured');
        return {
            car,
            ok
        };
    }
    catch(err){
        console.log(err);
        return {
            ok: false
        }
    }
};

// export const addCar = async (carNumber = 'hello22') => {
//     console.log('CLICKED');
//     try{
//         const response = await fetch('car',{
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({carNumber})
//         });
//         const {ok,car} = await response.json();
//         if(!ok) throw new Error('An error occured');
//         console.log(car);
//         return {
//             car,
//             ok,
//         };
//     }
//     catch(err){
//         console.log(err);
//         return {
//             ok: false
//         }
//     }
// }

export const getPermissiveCars = async (userId,startTime,endTime) => {
    try{
        const response = await fetch(`/user/carsAvailable/${userId}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({startTime: new Date(startTime),endTime:new Date(endTime) })
        });
        const {ok,cars} = await response.json();
        if(!ok) throw new Error('An error occured');
        return {
            ok,
            cars
        }
    }
    catch(err){
        console.log(err);
        return {
            ok: false
        }
    }
    
};

export const getRouteInfo = async (start,end) => {
    const startLocationStr = start && (start.lat+","+start.lng);
    const endLocationStr = end && (end.lat+","+end.lng);
    try{
        const response = await fetch('/thirdParty/routeInfo',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({start: startLocationStr,end: endLocationStr})
        });
        const result = await response.json();
        console.log(result);
        if(result.ok){
            const {distance,duration} = result;
            if(distance && duration){
                return {
                    ok: true,
                    distance,
                    duration
                }
            }
            throw new Error();
        }
        else throw new Error();
    }
    catch(err){
        console.log('err');
        return {
            ok: false
        }
    }
};

export const userAddOrder = async formData => {
    try{
        const response = await fetch(`/user/`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const {ok,order} = await response.json();
        if(!ok) throw new Error('An error occured');
        return {
            ok,
            order
        }
    }
    catch(err){
        console.log(err);
        return {
            ok: false
        }
    }
};

export const getUserOrders = async id => {
    try {
        const response = await fetch(`/user/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {ok,orders} = await response.json();
        if(!ok) throw new Error('An error occured.');
        return {
            ok,
            orders
        };
    }
    catch(err){
        console.log(err);
        return {
            ok: false
        };
    }
}

export const getUserOrderById = async (userId,id) => {
    try {
        const response = await fetch(`/user/${userId}/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {ok,order} = await response.json();
        if(!ok) throw new Error('An error occured.');
        return {
            ok,
            order
        };
    }
    catch(err){
        console.log(err);
        return {
            ok: false
        };
    }
}

export const getAllOrders = async id => {
    try {
        const response = await fetch(`/manager/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {ok,orders} = await response.json();
        if(!ok) throw new Error('An error occured.');
        return {
            ok,
            orders
        };
    }
    catch(err){
        console.log(err);
        return {
            ok: false
        };
    }
}

export const getDriverOrders = async id => {
    try {
        const response = await fetch(`/driver/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {ok,orders} = await response.json();
        if(!ok) throw new Error('An error occured.');
        return {
            ok,
            orders
        };
    }
    catch(err){
        console.log(err);
        return {
            ok: false
        };
    }
}

export const getPermissiveDrivers = async id => {
    try {
        const response = await fetch(`/manager/permissiveDrivers/${id}`,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const {ok,drivers} = await response.json();
        if(!ok) throw new Error('An error attempted');
        return {
            ok: true,
            drivers
        };
    }
    catch(err){
        return {
            ok: false
        }
    }
};

export const addCar = async (id,formData) => {
    try {
        const response = await fetch(`/manager/car/${id}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });
        const {ok} = await response.json();
        return {
            ok
        };
    }
    catch(err){
        return {
            ok: false
        }
    }
}