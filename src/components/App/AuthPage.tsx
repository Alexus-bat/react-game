import React, { useState } from 'react';
import { useHttp } from '../../hooks/http.hook';
import './AuthPage.scss';

type Form = {
    email: string,
    password: string
}

export const AuthPage: React.FC = () => {
    const {loading, request} = useHttp();
    const [form, setForm] = useState<Form>({
        email: '', password: ''
    });

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setForm({...form, [event.target.name]: event.target.value})
    }

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', {...form})
            console.log('Data', data)
        } catch(e) {}
    }

    return (
        <div>
            <div className="wrapper">
                <h1>Сапёр</h1>
                <div className="card">
                    <div className="card-content">
                        <span className="card-content__title">Авторизация</span>
                        <div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    autoComplete="off"
                                    onChange={changeHandler}
                                />
                            </div>
                            <div className="input-field">
                                <input 
                                    placeholder="Введите пароль"
                                    id="password"
                                    type="password"
                                    name="password"
                                    onChange={changeHandler}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button 
                            className="btn"
                            disabled={loading}>
                                Войти
                        </button>
                        <button 
                            className="btn" 
                            onClick={registerHandler}
                            disabled={loading}>
                                Регистрация
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
