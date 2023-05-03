import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SidebarAdmin = () => {
    const navigate = useNavigate();

    const [username, setUsername] = useState("")
    const [clicked, setClicked] = useState(false);

    const haddleClick = () => {
      setClicked(!clicked);
    }

    const haddleSignout = () => {
      localStorage.clear()
      navigate('/')
    }

    try {
      const token = localStorage.getItem('token')
      if(!token) {
        alert("You cannot Access")
        navigate('/')
      } else {
        axios.post('http://localhost:8080/getUser', token, {
          headers: {
              Authorization: 'Bearer ' + token
          }
      })
      .then(data => {
          if(data.data.msg === "authentificate") {
              setUsername(data.data.decodedToken.username)
          }
          if(data.data.decodedToken.role !== "admin") {
            alert("You cannot Access")
            navigate('/')
          }
      })
      .catch( error => error);
      }
    } catch (error) {
      return error
    }

      

    return (
      <div className='w-60'>
        {/* PC */}
        <div className='bg-black h-screen w-full max-md:hidden max-lg:w-[25%] flex justify-between flex-col'>
        <div>
          <p className='text-white p-2 text-center mt-5 '>User : <span className='ml-5 uppercase'>{username}</span></p>
          <ul className='w-[100%] flex flex-col items-center mt-12 max-lg:mt-6'>
            <li className='text-white p-2 mt-10'><Link to="/productManage">Product</Link></li>
            <li className='text-white p-2 mt-10'><Link to="/couponManage">Coupou</Link></li>
            <li className='text-white p-2 mt-10'><Link to="/user">User</Link></li>
            <li className='text-white p-2 mt-10'><Link to="/admin">Admin</Link></li>
            <li className='text-white p-2 mt-10'><Link to="/">HomePage</Link></li>
          </ul>
        </div>
        <button className='text-white mb-10' onClick={haddleSignout}>Log out</button>
      </div>

        {/* Mobile */}
        <i className={!clicked?"fa-solid fa-bars fixed text-xl right-1 text-white z-50":"fa-solid fa-xmark fixed right-1 text-xl text-white z-50"} onClick={haddleClick}></i>

        <div className={clicked?'fixed h-full border-l top-0 right-0 w-[50%] bg-black ease-in-out duration-500 z-10 flex justify-between flex-col':"fixed right-[-100%] top-0 w-[40%] h-full ease-in-out duration-500"}>
        <div>
          <p className='text-white p-2 text-center mt-10 '>User : <span className='ml-5 uppercase'>{username}</span></p>
          <ul className='w-[100%] flex flex-col items-center mt-12 max-lg:mt-6'>
            <li className='text-white p-2 mt-10'><Link to="/productManage">Product</Link></li>
            <li className='text-white p-2 mt-10'><Link to="/couponManage">Coupou</Link></li>
            <li className='text-white p-2 mt-10'><Link to="/user">User</Link></li>
            <li className='text-white p-2 mt-10'><Link to="/admin">Admin</Link></li>
            <li className='text-white p-2 mt-10'><Link to="/">HomePage</Link></li>
          </ul>
        </div>
        <button className='text-white mb-10' onClick={haddleSignout}>Log out</button>
        </div>
      </div>
  )
}

export default SidebarAdmin