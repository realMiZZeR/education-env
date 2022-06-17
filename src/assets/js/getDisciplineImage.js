import studyIcon from '../images/disciplines/general.png';
import technologyIcon from '../images/disciplines/tech.png';

// alternative icons
import technologyAlternativeIcon from '../images/icons/disciplines/tech.svg';
import studyAlternativeIcon from '../images/icons/disciplines/study.svg';

// active icons
import technologyActiveIcon from '../images/icons/disciplines/tech_active.svg';
import studyActiveIcon from '../images/icons/disciplines/study_active.svg';

// isAlternative means blue icons
const getDisciplineImage = ({type, isActive = false, isAlternative = false}) => {

    // for black or white icon (ex., tasks page)
    if(isActive) {
        switch(type) {
            case 1:
                return technologyActiveIcon;
            case 2:
                return studyActiveIcon;
            case 3:
                return technologyActiveIcon;
            default:
                return 'getDisciplineImage hasnt type of image';
        } 
    } else if(isAlternative) {
        switch(type) {
            case 1:
                return technologyAlternativeIcon;
            case 2:
                return studyAlternativeIcon;
            case 3:
                return technologyAlternativeIcon;
            default:
                return 'getDisciplineImage hasnt type of image';
        } 
    }
    // --------------------------------------------
    
    switch(type) {
        case 1:
            return technologyIcon;
        case 2:
            return studyIcon;
        case 3:
            return technologyIcon;
        default:
            return 'getDisciplineImage hasnt type of image';
    }
}

export default getDisciplineImage;