
function correctMarkFormat(number) {
    if(number === null) number = 0;
    let fixedNumber = number.toFixed(2);
    return String(fixedNumber).replace('.', ',');
}

export default correctMarkFormat;