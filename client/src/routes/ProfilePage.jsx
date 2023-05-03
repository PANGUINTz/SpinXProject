import React, { useEffect, useState } from 'react'
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import axios from 'axios';
import  toast,{ Toaster } from 'react-hot-toast';



const ProfilePage = () => {
    const [isActive, setIsActive] = useState(false) 
    const [sideBarActive, setSideBarActive] = useState(false) 
    const [userData, setUserData] = useState([])


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
        })
    }

    
    return (
        <div>
            <Toaster position='top-center' reverseOrder="false"/>
            <Navbar isActive={isActive} dest="Profile"/>
            <div className='flex'>
                <Sidebar sideBarActive={sideBarActive} title="myProfile"/>
                <div className='flex flex-col w-[100%] items-center my-5 max-md:w-[60%] max-md:items-end'>
                    <img src='https://img.freepik.com/free-icon/user_318-159711.jpg' alt='avatar' className='border-4 rounded-[100%] border-black w-36 h-30'/>

                    <div>
                        <div className='grid grid-cols-2 my-10 items-center'>
                            <label htmlFor="username" className='text-lg uppercase p-2 text-end mr-5 max-md:text-base max-md:text-start'>username</label>
                            <input type="text" defaultValue={userData.username} readOnly className='p-2 border border-black uppercase w-60 max-md:w-52'/>
                        </div>

                        <div className='grid grid-cols-2 my-10'>
                            <label htmlFor="username" className='text-lg uppercase p-2 text-end mr-5  max-md:text-base'>email</label>
                            <input type="text" defaultValue={userData.email} readOnly className='p-2 border border-black uppercase w-60 max-md:w-52'/>
                        </div>

                        <div className='grid grid-cols-2 my-10'>
                            <label htmlFor="username" className='text-lg uppercase p-2 text-end mr-5 max-md:text-base'>firstname</label>
                            <input type="text" defaultValue={userData.firstName} readOnly className='p-2 border border-black uppercase w-60 max-md:w-52'/>
                        </div>

                        <div className='grid grid-cols-2 my-10'>
                            <label htmlFor="username" className='text-lg uppercase p-2 text-end mr-5 max-md:text-base'>Surname</label>
                            <input type="text" defaultValue={userData.lastName} readOnly className='p-2 border border-black uppercase w-60 max-md:w-52'/>
                        </div>

                        <div className='grid grid-cols-2 my-10'>
                            <label htmlFor="username" className='text-lg uppercase p-2 text-end mr-5 max-md:text-base'>tel</label>
                            <input type="text" defaultValue={userData.tel} readOnly className='p-2 border border-black uppercase w-60 max-md:w-52'/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfilePage