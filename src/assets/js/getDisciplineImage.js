import studyIcon from '../images/disciplines/general.png';
import technologyIcon from '../images/disciplines/tech.png';

const getDisciplineImage = (disciplineType) => {
    switch(disciplineType) {
        case 'study':
            return studyIcon;
        case 'tech':
            return technologyIcon;
        case 'alch':
            return technologyIcon;
        default:
            return console.error('Failed to set image of discipline');
    }
}

export default getDisciplineImage;