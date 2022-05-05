
function getAttrFromDate({ date, attr }) {

    const months = [
        'Январь', 'Февраль', 'Март', 
        'Апрель', 'Май', 'Июнь', 
        'Июль', 'Август', 'Сентябрь',
        'Октябрь', 'Ноябрь', 'Декабрь'
    ];

    if(date) {
        const [ day, month, year ] = date.split('.');

        switch(attr) {
            case 'day':
                return;
            case 'month':
                return months[Number(month - 1)];
            default:
                return console.warn('GetAttrFromDate default error');
        }
    }


}

export default getAttrFromDate;