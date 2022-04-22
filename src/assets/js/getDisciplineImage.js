import generalDiscipline from '../images/disciplines/general.svg';

const getDisciplineImage = (disciplineType) => {
    switch(disciplineType) {
        case 'general':
            return <img src={ generalDiscipline } alt='' />
        default:
            return console.error('Failed to set image of discipline');
    }
}

export default getDisciplineImage;