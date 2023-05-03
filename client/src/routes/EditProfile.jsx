import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import  toast,{ Toaster } from 'react-hot-toast'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'


const EditProfile = () => {

    const [sideBarActive, setSideBarActive] = useState(false)

    const [isActive, setIsActive] = useState(false);

    const [userData, setUserData] = useState([])

    const [userId, setUserId] = useState([])



    function isEmptyObject(obj){
      return JSON.stringify(obj) === '{}'
  }

    const username = useRef(null)
    const email = useRef(null)
    const firstName = useRef(null)
    const lastName = useRef(null)
    const tel = useRef(null)


    const handleClick = async() => {   
      const putData = {
      email: (userData.email === email.current.value?undefined:email.current.value),
      firstName: (userData.firstName === firstName.current.value?undefined:firstName.current.value),
      lastName: (userData.lastName === lastName.current.value?undefined:lastName.current.value),
      tel: (userData.tel === tel.current.value?undefined:tel.current.value),
    }

    if(isEmptyObject(putData)) {
      toast.error("กรุณาเปลี่ยนข้อมูลก่อนกดบันทึก")
    } else { 
      await axios.put(`http://localhost:8080/updateUser/${userId}`, putData).then((data) => {
        toast.success("อัพเดตเสร็จสิ้น")
        setTimeout(() => {
          window.location.reload()
        },500)
      }).catch(error => console.log(error));
    }
  }

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
                setIsActive(true)
                try {
                    fetchUser({"username":value.data.decodedToken.username})
                } catch (error) {
                    console.log(error);
                }

            }).catch(error => error)    
        }
        return setSideBarActive(true);
    },[]);

    const fetchUser = async(value) => {
        await axios.post('http://localhost:8080/getUserID', value).then((data) => {
            setUserData(data.data)
            setUserId(data.data._id)
        })
    }

    const linkChangePass = () => {
      window.location.href="/changePassword"
    }

  return (
    <div>
        <Navbar isActive={isActive} dest="Profile"/>
        <Toaster position='top-center' reverseOrder="false"/>
        <div className='flex'>
                <Sidebar sideBarActive={sideBarActive} title="editProfile"/>
                <div className='flex flex-col w-[100%] items-center my-5 max-md:items-end max-md:w-[60%]'>
                    <img src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt='avatar' className='border-4 rounded-[100%] border-black  w-36 h-30'/>

                    <div>
                        <div className='grid grid-cols-2 my-10 items-center'>
                            <label htmlFor="username" className='text-lg uppercase p-2 text-end mr-5 max-md:text-base'>username</label>
                            <input type="text" defaultValue={userData.username} className='p-2 border border-black uppercase w-60 max-md:w-52' ref={username} readOnly/>
                        </div>

                        <div className='grid grid-cols-2 my-10'>
                            <label htmlFor="email" className='text-lg uppercase p-2 text-end mr-5 max-md:text-base'>email</label>
                            <input type="text" defaultValue={userData.email} className='p-2 border border-black uppercase w-60 max-md:w-52' ref={email}/>
                        </div>

                        <div className='grid grid-cols-2 my-10'>
                            <label htmlFor="firstName" className='text-lg uppercase p-2 text-end mr-5 max-md:text-base'>firstname</label>
                            <input type="text" defaultValue={userData.firstName} className='p-2 border border-black uppercase w-60 max-md:w-52' ref={firstName}/>
                        </div>

                        <div className='grid grid-cols-2 my-10'>
                            <label htmlFor="lastName" className='text-lg uppercase p-2 text-end mr-5 max-md:text-base'>lastname</label>
                            <input type="text" defaultValue={userData.lastName} className='p-2 border border-black uppercase w-60 max-md:w-52' ref={lastName}/>
                        </div>

                        <div className='grid grid-cols-2 my-10'>
                            <label htmlFor="tel" className='text-lg uppercase p-2 text-end mr-5 max-md:text-base'>tel</label>
                            <input type="text" defaultValue={userData.tel} className='p-2 border border-black uppercase w-60 max-md:w-52' ref={tel}/>
                        </div>
                        <div className='flex justify-end my-10 '>
                          <button className='p-4 w-[50%] max-md:w-[60%] h-[10%] bg-green-500 rounded-xl hover:bg-green-900 max-md:text-sm' type='button' onClick={linkChangePass}>เปลี่ยนรหัสผ่าน</button>
                        </div>
                       
                        <div className=' flex justify-center max-md:justify-end'>
                          <button className='p-4 w-[30%] max-md:w-[60%] h-[10%] bg-green-500 rounded-xl hover:bg-green-900' onClick={handleClick}>บันทึก</button>
                        </div>

                    </div>
                </div>
        </div>
    </div>

  )
}

export default EditProfile