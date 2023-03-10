import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {reset, login} from '../features/auth/authSlice'
import {FaUser} from 'react-icons/fa'
import { Link } from "react-router-dom";
import styles from '../stylesheets/Login.module.css'


function Login() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const {email, password} = formData

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

        /*if(password != password2){
            toast.error('Passwords do not match')
        } */
        /*else {*/
            const loginData = {
                email,
                password
            }
            dispatch(login(loginData))
        //}
      } 


   
    return (
        <>
        <div className={styles.page}>
          <h1>Maze Chase</h1>
    
          <div className={styles.loginform}>
            <div className={styles.title}>
              <h1>
                <FaUser /> Login
              </h1>
            </div>
            <form onSubmit={onSubmit}>
              <div className={styles.input}>
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
              <div className={styles.input}>
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
              <div className={styles.buttonplace}>
                <button type='submit' className={styles.button}>
                  Submit
                </button>
              </div>
            </form>
            
            <Link to={'/register'} className={styles.link}>New User? Register for an account!</Link>
            
          </div>
        </div>
        </>
      )
}

export default Login;