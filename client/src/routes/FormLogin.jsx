import { useFormik } from 'formik';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import toast, {Toaster} from 'react-hot-toast'

const FormLogin = () => {
  const [showPass, setShowPass] = useState(false)

  const toggleShowPassword = () => {
    setShowPass(!showPass)
  }

  const forgotPassword=() => {
    window.location.href = "/forgetPassword"
  }

  const response = async (values) => {
    try {
      const result = await axios.post('http://localhost:8080/login', values)
      return result.data.msg;
    } 
    catch (error) {
      return error.response.data
    }
  }


  const formik = useFormik({
    initialValues : {
      username: '',
      password: '',
    },
    validate: async values => {
      const errors= {}

      let checkData = await response(values)


      if(checkData && checkData.error === "Don't have User") {
        errors.username = "Don't have User"
      }

      if(checkData && checkData.error === "Wrong Password") {
        errors.password = "Wrong Password"
      }

      //check username 
      if(!values.username) {
        errors.username = "Username Required"
      }
      else if(values.username.includes(" ")) {
        errors.username = "Username Invalid"
      }
      //check password 
      if(!values.password) {
        errors.password = "Password Required"
      }
      else if(values.password.includes(" ")) {
        errors.password = "Wrong Password"
      }
      else if(values.password.length < 8) {
        errors.password = 'Password must be more than 8 characters long'
    }
    return errors;
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async(values) => {
      const result = await axios.post('http://localhost:8080/login', values)
      if(result.data.msg === "Login Successfully") {
        if(result.data.role === "admin") {
          localStorage.setItem('token', result.data.token)

          toast.success('เข้าสู่ระบบสำเร็จ')
          setTimeout(() => {
            window.location.href= "/admin"
          },500)
        } else {
          localStorage.setItem('token', result.data.token)

          toast.success('เข้าสู่ระบบสำเร็จ')
          setTimeout(() => {
            window.location.href= "/"
          },500)
        }
      }
    }
  })

  return (
     <div className='w-full'>

      <Toaster position="top-center" reverseOrder={false}/>
        <div className='flex'>
          {/* Left Side */}

          <div className='w-[55%] max-md:hidden'>
            <img className='h-[100vh] w-full object-cover' src="https://images.unsplash.com/photo-1527285286036-1ae743926077?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMGdsYXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="glass" />
          </div>

          {/* Right Side */}
          <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className='absolute top-10 right-10 sm:top-5 sm:right-5'>
              <Link to="/">
                  <button className='p-4 bg-green-500 rounded-lg text-white hover:bg-green-900 max-sm:p-2'><i className="fa-solid fa-arrow-left mr-2"></i>Home</button>
              </Link>
            </div>
            <div className='w-[40%] max-xl:w-[60%] max-sm:[60%]'>
              <div>
                  <h5>Welcome back</h5>
                  <h1 className='text-3xl font-bold sm:text-2xl'>Login to your account</h1>

                  <form onSubmit={formik.handleSubmit}>

                    <div className='my-5'>
                        <label className='block'>Username</label>
                        <input {...formik.getFieldProps('username')} className='border border-black py-2 px-4 w-full' placeholder='username'/>
                        <span className='text-red-500'>{formik.errors.username}</span>
                    </div>
                    <div className='my-5 relative'>
                        <label className='block'>Password</label>
                        <input {...formik.getFieldProps('password')} className='border border-black py-2 px-4 w-full' type={showPass?"text":"password"} name="password" id="password" placeholder='password'/>
                        <i className={!showPass?"fa-solid fa-eye absolute right-3 top-9 cursor-pointer opacity-60":"fa-sharp fa-solid fa-eye-slash absolute right-3 top-9 cursor-pointer opacity-60"}  onClick={toggleShowPassword}></i>
                        <span className='text-red-500'>{formik.errors.password}</span>
                    </div>

                    <div className='flex justify-between max-sm:flex-col'>
                        <div>
                            <input type="checkbox" name="remember" id="remember" />
                            <label htmlFor="remember" className='ml-2'>Remember me</label>
                        </div>
                        <div>
                            <button className='hover:text-green-700 max-sm:my-2' type='button' onClick={forgotPassword}>Forgot password?</button>
                        </div>
                    </div>
                    <button className='w-full mt-4 h-10 text-white rounded-lg' type='submit' style={{backgroundColor: "green"}}>login</button>
                  </form>
                </div>
              <div className='mt-5'>
                <p>Don't have an account ?<span><a href='/register' className='hover:text-green-700'> Register</a></span></p>
              </div>
            </div>
          </div>
        </div>
     </div>
  )
}

export default FormLogin