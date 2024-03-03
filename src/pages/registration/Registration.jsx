import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import boy from '../../assets-images/Photo background.png'
import eye from '../../assets-images/eye.svg'
import eyeoff from '../../assets-images/eye-close.svg'
import arow from '../../assets-images/arow.svg'
import './Registration.scss'
import { Formik } from 'formik'
import * as yup from 'yup' 



function Registration() {

  const validationsSchema= yup.object().shape({
    email:yup.string().email('должно быть строкой').required('Обязательно'),
    login:yup.string().typeError('должно быть строкой').required('Обязательно'),
    password:yup.string().typeError('должно быть строкой').required('Обязательно'),
    confirmPassword:yup.string().oneOf([yup.ref('password')],'Пароли не совпадают').required('Обязательно')
  })
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
    
    <div className='register'>
      <Link to={'/'} className='register__link'>
      <div className="register__arow">
        <img src={arow} alt="arow" className='register__arow-img' />
        <p className='register__arow-p' >Назад</p>
      </div>
      </Link>
      <div className="register__container">
        <div className="register__img">
          <img src={boy} alt="" />
        </div>
      <Formik
        initialValues={{
        email: '',
        login: '',
        password: '',
        confirmPassword: ''
      }}
        validateOnBlur
        onSubmit={(values) => {
        console.log(values);
        }}
        validationSchema={validationsSchema}
      >
      {({ values, errors, touched, handleChange, handelBlur, isValid, handleSubmit, dirty }) => (
         <div className="register__form">
           <p className='register__form-p'>Создать аккаунт <br /> Lorby</p>
           <label  htmlFor={`email`} className='register__form-lable'>
           <input
              type="email"
              placeholder='Введи адрес почты'
              name={`email`}
              className='register__form-input'
              onChange={handleChange}
              onBlur={handelBlur}
              value={values.email}
            />
            
          {touched.email && errors.email && <p className='register__from-eror'>{errors.email}</p>}
           </label>

           <label htmlFor={`login`} className='register__form-lable'>
           <input
              type="text"
              placeholder='Придумай логин'
              name={`login`}
              className='register__form-input'
              onChange={handleChange}
              onBlur={handelBlur}
              value={values.login}
            />
            
          {touched.login && errors.login && <p className='register__from-eror'>{errors.login}</p>}
           </label>

            <label htmlFor={`password`} className='register__form-pass-lable'>
            <input
              type="password"
              placeholder='Создай пароль'
              name={`password`}
              className='register__form-input'
              onChange={handleChange}
              onBlur={handelBlur}
              value={values.password}
            />
              <img src={show} 
                alt="show" 
                className='register__form-img' 
                onClick={handleEyeClic} />
          {touched.password && errors.password && <p className='register__from-eror'>{errors.password}</p>}

            </label>

            <label htmlFor={`confirmPassword`} className='register__form-pass-lable'>
            <input
              type="password"
              placeholder='Повтори пароль'
              name={`confirmPassword`}
              className='register__form-input'
              onChange={handleChange}
              onBlur={handelBlur}
              value={values.confirmPassword}
            />
             <img src={show} 
                alt="show" 
                className='register__form-img' 
                onClick={handleEyeClic} />
          {touched.confirmPassword && errors.confirmPassword && <p className='register__from-eror'>{errors.confirmPassword}</p>}

            </label>

            <button
              disabled={!isValid && !dirty}
              onClick={handleSubmit}
              type={`submit`}
              className='register__btn'
            >
            Далее
            </button>
          </div>
        )}
    </Formik>
      </div>
    </div>
  )
}

export default Registration