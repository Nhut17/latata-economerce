import React from 'react'
import logo from '../assets/images/logo.png'
import '../sass/Register/register.scss'
import { Link } from 'react-router-dom'
import RegisterForm from '../components/Register/RegisterForm'

import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Register = () => {

  const success = useSelector(state => state.user.successRegister)
  const navigate = useNavigate()

  

  

  return (
    <div className='register'>

        {
          success && <ToastContainer />
        }

        <div className="header-signUp">
           <div className="container">
           <div className="logo">
            <Link to='/'>
                <img src={logo} alt="" />
            </Link>
            </div>
            <span>ĐĂNG KÝ</span>
           </div>
        </div>

       <RegisterForm />

    </div>
  )
}

export default Register
