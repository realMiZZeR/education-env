import theoryIcon from '../images/icons/tasks/theory.svg';
import practiceIcon from '../images/icons/tasks/practice.svg';
import testIcon from '../images/icons/tasks/test.svg';

const getTypeTask = (type) => {
    switch(type) {
        case 1:
            return theoryIcon;
        case 2:
            return practiceIcon;
        case 3:
            return testIcon;
    }
}

export default getTypeTask;