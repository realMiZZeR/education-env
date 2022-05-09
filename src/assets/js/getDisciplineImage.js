import studyIcon from '../images/disciplines/general.png';
import technologyIcon from '../images/disciplines/tech.png';

// alternative icons
import technologyAlternativeIcon from '../images/icons/disciplines/tech.svg';
import studyAlternativeIcon from '../images/icons/disciplines/study.svg';

// active icons
import technologyActiveIcon from '../images/icons/disciplines/tech_active.svg';
import studyActiveIcon from '../images/icons/disciplines/study_active.svg';

// isAlternative means blue icons
const getDisciplineImage = ({type, isActive, isAlternative = false}) => {

    if(isActive) {
        switch(type) {
            case 1:
                return technologyActiveIcon;
            case 2:
                return studyActiveIcon;
            case 3:
                return technologyActiveIcon;
        } 
    } else {
        switch(type) {
            case 1:
                return technologyAlternativeIcon;
            case 2:
                return studyAlternativeIcon;
            case 3:
                return technologyAlternativeIcon;
        } 
    }
    
    switch(type) {
        case 1:
            return technologyIcon;
        case 2:
            return studyIcon;
        case 3:
            return technologyIcon;
    }
}

export default getDisciplineImage;