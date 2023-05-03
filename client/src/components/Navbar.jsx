import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ListMenu, MobileListMenu } from './ListMenu'
import axios from 'axios'

const Navbar = (props) => {

    const {isActive, dest} = props;

    const [Clicked, setClicked] = useState(false)

    const [admin, setAdmin] = useState(false)

    const [username, setUsername] = useState("")

    const [tokenVerify, setTokenVeify] = useState(false);

    const handleClick = () => {
        setClicked(!Clicked)
    }

    const logOut = () => {
        localStorage.clear();
    }

    useEffect(() => {
    const token = localStorage.getItem('token')   

    if(token) {
    axios.post('http://localhost:8080/getUser', token, {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
    .then(data => {
        if(data.data.msg === "authentificate") {
            setTokenVeify(true)
            setUsername(data.data.decodedToken.username)
        } else {
            setTokenVeify(false)
        }

        if(data.data.decodedToken.role === "admin") {
            setAdmin(true)
        } else {
            setAdmin(false)
        }
    })
    .catch(error=>error)}
    },[])
  return (
    <div className='w-full bg-[#fff] flex justify-between p-4 shadow-xl relative'>
        <div className='flex'>
            <a href='/'><h4 className='text-3xl'>SPIN X</h4></a>
            <ul className='flex items-center ml-10 max-xl:hidden'>
                {ListMenu.map((item, index)=> {
                    return(
                        <li key={index}>
                            <Link to={item.link} className={`${item.class} ${isActive===true && item.title === dest ?"text-white bg-green-500 rounded-lg p-2 hover:text-black ":""}`}>
                                {item.title}
                            </Link>
                        </li>
                    )
                })}
                <li className={!tokenVerify?"hidden":"px-4 hover:text-green-500"}><Link to="/profile" className={`px-4 hover:text-green-500 ${isActive=== true && dest=== "Profile"?"text-white bg-green-500 rounded-lg p-2 hover:text-black ":""}`}>Profile</Link></li>
                <li className={!admin?"hidden":"px-4 hover:text-green-500"}><Link to="/admin">Dashboard</Link></li>
            </ul>
        </div>
        <div>
            <span className={!tokenVerify?'hidden':'text-xl p-2 max-xl:hidden'}>{username} |</span>
            <a href='/login'>
                <button className={!tokenVerify?"hover:bg-green-500 hover:text-white rounded-lg ease-in-out duration-500 p-2 text-xl max-xl:hidden":"hidden"}>Sign in</button>
                <button className={tokenVerify?"hover:bg-green-500 hover:text-white rounded-lg ease-in-out duration-500 p-2 text-xl max-xl:hidden":"hidden"} onClick={logOut}>Log out</button>
            </a>
        </div>   
        <div className='block xl:hidden p-2 text-xl z-50'>
            <i className={!Clicked?"fa-solid fa-bars":"fixed right-6 fa-solid fa-times"} onClick={handleClick}></i>
        </div>


        {/* Mobile Navbar */}
        <div className={Clicked?'fixed h-full border-l top-0 right-0 w-[40%]  border-l-gray-600 bg-[#fff] ease-in-out duration-500 z-10':"fixed right-[-100%] top-0 w-[40%] h-full ease-in-out duration-500 z-10"}>
            <ul className='uppercase px-4 py-8'>
                {MobileListMenu.map((item, index)=> {
                    return(
                        <li key={index} className={`${item.classMobile} ${isActive===true && item.title === dest ?"text-green-500":""}`}>
                             <Link to={item.link}>{item.title}</Link>
                        </li>
                    )
                })}                
                <div className={!tokenVerify?"hidden":" border-b border-gray-600 transition ease-in-out max-sm:text-sm collapse text-start"}>
                    <div className='collapse-title'>
                        <p>Profile</p>
                    </div>
                    <input type="checkbox" />
                    <div className='collapse-content'>
                        <li className='my-2 cursor-pointer'><Link to="/profile">My Profile</Link></li>
                        <li className='my-2 cursor-pointer'><Link to="/editProfile">Edit Profile</Link></li>
                        <li className='my-2'><Link to="/ticket">Coupon</Link></li>
                    </div>
                </div>
                <li className={!admin?"hidden":"p-4 border-b border-gray-600 hover:text-green-500 transition ease-in-out hover:-translate-x-[-10px] max-sm:text-sm"} ><Link to="/admin">Dashboard</Link></li>
            </ul>
            <div className='w-full h-[50%] flex justify-center items-center'>
                <a href='/login'>
                    <button className={!tokenVerify?"hover:bg-green-500 hover:text-white rounded-lg ease-in-out duration-500 p-2 text-xl":"hidden"}>Sign in</button>
                    <button className={tokenVerify?"hover:bg-green-500 hover:text-white rounded-lg ease-in-out duration-500 p-2 text-xl":"hidden"}>Log out</button>
                </a>
            </div>
        </div> 
    </div>
  )
}

export default Navbar