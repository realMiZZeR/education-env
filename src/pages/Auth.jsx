import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import updateTitle from '../assets/js/updateTitle';
import SwitchButton from '../components/SwitchButton';

function AuthAsideParagraph(props) {
    return (
        <p className='auth-aside__paragraph'>
            { props.children }
        </p>
    )
}

function Auth(props) {

    useEffect(() => {
        updateTitle(props.title);
    }, [props.title]);

    const navigate = useNavigate();
    const location = useLocation();
    const { signIn } = useAuth();

    const [ login, setLogin ] = useState(null);
    const [ password, setPassword ] = useState(null);
    const [ rememberPassword, setRememberPassword ] = useState(false);
    const [ errorMessages, setErrorMessages ] = useState({});

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMessages({});

        const form = e.target;

        // сделать валидацию

        if(Object.keys(errorMessages).length > 0) return;

        const user = {
            login: form.login.value,
            password: form.password.value
        };

        signIn(user, () => navigate('/home', {replace: true}));

    }
    const rememberPasswordHandler = () => {
        setRememberPassword(!rememberPassword);
    }

    return (
        <article className='auth'>
            <form onSubmit={handleSubmit}
            method='POST'
            className='auth-form'>
                <h2 className='auth-form__heading'>Вход в систему</h2>
                <div className='auth-form__field'>
                    <input 
                    type='text' 
                    name='login' 
                    className='auth-form__input input' 
                    placeholder='Логин'
                    onChange={e => setLogin(e.target.value)}
                    />
                    {errorMessages.login && 
                        <span className='auth-form__error'>{errorMessages.login}</span>
                    }
                </div>
                <div className='auth-form__field'>
                    <input 
                    type='password' 
                    name='password' 
                    className='auth-form__input input' 
                    placeholder='Пароль'
                    onChange={e => setPassword(e.target.value)} 
                    />
                    {errorMessages.password && 
                        <span className='auth-form__error'>{errorMessages.password}</span>
                    }
                </div>
                <a href='#' className='auth-form__forget'>Забыли пароль?</a>
                <footer className='auth-form__footer'>
                    <SwitchButton handler={rememberPasswordHandler} value={rememberPassword}>
                        <span className='switch__title'>Запомнить меня</span>
                    </SwitchButton>
                    <button type='submit' className='auth-form__submit button'>
                        <span>Войти</span>
                    </button>
                </footer>
            </form>
            <aside className='auth-aside'>
                <h3 className='auth-aside__heading'>Добро пожаловать!</h3>
                <AuthAsideParagraph>
                    Вы&nbsp;находитесь в&nbsp;информационной системе, 
                    принадлежащей «Сибирскому Политехническому Техникуму».
                </AuthAsideParagraph>
                <AuthAsideParagraph>
                    Являясь гостем данной системы, в&nbsp;Ваш функционал входят
                    авторизацию в&nbsp;систему и&nbsp;просмотр
                    расписания на&nbsp;неделю с&nbsp;сортировкой группы
                    или преподавателя.
                </AuthAsideParagraph>
                <AuthAsideParagraph>
                    Для получения полного функционала данного ресурса 
                    рекомендуется использовать уже созданный аккаунт 
                    в&nbsp;системе или обратитьсяза&nbsp;его созданием в&nbsp;тех. поддержку.
                </AuthAsideParagraph>
                <div className='auth-aside__links'>
                    <a className='auth-aside__link link' href='mailto:support@spt.ru'>support@spt.ru</a>
                    <a className='auth-aside__link link' href='tel:799941241-12'>+7(999)412-41-12</a>
                </div>
            </aside>
        </article>
    );
}

export default Auth;