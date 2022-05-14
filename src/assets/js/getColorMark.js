// className = `mark`, mark = number
const getColorMark = ({ className, mark }) => {
    switch(mark) {
        case 1:
            return `${className}_terrible`;
        case 2:
            return `${className}_bad`;
        case 3:
            return `${className}_satisfactorily`;
        case 4:
            return `${className}_good`;
        case 5:
            return `${className}_excellent`;
        default:
            return `${className}_another`;
    }
}

export default getColorMark