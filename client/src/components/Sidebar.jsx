import React from 'react'
import { Link } from 'react-router-dom';

    const Sidebar = (props) => {


        const {sideBarActive, title} = props


        return (
        <>
            <div className='w-[10%]'>
                {/* Sidebar */}
                <div className='w-[100%] h-screen bg-gray-200 shadow-xl max-md:hidden'>
                    <ul className='flex flex-col'>
                        <li className={`mt-20 text-center p-4 ${sideBarActive === true && title === "myProfile"?"w-[100%] bg-green-400 rounded-md text-white font-bold text-md":""}`}>
                            <Link to='/profile'><span className="material-symbols-outlined relative bottom-[-0.25rem] mr-1">person</span>My Profile</Link>
                        </li>
                        <li className={`mt-20 text-center p-4 ${sideBarActive === true && title === "editProfile"?"w-[100%] bg-green-400 rounded-md text-white font-bold text-md":""}`}>
                            <Link to='/editProfile'><span className="material-symbols-outlined relative bottom-[-0.25rem] mr-1">edit</span>Edit Profile</Link>
                        </li>
                        <li className={`mt-20 text-center p-4 ${sideBarActive === true && title === "myPromotion"?"w-[100%] bg-green-400 rounded-md text-white font-bold text-md":""}`}>
                            <Link to='/ticket'><span className="material-symbols-outlined relative bottom-[-0.25rem] mr-1">confirmation_number</span>My Coupou</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Sidebar