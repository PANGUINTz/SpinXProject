import axios from 'axios'
import React, { useRef, useState } from 'react'
import toast,{ Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Forgot = () => {
    const [userId, setUserId] = useState("");
    const [emailUser, setEmail] = useState("")

    const fetchUser = async(value) => {
       await axios.post("http://localhost:8080/getUserEmail", value).then((data) => {
            setUserId(data.data._id)
       }).catch(error => error)
    }
    fetchUser({email:emailUser})

    const email = useRef(null)
    const password = useRef(null)
    const rePassword = useRef(null)

    const handleSubmit = async() => {
        const putData = {
            email: email.current.value,
            password: password.current.value,
            rePassword: rePassword.current.value
        }
        await axios.put(`http://localhost:8080/forgetPassword/${userId}`, putData).then((data) => {
            toast.success("เปลี่ยนรหัสสำเร็จ")
            setTimeout(() => {
                window.location.href = "/login"
            },900)
            
        }).catch(error => {
            toast.error(error.response.data.error)
        })
    }
    

    return (
        <div className='h-screen w-[100%]  flex flex-col justify-center items-center'>
            <div className='absolute top-10 right-10 sm:top-5 sm:right-5'>
              <Link to="/login">
                  <button className='p-4 bg-green-500 rounded-lg text-white hover:bg-green-900 max-sm:p-2'><i className="fa-solid fa-arrow-left mr-2"></i>Back</button>
              </Link>
            </div>
            <Toaster position='top-center'/>
            <div className='w-[30%] max-md:w-[50%]'>
                <p className='font-bold text-2xl mb-5'>ลืมรหัสผ่าน</p>
                <div className="flex flex-col mt-10 mb-7">
                    <label>E-mail<span className='text-red-600'> *</span></label>
                    <input type='text' className='border border-black p-2' onChange={(e) => setEmail(e.target.value)} placeholder='example@example.com' ref={email}></input>
                </div>
                <div className="flex flex-col my-7">
                    <label>รหัสผ่านใหม่<span className='text-red-600'> *</span></label>
                    <input type='password' className='border border-black p-2' placeholder='•••••••••' ref={password} minLength={8} required></input>
                </div>
                <div className="flex flex-col my-7">
                    <label>ยืนยันรหัสผ่านใหม่<span className='text-red-600'> *</span></label>
                    <input type='password' className='border border-black p-2' placeholder='•••••••••' ref={rePassword} minLength={8} required></input>
                </div>
                <div>
                    <button className='bg-green-500 p-5 w-[100%] hover:bg-green-900' onClick={handleSubmit}>ยืนยัน</button>
                </div>
            </div>
        </div>

    )
}

export default Forgot