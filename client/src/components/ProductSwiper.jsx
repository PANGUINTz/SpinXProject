import React, { useEffect, useState } from 'react';

import { FreeMode, Pagination, Navigation} from 'swiper'
import { SwiperSlide ,Swiper} from 'swiper/react';

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Swiper.css'
import  toast,{ Toaster } from 'react-hot-toast';
import axios from 'axios';


const Product = (props) => {
    const {title, products} = props

    const [tokenVerify, setTokenVeify] = useState(false)
    const [ userId, setUserId ] = useState("")
    const [username, setUser] = useState("")

    useEffect(() => {
      fetchUser()
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
          setUser(data.data.decodedToken.username)
        } else {
          setTokenVeify(false)
        }
    })
    .catch(error=>error);
    }
  })
  
  const fetchUser = async() => {
    await axios.post("http://localhost:8080/getUserID", {username}).then((result) => {
      setUserId(result.data._id)
    }).catch(error => error)
  }


    const handleClick =(e) => {
      const coupons = e.target.value  
      console.log(coupons);
      axios.post(`http://localhost:8080/userCoupon/${userId}`, {coupons}).then((result) =>{
        toast.success(result.data.message);
      }).catch((error) => {
        toast.error(error.response.data.error)}
      )
    }

    const handleClickError =() => {
      toast.error("กรุณาล็อคอินก่อน")
      setTimeout(() => {
        window.location.href = "/login"
      },500)
    }

  

    if (!products || !products.length) {
      return <div><h1 className='text-3xl max-md:text-2xl font-bold mt-20 mx-10'>{title}</h1><p className={"text-3xl font-bold text-center my-20"}>ตอนนี้ไม่มีสินค้าอยู่ในขณะนี้</p></div> 
    }

   return (
    <div className='w-full p-5 '>
      <h1 className='text-3xl max-md:text-2xl font-bold mt-20 mx-10'>{title}</h1>

      <Toaster position='top-center' reverseOrder='false'/>

       <Swiper
          freeMode={true}
          grabCursor={true}
          // loop={true}
          modules={[FreeMode ,Pagination, Navigation]}
          className="mySwiper"
          slidesPerView={5} 
          navigation={true}
          pagination={{ clickable: true }}
          breakpoints={{
              0: {
                  slidesPerView:1,
                  spaceBetween: 10,
              },
              480: {
                  slidesPerView:2,
                  spaceBetween: 10,
              },
              768: {
                  slidesPerView:3,
                  spaceBetween: 10,
              },
              1024: {
                  slidesPerView:4,
                  spaceBetween: 10,
              },
              1280: {
                  slidesPerView:5,
                  spaceBetween: 10,
              }
          }}>
            
        <div className='flex flex-wrap'>
          {products.map((item, index)=> {
            return(
              <SwiperSlide key={index}>
                  <div className='m-5 p-2 shadow-lg w-full max-md:w-[100%] bg-white'>
                      <img src={`http://localhost:8080/${item.product_img?item.product_img:item.coupon_img}`} alt={item.product_name?item.product_name:item.coupon_name} className="w-full h-64 object-cover max-msd:object-fill" />
                      <h2 className="text-lg font-bold p-5">{item.product_name?item.product_name:item.coupon_name}</h2>
                      <div className='flex justify-between'>
                        <p className="text-gray-600 p-5 max-sm:text-sm">{item.description}</p>
                        <p className="text-black p-5 text-xl max-sm:text-sm">{item.price?item.price:item.discount}<span className={item.price?"":"hidden"}>.-</span><span className={item.discount?"text-xl":"hidden"}>%</span></p>
                      </div>

                      <div className='w-[100%] flex justify-center'>
                        <button className={item.discount?"w-[50%] p-2 bg-green-500 hover:bg-green-900 rounded-md ":"hidden"} onClick={tokenVerify?handleClick:handleClickError} value={item._id}>เก็บคูปอง</button>
                      </div>
                  </div>
              </SwiperSlide>
            )
          })}
        </div>
      </Swiper>

    </div>
  );
};

export default Product;