import React from 'react'
import { Link } from 'react-router-dom'

const ManageMenu = (props) => {

  const { destination1, destination2 } = props
  return (
    <div className='w-[100%] flex justify-center'>

        <div className='w-[50%] h-30 bg-white grid grid-cols-2 rounded-2xl mt-5'>
            <Link to={destination1} className='border-r cursor-pointer flex flex-col justify-center items-center rounded-l-2xl'>
                <p className='text-xl font-bold text-center'>จัดการข้อมูล</p>
                <i className="fa-solid fa-inbox font-bold text-6xl"></i>
            </Link>

            <Link to={destination2} className=' border-l cursor-pointer flex flex-col justify-center items-center rounded-r-2xl'>
                <p className='text-xl font-bold'>เพิ่มข้อมูล</p>
                <i className="fa-solid fa-square-plus font-bold text-6xl"></i>
            </Link>
        </div>

    </div>
  )
}

export default ManageMenu