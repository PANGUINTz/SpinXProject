import axios from 'axios';
import React, { useEffect, useState } from 'react'
import toast,{Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom'



const Product = (props) => {
    const {title, product} = props;

    const [userId, setUserId] = useState('');
    const [username, setUser] = useState('');
    const [tokenVerify, setTokenVeify] = useState(false)

    const handleClick = (e) => {
      const coupons = e.target.value  
      axios.post(`http://localhost:8080/userCoupon/${userId}`, {coupons}).then((result) =>{
        toast.success(result.data.message);

      }).catch((error) => {
        toast.error(error.response.data.error)}
      )
    }

    const handleClickError = () => {
      toast.error("กรุณาล็อคอินก่อน")
      setTimeout(() => {
        window.location.href = "/login"
      },500)
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
          setUser(data.data.decodedToken.username)
        } else {
          setTokenVeify(false)
        }
    })
    .catch(error=>error);
    }
  },[])

  const fetchUser = async() => {
    await axios.post("http://localhost:8080/getUserID", {username}).then((result) => {
      setUserId(result.data._id)
    }).catch(error => error)
  }
  fetchUser()


  
    
  return (
    <div className='w-full p-5'>
    <h1 className='text-3xl max-md:text-2xl font-bold mt-20 mx-10'>{title}</h1>
    <Toaster position="top-center" reverseOrder={false}/>
      <div className='grid grid-cols-4 gap-3 p-4  max-sm:grid-cols-2'>
        {product.map((item, index)=> {
          return(
              <Link key={index}>
                <div className='p-2 shadow-lg w-full bg-white '>
                    <img src={`http://localhost:8080/${item.product_img?item.product_img : item.coupon_img}`} alt={item.product_name?item.product_name:item.coupon_name} className="w-full h-64 object-cover max-md:object-fill" />
                    <h2 className="text-lg font-bold p-5 max-sm:text-sm">{item.product_name?item.product_name:item.coupon_name}</h2>
                    <div className='flex justify-between'>
                      <p className="text-gray-600 p-5 max-sm:text-sm">{item.description}</p>
                      <p className='text-black p-5 text-xl max-sm:text-sm'>{item.price?item.price:item.discount}<span className={item.price?"":"hidden"}>.-</span><span className={item.discount?"text-xl":"hidden"}>%</span></p>
                    </div>
                    <div className='w-[100%] flex justify-center'>
                      <button className={item.discount?"w-[50%] p-2 bg-green-500 hover:bg-green-900 rounded-md ":"hidden"} onClick={tokenVerify?handleClick:handleClickError} value={item._id}>เก็บคูปอง</button>
                    </div>
                </div>
              </Link>
          )
        })}
      </div>
  </div>
  )
}

export default Product