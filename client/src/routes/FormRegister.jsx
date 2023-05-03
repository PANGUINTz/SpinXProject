import React, { useState } from 'react'
import { Link }from 'react-router-dom'
import {useFormik} from 'formik'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'


const FormRegister = () => {
    const [showPass, setShowPass] = useState(false)
    const [showRepass, setShowRepass] = useState(false)

    const togglePass = () => {
        setShowPass(!showPass)
    }
    const toggleRepass = () => {
        setShowRepass(!showRepass)
    }

    const response = async(values) => {
        try {
            const result = await axios.post('http://localhost:8080/register', values)
            return result.data.msg
        }
        catch(error) {
            return error.response.data;
        }
    }
    const formik = useFormik({
        initialValues : {
            username: '',
            email: '', 
            tel: '',
            password: '',
            rePassword: '',
            firstName: '',
            lastName: ''
          },
        validate: async values =>   {
            const errors = {}

            let checkExist = await response(values)
            
            if(checkExist && checkExist.error === "Email and user already exist") {
                errors.username = "User already exist"
                errors.email = "Email already exist"
            }
            if(checkExist &&checkExist.error === "User already exist") {
                errors.username = "User already exist"
            }
            
            if(checkExist &&checkExist.error === "Email already exist") {
                errors.email = "Email already exist"
            }

            //Username
            if(values.username ==='') {
                errors.username = 'username is required'        
            }
            else if(values.username.includes(" ")) {
                errors.username = 'Invalid Username'
            }

            //Email
            if(values.email === '') {
                errors.email = "Email Required"
            }
            else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = "Invalid email address"
            }
            
            //Password
            if(!values.password){
                errors.password = "Password Required"
            }
            else if(values.password.length < 8) {
                errors.password = 'Password must be more than 8 characters long'
            }

            //RePassword
            if(!values.rePassword) {
                errors.rePassword = "Re Password Required"
            }
            else if(values.password !== values.rePassword) {
                errors.rePassword = 'Re-Password is not match'
                errors.password = 'Password is not match'
            }
        
            //Tel
            if(!values.tel) {
                errors.tel = "Tel Number Required"
            }
            else if(!/[0]{1}[0-9]{9}/.test(values.tel)) {
                errors.tel = "Tel Number invalid"
            }
            else if(values.tel.length < 10 && values.tel.length >10) {
                errors.tel = "Tel Number invalid"
            }
            return errors
        },
        
          validateOnBlur: false,
          validateOnChange: false,
          onSubmit : async values => {
            
            values = await Object.assign(values);
            if(values) {
                toast.success('สมัครสำเร็จ')
                setTimeout(() => {
                    window.location.href = "/login"
                },500)
            }
        }
    })

  return (
    <div className='w-full'>
        <Toaster position="top-center" reverseOrder={false}/>

        <div className='flex'>
            {/* Left Side */}
            <div className='w-[55%] max-lg:hidden'>
                <img className='h-[100vh] w-full object-cover' src="https://images.unsplash.com/photo-1527285286036-1ae743926077?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Z2lybCUyMGdsYXNzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" alt="glass" />
            </div>

            {/* Right Side */}
            <div className='w-full h-[100vh] flex justify-center lg:items-center overflow-scroll'>
                <div className='absolute top-10 right-10 max-sm:top-4 max-sm:right-4 max-lg:top-2 max-lg:right-4'>
                    <Link to="/">
                        <button className='p-4 bg-green-500 rounded-lg text-white hover:bg-green-900 max-sm:p-2'><i className="fa-solid fa-arrow-left mr-2"></i>Home</button>
                    </Link>
                </div>
                <div className='w-[40%] max-xl:w-[60%] max-sm:[60%]'>
                    <div>

                        <div className='text-center'>
                            <h1 className='text-3xl font-bold py-5 max-sm:text-[1.25rem] min-[210px]:mt-0 max-[960px]:mt-60'>Welcome to SPIN X</h1>
                            <p>Sign up with us</p>
                            <p>to receive exclusive discount and special on a products and services.</p>
                        </div>

                        <form onSubmit={formik.handleSubmit}>

                        <div className='my-5'>
                            <label className='block'>Username</label>
                            <input {...formik.getFieldProps('username')} className='border border-black py-2 px-4 w-full'  type="text" placeholder='Username'/>
                            <span className='text-red-600'>{formik.errors.username}</span>
                        </div>

                        <div className='flex my-5'>

                            <div className='mr-5 w-full'>
                                <label className='block'>First Name</label>
                                <input {...formik.getFieldProps('firstName')} className='border border-black py-2 px-4 w-full' type="text"  placeholder='First Name'/>
                                <span className='text-red-600'>{formik.errors.firstName}</span>
                            </div>
                            <div className='w-full'>
                                <label className='block'>Surname</label>
                                <input  {...formik.getFieldProps('lastName')} className='border border-black py-2 px-4 w-full' type="text"  placeholder='Surname'/> 
                                <span className='text-red-600'>{formik.errors.lastName}</span>  
                            </div>

                        </div>

                        <div className='my-5'>
                            <label className='block'>Email</label>
                            <input {...formik.getFieldProps('email')} className='border border-black py-2 px-4 w-full' type="email" placeholder='example@example.com'/> 
                            <span className='text-red-600'>{formik.errors.email}</span>
                        </div>

                        <div className='my-5'>
                            <label className='block'>Tel.</label>
                            <input {...formik.getFieldProps('tel')} className='border border-black py-2 px-4 w-full' type="tel" placeholder='xxx-xxx-xxxx'/>
                            <span className='text-red-600'>{formik.errors.tel}</span>
                        </div>

                        <div className='my-5 relative'>
                            <label className='block'>Password</label>
                            <input {...formik.getFieldProps('password')} className='border border-black py-2 px-4 w-full ' type={showPass?"text":"password"} placeholder='password'/>
                            <i className={!showPass?"fa-solid fa-eye absolute right-3 top-9 cursor-pointer opacity-60":"fa-sharp fa-solid fa-eye-slash absolute right-3 top-9 cursor-pointer opacity-60"}  onClick={togglePass}></i>
                            <span className='text-red-600'>{formik.errors.password}</span>
                        </div>

                        <div className='my-5 relative'>
                            <label className='block'>Re-password</label>
                            <input {...formik.getFieldProps('rePassword')} className='border border-black py-2 px-4 w-full' type={showRepass?"text":"password"} placeholder='re-password'/>
                            <i className={!showRepass?"fa-solid fa-eye absolute right-3 top-9 cursor-pointer opacity-60":"fa-sharp fa-solid fa-eye-slash absolute right-3 top-9 cursor-pointer opacity-60"}  onClick={toggleRepass}></i>
                            <span className='text-red-600'>{formik.errors.rePassword}</span>
                        </div>
                        <div className='flex justify-between max-sm:flex-col'>
                            <div>
                                <input type="checkbox" name="remember" id="remember" required/>
                                <label htmlFor="remember" className='ml-2'>Our terms and <span><a href='/condition' className='hover:text-green-500'>conditions</a></span> of use.</label>
                            </div>
                        </div>
                        <button className="w-full mt-4 h-10 rounded-lg text-white" type="submit" style={{backgroundColor:"green"}}>Register</button>
                        </form> 
                    </div>
                    <div className='mt-5'>
                        <p>Have already account?<span><a href='/login' className='hover:text-green-500'> sign up</a></span></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default FormRegister