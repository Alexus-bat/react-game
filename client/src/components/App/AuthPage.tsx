import React, { useContext, useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import AuthContext from '../context/AuthContext';
import './AuthPage.scss';

const AuthPage: React.FC = () => {
    const auth = useContext(AuthContext);
    const {loading, error, request} = useHttp();

    const [form, setForm] = useState({
        login: '',
        password: ''
    });

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
        } catch (e) {
            
        }
    };

    const loginHandler = async () => {
        try {
          const data = await request('/api/auth/login', 'POST', { ...form });
          auth.login(data.token, data.userId);
          // eslint-disable-next-line no-empty
        } catch (e) {
        }
      };

    return (
        <div className="wrapper">
            <h1>Minesweeper registr</h1>
            <div className="card">
                <div className="card-content">
                    <span className="card-content__title">
                        Авторизация
                    </span>
                    <div>
                        <div className="input-field">
                            <input 
                            type="text"
                            placeholder="Введите логин"
                            id="login"
                            onChange={changeHandler} />
                        </div>
                        <div className="input-field">
                            <input 
                            type="password"
                            placeholder="Введите пароль"
                            id="password"
                            onChange={changeHandler} />
                        </div>
                    </div>
                </div>
                <div className="card-action">
                    <button 
                    className="btn"
                    onClick={loginHandler}
                    disabled={loading}>Вход</button>
                    <button 
                    className="btn"
                    onClick={registerHandler}
                    disabled={loading}>Регистрация</button>
                </div>
            </div>
        </div>
    )
}

export default AuthPage;
