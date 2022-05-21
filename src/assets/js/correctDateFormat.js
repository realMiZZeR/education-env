const correctDateFormat = (date) => {
    return new Date(date).toLocaleDateString();
}

export default correctDateFormat;