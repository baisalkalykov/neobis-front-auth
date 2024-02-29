import React from 'react'
import { useState } from 'react'
import './Login.scss'
import boy from '../../assets-images/Photo background.png'
import eye from '../../assets-images/eye.svg'
import eyeoff from '../../assets-images/eye-close.svg'


function Login() {
 const [password,setPassword]=useState('password')
 const[show,setShow]=useState(eyeoff)
  const handleEyeClic=()=>{
    if(password==='password'){
      setShow(eye)
      setPassword('text')
    }
    else{
      setShow(eyeoff)
      setPassword('password')
    }
  }

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
          placeholder='Введи туда-сюда логин'
          className='login__form-input'
        />
      </label>

      <label className='login__form-password'>
        <input 
          type={password}
          placeholder='Пароль (тоже введи)'
          className='login__form-input'
        />
        <img src={show} 
        alt="eye" 
        className='login__form-eye'
        onClick={handleEyeClic} />
      </label>
      <button className='login__form-btn'>Войти</button>

     </form>
    </div>
  )
}

export default Login