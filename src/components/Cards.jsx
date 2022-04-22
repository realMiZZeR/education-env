import { Link } from 'react-router-dom';

function CardsItem({ id, title, image, link }) {

    return (
        <Link to={link} className='cards__item'>
            <h3 className='cards__title'>{ title }</h3>
            <div className='cards__image'>
                <img src={image} alt='Создать' />
            </div>
        </Link>
    );

}

function Cards({ children }) {
    return (
        <div className='cards'>
            { children }
        </div>
    )
}

export { Cards, CardsItem };