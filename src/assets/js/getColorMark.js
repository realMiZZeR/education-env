// className = `mark`, mark = number
const getColorMark = ({ className, mark }) => {
    switch(mark) {
        case 1:
            return `${className}_one`;
        case 2:
            return `${className}_two`;
        case 3:
            return `${className}_three`;
        case 4:
            return `${className}_four`;
        case 5:
            return `${className}_five`;
        default:
            return `${className}_another`;
    }
}

export default getColorMark