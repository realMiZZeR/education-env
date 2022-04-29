function getDateYearMonthDay (date) {
    const [ day, month, year ] = date.split('.');
    return `${year}-${month}-${day}`;
}

export default getDateYearMonthDay;