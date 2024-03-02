import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import './Registration.scss'
import {useForm} from 'react-hook-form'
import boy from '../../assets-images/Photo background.png'
import eye from '../../assets-images/eye.svg'
import eyeoff from '../../assets-images/eye-close.svg'
import arow from '../../assets-images/arow.svg'


function Registration() {
  const [password,setPassword]=useState('password')
  const[show,setShow]=useState(eyeoff)
  const[inputValue,setInputValue]=useState('')


  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };


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

  const{
    register,
    formState:{
     errors
    },
    handleSubmit
  }=useForm()

 const onSubmit=(data)=>{
   alert(JSON.stringify(data))
 }
  return (
    
    <div className='register'>
      <Link to={'/'} className='register__link'>
      <div className="register__arow">
        <img src={arow} alt="arow" className='register__arow-img' />
        <p className='register__arow-p' >Назад</p>
      </div>
      </Link>
      <div className="register__container">
      <div className="register__img">
        <img src={boy} alt="boy" className='regisret__images' />
      </div>
      <form className='register__form' onSubmit={handleSubmit(onSubmit)}>
        <p className='register__form-p'>Создать аккаунт <br /> Lorby</p>
      <input 
      type="text"
      placeholder='Введи адрес почты'
      {...register('gmail',{
        required:true
      })}
      onChange={handleInputChange}
      className='register__form-input'
      style={{
        color: inputValue.length < 8 ? 'red' : inputValue.length > 8 ? 'green' : 'black',
      }}
      />
      <input 
      type="text"
      placeholder='Придумай логин'
      {...register('Придумай логин')}
      className='register__form-input'
      />
      <label className='register__form-password'>
      <input 
      type={password}
      placeholder='Создай пароль'
      {...register('Создай пароль')}
      className='register__form-input'
      />
      <img src={show} 
      alt="show" 
      className='register__form-img' 
      onClick={handleEyeClic} />
      </label>
      <div className="register__form-text">
      {inputValue.length < 8 && (
         <li style={{ color: inputValue.length < 8 ? 'red' : inputValue.length > 8 ? 'green' : 'black' }}  
         className="register__form-li">От 8 до 15 символов</li>
      )}
       
        <li className="register__form-li">Строчные и прописные буквы</li>
        <li className="register__form-li">Минимум 1 цифра</li>
        <li className="register__form-li">Минимум 1 спецсимвол (!, ", #, $...)</li>
      </div>
      <label className='register__form-password'>
      <input 
        type={password}
        placeholder='Повтори пароль'
       {...register('Повтори пароль')}
       className='register__form-input'
       
      />
       <img src={show} 
      alt="show"
       className='register__form-img'
       onClick={handleEyeClic}  />
      </label>
      <button className='register__btn'>Далее</button>
      </form>
      </div>
    </div>
  )
}

export default Registration