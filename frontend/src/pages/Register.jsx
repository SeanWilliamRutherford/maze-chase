import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {register, reset} from '../features/auth/authSlice'
import {FaUser} from 'react-icons/fa'

import styles from '../stylesheets/Login.module.css'



function Register() {

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    })

    const {name, email, password, password2} = formData

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const {user, isLoading, isError,isSuccess, message } = useSelector((state) => state.auth)
    

    useEffect(() => {
        if(isError){
            toast.error(message)
        }

        if(isSuccess || user) {
            navigate('/main')
        }

        dispatch(reset())

    }, [user, isError, isSuccess, message, navigate, dispatch])

    const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
        e.preventDefault()

        if(password != password2){
            toast.error('Passwords do not match')
        } 
        else {
            const userData = {
                name,
                email,
                password
            }
            dispatch(register(userData))
        }
      }  

        return (
            <>
              <div className={styles.page}>
                <h1>Maze Chase</h1>
                
                <div className={styles.loginform}>
                  <section className={styles.title}>
                    <h1>
                      <FaUser /> Register
                    </h1>
                  </section>
            
                 
                    <form onSubmit={onSubmit}>
                      <div className='form-group'>
                        <input
                          type='text'
                          className={styles.input}
                          id='name'
                          name='name'
                          value={name}
                          placeholder='Enter your name'
                          onChange={onChange}
                        />
                      </div>
                      <div className='form-group'>
                        <input
                          type='email'
                          className={styles.input}
                          id='email'
                          name='email'
                          value={email}
                          placeholder='Enter your email'
                          onChange={onChange}
                        />
                      </div>
                      <div className='form-group'>
                        <input
                          type='password'
                          className={styles.input}
                          id='password'
                          name='password'
                          value={password}
                          placeholder='Enter password'
                          onChange={onChange}
                        />
                      </div>
                      <div className='form-group'>
                        <input
                          type='password'
                          className={styles.input}
                          id='password2'
                          name='password2'
                          value={password2}
                          placeholder='Confirm password'
                          onChange={onChange}
                        />
                      </div>
                      <div className={styles.buttonplace}>
                        <button type='submit' className={styles.button}>
                          Submit
                        </button>
                      </div>
                    </form>
                  
                </div>
              </div>
            </>
          )
}

export default Register;