import { Link } from 'react-router-dom';
import notfoundIcon from '../assets/images/icons/notfound.svg';

export default function PageNotFound() {
    return (
        <div className='notfound'>
            <div className='notfound__image'>
                <img src={notfoundIcon} alt='Лого 404' />
            </div>
            <h2 className='notfound__title'>Страницы не существует!</h2>
            <p className='notfound__descr'>Возможно, вы ввели неверный URL-адрес</p>
            <Link to='home' className='notfound__link link'>На главную</Link>
        </div>
    );
}