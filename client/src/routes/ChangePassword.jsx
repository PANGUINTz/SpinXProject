import axios from 'axios'
import React, { useRef, useState, useEffect } from 'react'
import toast,{ Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';

const ChangePassword = () => {

    const [userId, setUserId] = useState("");
    const [username, setUser] = useState("")

    const password = useRef(null)
    const newPassword = useRef(null)
    const cnewPassword = useRef(null)

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if(!token) {  
          toast.error("กรุณาล็อคอินก่อน")
          setTimeout(() => {
            window.location.href = "/login"
          },500)
        }

        if(token) {
            axios.post('http://localhost:8080/getUser', token, {
                headers: { Authorization: 'Bearer ' + token }
            }).then((value) => {
                try {
                    fetchUser({username: value.data.decodedToken.username})
                } catch (error) {
                    console.log(error);
                }
            }).catch(error => error)    
        }
    },[]);

    const fetchUser = async(value) => {
        await axios.post('http://localhost:8080/getUserID', value).then((data) => {
            setUser(data.data.username)
            setUserId(data.data._id)
        })
    }

    const handleClick = () =>{
        const putData = {
            username,
            password: password.current.value,
            newPassword: newPassword.current.value,
            cnewPassword: cnewPassword.current.value
        }
        axios.post(`http://localhost:8080/changePassword/${userId}`, putData).then((value) => 
            toast.success("เปลี่ยนรหัสผ่านเสร็จสิ้น").setTimeout(
                window.location.href = "/editProfile"    
            ),500).catch((error) => toast.error(error.response.data.error));
    }

    return ( 
        <div className='h-screen w-[100%]  flex flex-col justify-center items-center'>
            <Toaster position='top-center'/>
        <div className='absolute top-10 right-10 sm:top-5 sm:right-5'>
          <Link to="/editProfile">
              <button className='p-4 bg-green-500 rounded-lg text-white hover:bg-green-900 max-sm:p-2'><i className="fa-solid fa-arrow-left mr-2"></i>Back</button>
          </Link>
        </div>
        <Toaster position='top-center'/>
        <div className='w-[30%] max-md:w-[50%]'>
            <p className='font-bold text-2xl mb-5'>เปลี่ยนรหัสผ่าน</p>
            <div className="flex flex-col mt-10 mb-7">
                <label>รหัสผ่านเก่า<span className='text-red-600'> *</span></label>
                <input type='password' className='border border-black p-2' placeholder='•••••••••' ref={password}></input>
            </div>
            <div className="flex flex-col my-7">
                <label>รหัสผ่านใหม่<span className='text-red-600'> *</span></label>
                <input type='password' className='border border-black p-2' placeholder='••••••••' ref={newPassword} minLength={8} required></input>
            </div>
            <div className="flex flex-col my-7">
                <label>ยืนยันรหัสผ่านใหม่<span className='text-red-600'> *</span></label>
                <input type='password' className='border border-black p-2' placeholder='•••••••••' ref={cnewPassword} minLength={8} required></input>
            </div>
            <div>
                <button className='bg-green-500 p-5 w-[100%] hover:bg-green-900' onClick={handleClick}>ยืนยัน</button>
            </div>
        </div>
    </div>
    )     
}

export default ChangePassword