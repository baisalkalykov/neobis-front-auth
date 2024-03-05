import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import boy from '../../assets-images/Photo background.png'
import eye from '../../assets-images/eye.svg'
import eyeoff from '../../assets-images/eye-close.svg'
import arow from '../../assets-images/arow.svg'
import './Registration.scss'
import { Formik, ErrorMessage } from 'formik'
import * as yup from 'yup' 



function Registration() {

  const validationsSchema= yup.object().shape({
    email:yup.string().email('должно быть строкой').required('Обязательно'),
    login:yup.string().typeError('должно быть строкой').required('Обязательно'),
    password: yup.string()
    .min(8, 'Пароль должен содержать минимум 8 символов')
    .max(15, 'Пароль должен содержать максимум 15 символов')
    .matches(/[a-z]/, 'Пароль должен содержать строчные буквы')
    .matches(/[A-Z]/, 'Пароль должен содержать прописные буквы')
    .matches(/\d/, 'Пароль должен содержать минимум 1 цифру')
    .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Пароль должен содержать минимум 1 спецсимвол'),
    confirmPassword:yup.string().oneOf([yup.ref('password')],'Пароли не совпадают').required('Обязательно')
  })
  
  const [passwordState, setPasswordState] = useState({
    length: false,
    lowercase: false,
    uppercase: false,
    digit: false,
    specialChar: false,
  });
   
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
            name="password"
            className={`register__form-input ${
              touched.password && errors.password ? 'error' : '' 
            }`}
            onChange={(e) => {
              handleChange(e);
              const password = e.target.value;
              setPasswordState({
                length: password.length >= 8 && password.length <= 15,
                lowercase: /[a-z]/.test(password),
                uppercase: /[A-Z]/.test(password),
                digit: /\d/.test(password),
                specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
              });
            }}
            onBlur={handelBlur}
            value={values.password}
          />
          <ErrorMessage name="password" component="div" />

        
          <div>
           {!values.password ?<li className='register__form-li'>От 8 до 15 символов</li>  
           : passwordState.length ? '✅ Длина от 8 до 15 символов' : '❌ Длина от 8 до 15 символов'}
         </div>

         <div>
           {!values.password ? <li className='register__form-li'>Строчные и прописные буквы</li> 
          : passwordState.lowercase ? '✅ Содержит строчные буквы' : '❌ Содержит строчные буквы'}
         </div>

         <div>
          {!values.password ? <li className='register__form-li'>Минимум 1 цифр</li> 
          : passwordState.uppercase ? '✅ Содержит прописные буквы' : '❌ Содержит прописные буквы'}
        </div>
    
        <div>
        {!values.password ?  <li className='register__form-li'>Минимум 1 спецсимвол (!, ", #, $...)</li> 
        : passwordState.digit ? '✅ Содержит минимум 1 цифру' : '❌ Содержит минимум 1 цифру'}
        </div>
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
             
          {touched.confirmPassword && errors.confirmPassword && <p className='register__from-eror'>{errors.confirmPassword}</p>}

            </label>
           
            <button
              onClick={handleSubmit}
              type={`submit`}
              className='register__btn'
              disabled={!isValid && !dirty}
              style={{
                background: (!isValid || !dirty || Object.keys(touched).length !== Object.keys(validationsSchema.fields).length) ? '#D7D7D7' : 'black',
                color: (!isValid || !dirty || Object.keys(touched).length !== Object.keys(validationsSchema.fields).length) ? '#767676' : 'white',
              }}
            >
              <Link to={'/letter'} className='register__link'>
            Далее
            </Link>
            </button>
           
          </div>
        )}
    </Formik>
      </div>
    </div>
  )
}

export default Registration