import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import boy from '../../assets-images/Photo background.png';
import './Login.scss'


const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Отправка данных на сервер для входа
      const response = await axios.post('https://neobis-auth-project.up.railway.app/api/users/login', {
        email,
        password,
      });

      // Если вход успешен, сохраняем токены в локальном хранилище
      const { accessToken, refreshToken } = response.data;
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);

      // Перенаправляем пользователя на нужную страницу
      navigate('/welcom');
    } catch (error) {
      console.error('Ошибка при входе:', error);
      // Обработка ошибок
    }
  };

  return (
    <div className='login'>
      <div className="login__img">
        <img src={boy} alt="boy-img" className='login__img-boy' />
      </div>
      <form className='login__form'>
        <p className='login__form-p'>Вэлком бэк!</p>
        <label className='login__form-label'>
          <input 
            type="text"
            placeholder='Введите логин (email)'
            className='login__form-input'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label className='login__form-password'>
          <input 
            type="password"
            placeholder='Введите пароль'
            className='login__form-input'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button 
          className='login__form-btn' 
          onClick={handleLogin}
        >
          Войти
        </button>
        <Link to={'/registration'} className='login__form-link'>
          <p className='login__form-text'>У меня еще нет аккаунта</p>
        </Link>
      </form>
    </div>
  );
};

export default Login;
