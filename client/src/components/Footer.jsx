import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <div className='mt-2 w-full h-full bg-slate-800 py-6 px-8 text-white'>
        <div className=" grid grid-cols-3 max-md:grid-cols-1 gap-5">

            <div className="mt-2 mx-5">
                <h4 className='font-bold text-md max-md:text-xl'>ที่ตั้งสาขาหน้าร้าน</h4>
                <div className="flex mt-2">
                    <i className="fa-solid fa-map-location-dot text-2xl"></i>
                    <div className='ml-2'>
                        <h5>PONPHAT Eyeglasses</h5>
                        <p>100 เอกชัย 109 เขตบางบอน แขวงบางบอนใต้ กรุงเทพมหานคร 10140</p>
                    </div>
                </div>
            </div>

            <div className='mx-5'>
                <h4 className='font-bold text-md max-md:text-xl'>ติดต่อเรา</h4>
                <div className='flex mt-2'>
                    <i className="fa-solid fa-phone text-xl"></i>
                    <div className='ml-2'>
                        <h5>092-923-xxxx</h5>
                        <p>เวลาทำการ 10:00 - 18:00น. ของทุกวัน</p>
                    </div>
                </div>
            </div>

            <div className='mx-5'>
                <h4 className='font-bold text-md max-md:text-xl'>ข้อมูลร้าน</h4>
                <ul className='mt-2'>
                    <li className='m-2 hover:text-green-600'>
                        <Link to="/">เกี่ยวกับเรา</Link>
                    </li>
                    <li className='m-2 hover:text-green-600'>
                        <Link to="/">ติดต่อเรา</Link>
                    </li>
                    <li className='m-2 hover:text-green-600'>
                        <Link to="/">Privacy Policy</Link>
                    </li>
                    <li className='m-2 hover:text-green-600'>
                        <Link to="/">Warranty Claim Return Refund Policy</Link>
                    </li>
                </ul>
            </div>
        </div>
        <p className='mt-5 text-center font-bold'>© 2023 ponphateyeglasses.com All Rights Reserved.</p>
    </div>
  )
}

export default Footer