import React from 'react'
import Pagination from '../components/Pagination'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Product from '../components/Product'
import { useState, useEffect } from 'react'
import axios from 'axios'


const ProductPage = () => {
  //Pagination
    const [product, setProducts] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);

    const [searchTerm, setSearchTerm] = useState('')

    const filteredData = product.filter((item) => (item.product_name && item.product_name.toLowerCase().includes(searchTerm.toLowerCase()))) 


    const productPerPage = 8;
    const indexOfLastItem = currentPage * productPerPage;
    const indexOfFirstItem = indexOfLastItem - productPerPage;
    const currentProduct = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const paginate = pageNumber => setCurrentPage(pageNumber);

    //On Page
    const [isActive, setIsActive] = useState(false) 

    useEffect(() => {
      axios.get('http://localhost:8080/getProduct').then((value) => {
        setProducts(value.data);
       }).catch((error) => error)
       return(setIsActive(true))
    }, [isActive]);

  
  return (
    <>
        <Navbar isActive={isActive} dest="Products"/>
        <div className='w-full p-2 relative'>
          <img className='w-full h-[40vh] object-cover blur-md' alt="img" src='https://images.unsplash.com/photo-1512099053734-e6767b535838?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Z2xhc3Nlc3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=2000&q=60'/>
            
            <div className='absolute top-[60%] left-[25%] z-0 w-[50%] flex justify-center max-sm:w-[80%] max-sm:left-10'>
                <i className="fa-solid fa-magnifying-glass absolute top-2 left-2 text-2xl"></i>
                <input type='text' placeholder='Search' onChange={(e) => setSearchTerm(e.target.value)} className='py-3 px-10 opacity-70 w-full z-0 rounded-2xl'></input>
            </div>
        </div>

          <Product title="Product" product={currentProduct}/>

        <p className={currentProduct.length===0?"text-3xl font-bold text-center":"hidden"}>ตอนนี้ไม่มีสินค้าอยู่ในขณะนี้</p>
        <Pagination productPerPage={productPerPage} totalProduct={filteredData.length} paginate={paginate} currentPage={currentPage}/>
        <Footer/>
    </>
  )
}

export default ProductPage