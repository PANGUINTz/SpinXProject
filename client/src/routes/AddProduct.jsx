import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import ManageMenu from '../components/ManageMenu'
import SidebarAdmin from '../components/SidebarAdmin'
import toast,{ Toaster } from 'react-hot-toast';
import FormData from 'form-data';


const AddProduct = () => {

    const submitHandle= async(value) => {
        try {
                const fileInput = document.querySelector('input[name="product_img"]');
                const formData =  new FormData();
        
                formData.append("product_name", value.product_name);
                formData.append("price", value.price);
                formData.append("categories", value.categories);
                formData.append("description", value.description);
                formData.append("product_brand", value.product_brand);
                formData.append("bestSeller", value.bestSeller);
                formData.append("product_img",  fileInput.files[0]);

            
                const result = await axios.post('http://localhost:8080/addProduct', formData, {
                    headers:  {"Content-Type": "multipart/form-data"}
                }) 
                console.log(result.data);
                return result
            } 
                catch (error) {
                    console.log(error.response.data.error);
                    return  error.response.data.error
            }   
        }

    const [images, setImage] = useState("")

    const handdleFileUpload = async(e) => {
        const file = e.target.files[0]
        const base64 = await convertToBase64(file)
        setImage({product_img: base64})
        console.log(images);
    }

    function convertToBase64(file) {
        return new Promise((resolve, reject) => {
            const fileReader = new FileReader();
            fileReader.readAsDataURL(file);
            fileReader.onload = () => {
                resolve(fileReader.result)
            }
            fileReader.onerror =(error) => {
                reject(error)
            }
            })
        }

    const formik = useFormik({
        initialValues : {
            product_name: '',
            price: '',
            product_brand: '',
            description: '',
            categories: '',
            product_img: '',
            bestSeller: ''
        },
        validate: async values => {
            const errors= {}

            const checkExist = await submitHandle(values)

            if(checkExist === "This Name Product is Exist") {
                errors.product_name = "ชื่อสินค้าซ้ำ"
            } 

            if(!values.product_name) {
                errors.product_name = "ต้องมีชื่อของสินค้า"
            }

            if(!values.price) {
                errors.price = "ต้องมีราคาของสินค้า"
            } 

            if(values.price <= 0) {
                errors.price = "ราคาสินค้าต้องไม่เท่ากับศูนย์หรือน้อยกว่า"
            }

            if(!values.product_brand) {
                errors.product_brand = "ต้องมียี่ห้อของสินค้า"
            }

            if(!values.categories) {
                errors.categories = "ต้องมีประเภทของสินค้า"
            }

            if(!images) {
                errors.product_img = "ต้องเพิ่มรูปภาพสินค้า"
            }
            return errors
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (value) => {
            toast.success('เพิ่มข้อมูลสำเร็จ')            
            setTimeout(() => {
                window.location.href = "/productManage"
            },500)
        }
    })
    
    return (
        <div className='bg-gray-500 flex'>

            <Toaster position="top-center" reverseOrder={false}/>
            <SidebarAdmin/>

            <div className='w-[100%] max-md:w-[1000%]'>
                <ManageMenu destination1="/productManage" destination2="/addProduct"/>
                <p className='text-2xl font-bold text-center mt-5'>เพิ่มข้อมูลสินค้า</p>
                <form className='flex justify-center' onSubmit={formik.handleSubmit} action="/addProduct" method='post' encType='multipart/form-data'>
                    <div className='w-[40%]'>
                        <div className='my-5'>
                            <label className='block'>ชื่อสินค้า <span className='text-red-500'>*</span></label>
                            <input {...formik.getFieldProps('product_name')} className='border border-black py-2 px-4 w-full' name="product_name" placeholder='ชื่อสินค้า'/>
                            <span className='text-red-800'>{formik.errors.product_name}</span>
                        </div>

                        <div className='my-5'>
                            <label className='block'>ราคา<span className='text-red-500'>*</span></label>
                            <input {...formik.getFieldProps('price')} className='border border-black py-2 px-4 w-full' type="number"  name='price' placeholder='ราคาสินค้า' min="0" />
                            <span className='text-red-800'>{formik.errors.price}</span>
                        </div>

                        <div className='my-5'>
                            <label className='block'>ยี่ห้อ <span className='text-red-500'>*</span></label>
                            <input  {...formik.getFieldProps('brand')} className='border border-black py-2 px-4 w-full'  name='product_brand' placeholder='ยี่ห้อสินค้า'/>
                            <span className='text-red-800'>{formik.errors.product_brand}</span>
                        </div>

                        <div className='my-5'>
                            <label className='block'>รายละเอียดของสินค้า</label>
                            <input  {...formik.getFieldProps('description')} className='border border-black py-2 px-4 w-full'  name='description' placeholder='รายละเอียดสินค้า'/>
                        </div>

                        <div className='my-5 '>
                            <label className='block'>ประเภทของสินค้า <span className='text-red-500'>*</span></label>
                            <select {...formik.getFieldProps('categories')} name="categories" className='border border-black py-2 px-4 w-full'>
                                <option disabled value="">เลือกประเภทของสินค้า</option>
                                <option value="แว่นสายตา">แว่นสายตา</option>
                                <option value="แว่นกันแดด">แว่นกันแดด</option>
                            </select>
                            <span className='text-red-800'>{formik.errors.categories}</span>
                        </div>

                        <div className='my-5 '>
                            <label className='block'>สินค้าขายดี <span className='text-red-500'>*</span></label>
                            <select {...formik.getFieldProps('bestSeller')} name="bestSeller" className='border border-black py-2 px-4 w-full'>
                                <option disabled value="">สินค้าขายดี</option>
                                <option value="true">ขายดี</option>
                                <option value="false">ขายไม่ดี</option>
                            </select>
                            <span className='text-red-800'>{formik.errors.categories}</span>
                        </div>

                        <label className='flex'>
                            <div className='w-[100%]'>
                                <p>เพิ่มรูปภาพสินค้า</p>
                                <i className="fa-solid fa-image text-6xl cursor-pointer"></i>
                                <input onChange={(e) => handdleFileUpload(e)} type="file" name='product_img' accept='.jpeg, .png, .jpg' className='hidden'></input>
                                <p className='text-red-800'>{formik.errors.product_img}</p>
                            </div>


                        <div className='w-[100%]'>
                            <img src={images.product_img} className={!images?"hidden":"w-[60%] m-auto"} alt="images"/>
                        </div>
                            
                        </label>

                        <button type='submit' className='w-[100%] text-white p-4 font-bold text-xl mt-5' style={{backgroundColor: "black"}}>บันทึก</button>
                    </div>
                </form>
            </div>
        
        </div>
    )
}

export default AddProduct