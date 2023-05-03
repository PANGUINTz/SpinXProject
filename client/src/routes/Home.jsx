import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ProductSwiper from '../components/ProductSwiper'


const Home = () => {

  const [isActive, setIsActive] = useState(false) 

  const [products, setProducts] = useState([])

  const [coupons, setCoupons] = useState([])

  const [searchTerm, setSearchTerm] = useState('')

  const filterData = products.filter((item) => (item.product_name && item.product_name.toLowerCase().includes(searchTerm.toLowerCase())))

  const filterData2 = coupons.filter((item) => (item.coupon_name && item.coupon_name.toLowerCase().includes(searchTerm.toLowerCase())))


  useEffect(()=> {
     axios.get('http://localhost:8080/getBestProduct').then((value) => {
      setProducts(value.data) 
      return setIsActive(true)
    })
  },[])

  useEffect(()=> {
    axios.get('http://localhost:8080/getCoupon').then((value) => {
      setCoupons(value.data) 
     return setIsActive(true)
   })
 },[])


  return (
    <>
        <Navbar isActive={isActive} dest="Home" />
        <div className='w-full p-2 relative'>
          <img className='w-full h-[40vh] object-cover blur-md' alt="img" src='https://images.unsplash.com/photo-1512099053734-e6767b535838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60'/>
            
            <div className='absolute top-[60%] left-[25%] z-0 w-[50%] flex justify-center max-sm:w-[80%] max-sm:left-10'>
                <i className="fa-solid fa-magnifying-glass absolute top-2 left-2 text-2xl"></i>
                <input type='text' placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} className='py-3 px-10 opacity-70 w-full z-0 rounded-2xl'></input>
            </div>
        </div>
        <ProductSwiper title ="Best Seller" products={filterData?filterData:products} />


        <ProductSwiper title ="Promotion" products={filterData2?filterData2:coupons}/>
        <Footer/>
    </>
  )
}

export default Home