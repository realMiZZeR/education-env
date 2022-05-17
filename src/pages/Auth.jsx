import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useModal } from '../hooks/useModal';

import updateTitle from '../assets/js/updateTitle';
import SwitchButton from '../components/SwitchButton';

const AuthAsideParagraph = (props) => {
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
    const { signIn } = useAuth();
    const { setModal, setModalIsLoading } = useModal();

    const formFields = {
        login: '',
        password: '',
        rememberPassword: false
    }

    const [ formValues, setFormValues ] = useState(formFields);
    const [ errorMessages, setErrorMessages ] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();

        let isValid = true;
        let errors = {}
        setErrorMessages({});

        if(!formValues.login) {
            isValid = false;
            errors['login'] = 'Введите логин';
        }
        if(!formValues.password) {
            isValid = false;
            errors['password'] = 'Введите пароль';
        }

        if(!isValid) {
            setErrorMessages(errors);
            return;
        }

        new Promise((resolve, reject) => {
            signIn(
                {   
                    user: formValues, 
                    callback: () => navigate('/home', {replace: true}),
                    promise: {resolve: resolve, reject: reject}
                }
            );
        }).then(status => {
            setModal({status: status, type: 'AUTH'});
        });
    }

    const formChangeHandler = (e) => {
        const { name, value } = e.target;

        setFormValues({
            ...formValues,
            [name]: value
        });
    }

    const rememberPasswordHandler = () => {
        setFormValues({
            ...formValues,
            'rememberPassword': !formValues.rememberPassword
        });
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
                    onChange={formChangeHandler}
                    className={`auth-form__input input ${(errorMessages.login ? 'input_error' : '')}`} 
                    placeholder='Логин'
                    />
                </div>
                <div className='auth-form__field'>
                    <input 
                    type='password' 
                    name='password' 
                    onChange={formChangeHandler} 
                    className={`auth-form__input input ${(errorMessages.password ? 'input_error' : '')}`} 
                    placeholder='Пароль'
                    />
                </div>
                <a href='/' className='auth-form__forget'>Забыли пароль?</a>
                <footer className='auth-form__footer'>
                    <SwitchButton handler={rememberPasswordHandler} value={formValues.rememberPassword}>
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
                    в&nbsp;системе или обратиться за&nbsp;его созданием в&nbsp;тех. поддержку.
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