import React, { useState, useEffect } from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {reset, login} from '../features/auth/authSlice'
import {FaUser} from 'react-icons/fa'
import { Link } from "react-router-dom";


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
          <section className='heading'>
            <h1>
              <FaUser /> Login
            </h1>
            <p>Log in</p>
          </section>
    
          <section className='form'>
            <form onSubmit={onSubmit}>
              <div className='form-group'>
                <input
                  type='email'
                  className='form-control'
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
                  className='form-control'
                  id='password'
                  name='password'
                  value={password}
                  placeholder='Enter password'
                  onChange={onChange}
                />
              </div>
              <div className='form-group'>
                <button type='submit' className='btn btn-block'>
                  Submit
                </button>
              </div>
            </form>
          </section>

          <section>
            <div>
                <li>
                    <Link to={'/register'}>New User? Register for an account!</Link>
                </li>
            </div>
          </section>
        </>
      )
}

export default Login;