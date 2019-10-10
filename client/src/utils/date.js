export function getTomorrow() {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow;
}

export function addSeconds(date,seconds){
    var d1 = date,
    d2 = new Date ( d1 );
    d2.setSeconds ( d1.getSeconds() + seconds );
    return d2;
}