function getDayOfWeek(date) {
    const daysOfWeek = [
        'Воскресенье',
        'Понедельник',
        'Вторник',
        'Среда',
        'Четверг',
        'Пятница',
        'Суббота'
    ];

    const [day, month, year] = date.split('.');
    const dateParse = new Date(year, Number(month)-1, day);

    return daysOfWeek[dateParse.getDay()];
}

export default getDayOfWeek;