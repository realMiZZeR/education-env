import studyIcon from '../images/disciplines/general.png';
import technologyIcon from '../images/disciplines/tech.png';

const getDisciplineImage = (disciplineType) => {
    switch(disciplineType) {
        case 1:
            return technologyIcon;
        case 2:
            return studyIcon;
        case 3:
            return technologyIcon;
        default:
            return console.error('Failed to set image of discipline');
    }
}

export default getDisciplineImage;