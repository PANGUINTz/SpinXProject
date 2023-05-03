import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Sidebar from '../components/Sidebar'
import axios from 'axios'
import Modal from 'react-modal';

const EditProfile = () => {

  const [sideBarActive, setSideBarActive] = useState(false)

  const [isActive, setIsActive] = useState(false)

  const [couImg, setCouImg] = useState("")

  const [couponId, setCouponId] = useState("")

  const [coupons, setCoupons] = useState([])

  const [username, setUsername] = useState("")

  const [userId, setUserId] = useState("")

  const [isOpenDelete, setIsOpenDelete] = useState(false)

  const [confirm, setConfirm] = useState(false)

  const [seconds, setSeconds] = useState(10);



  useEffect(() => {
    let interval = null;
    if(confirm) {
      if (seconds > 0) {
        interval = setInterval(() => {
          setSeconds(seconds => seconds - 1);
      }, 1000);
    } else {
      axios.put(`http://localhost:8080/usedCoupon/${userId}/${couponId}`).then(() => {
        window.location.reload()        
        setConfirm(false)
      }).catch(error => error)
    }
  }
    return () => clearInterval(interval);
  }, [seconds, confirm, couponId, userId]);


  function openModalDelete() {
    setIsOpenDelete(true);
  }

  function closeModalDelete() {
    setIsOpenDelete(false);
  }

    useEffect(() => {
        setIsActive(true)
        setSideBarActive(true)
    },[])

    const handleClick = async() => {
      openModalDelete()
    }

    //Fetch User
    useEffect(() => {
      const fetchUser = async() => {
        if(username) {
          await axios.post(`http://localhost:8080/getUserID`, {username}).then((result) => {
            setUserId(result.data._id);
          }).catch(error => error)
        }
      }
      fetchUser()
    },[username])


   //  Fetch Coupon
   useEffect(() => {
    const fetchCoupon = async() => {
      if(userId) {
        await axios.get(`http://localhost:8080/getCouponByUser/${userId}`).then((result) => {
          setCoupons(result.data)
        }).catch(error => console.log(error))
      }
    }
     fetchCoupon()
   },[userId])

    // Token
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
              setUsername(data.data.decodedToken.username)
          }
      })
      .catch(error=>error)}
      },[username])
      
      Modal.setAppElement('#root');

  return (
    <>
      <Modal
        isOpen={isOpenDelete}
        onRequestClose={closeModalDelete}
        className="bg-gray-300 max-md:w-[60%] w-[25%] h-[40%] relative top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] translate-x-[-50%] translate-y-[-50%] p-5">

        <p className='text-xl py-5'>{!confirm?"คุณต้องการจะใช้คูปองนี้หรือไม่":"คุณใช้คูปองนี้แล้วให้พนักงานตรวจสอบ"}</p>

      <div className='h-[80%]'>
          <div className={confirm?`hidden`:`w-full`}>
            <img src={`http://localhost:8080/${couImg}`} alt='images' className='h-52 w-full object-cover'></img>
          </div>
          <p className={!confirm?`hidden`:`text-center text-4xl mt-10 object-fill`}>{Math.floor(seconds / 60)}:{(seconds % 60).toLocaleString('en-US', {minimumIntegerDigits: 2, useGrouping:false})}</p>

          <div className={!confirm?`flex justify-center mt-5`:`hidden`}>
            <button onClick={() => {
              // handleUseCoupon()
              setConfirm(true)
            }}
              className="bg-green-500 p-3 w-20 mr-5 hover:bg-green-900">ยืนยัน
            </button>
            <button onClick={closeModalDelete} className="bg-red-500 p-3 w-20 hover:bg-red-900">ยกเลิก</button>
          </div>
          <p className={!confirm?`hidden`:`text-red-600 text-start mt-32 max-md:mt-10`}>ในเวลา 10 วินาทีคุณต้องให้พนักงานตรวจสอบว่าคุณใช้แล้ว* <br/>หากเวลาหมดคูปองจะหายทันที</p>
      </div>


      </Modal>
      <Navbar isActive={isActive} dest="Profile"/>
      <div className='flex'>
        <Sidebar sideBarActive={sideBarActive} title="myPromotion"/>

        <div className='w-[100%]'>
          <h1 className='text-3xl font-bold my-10 ml-5'>คูปองของฉัน</h1>
          <hr/>
          <div className='flex max-md:flex-col'>
          {coupons.map((item, index)=> {
          return(
                <div className='p-2 shadow-lg w-[20%] bg-white ml-5 max-md:w-[80%]' key={index}>
                    <img src={`http://localhost:8080/${item.coupon_img}`} alt={item.coupon_name} className="w-full h-64 object-cover max-md:object-fill" />
                    <h2 className="text-lg font-bold p-5 max-sm:text-sm">{item.coupon_name}</h2>
                    <div className='flex justify-between'>
                      <p className="text-gray-600 p-5 max-sm:text-sm">{item.description}</p>
                      <p className='text-black p-5 text-xl max-sm:text-sm'>{item.discount}<span className="text-xl">%</span></p>
                    </div>
                    <div className='w-[100%] flex justify-center'>
                      <button className="w-[50%] p-2 bg-green-500 hover:bg-green-900 rounded-md" onClick={() => 
                      { handleClick()
                        setCouponId(item._id)
                        setCouImg(item.coupon_img)}}>ใช้คูปอง</button>
                    </div>
                </div>
          )
        })}
          </div>
        </div>
      </div>
      

    </>
    
  )
}

export default EditProfile