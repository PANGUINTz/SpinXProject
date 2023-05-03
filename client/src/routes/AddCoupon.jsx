import axios from 'axios'
import { useFormik } from 'formik'
import React, { useState } from 'react'
import ManageMenu from '../components/ManageMenu'
import SidebarAdmin from '../components/SidebarAdmin'
import toast,{ Toaster } from 'react-hot-toast';
import FormData from 'form-data';


const AddCoupon = () => {

    const submitHandle= async(value) => {
        try {
                const fileInput = document.querySelector('input[name="coupon_img"]');
                const formData =  new FormData();
        
                formData.append("coupon_name", value.coupon_name);
                formData.append("discount", value.discount);
                formData.append("description", value.description);
                formData.append("coupon_img",  fileInput.files[0]);

            
                const result = await axios.post('http://localhost:8080/addCoupon', formData, {
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
        setImage({coupon_img: base64})
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
            coupon_name: '',
            discount: '',
            description: '',
            coupon_img: '',

        },
        validate: async values => {
            const errors= {}

            const checkExist = await submitHandle(values)

            if(checkExist === "Coupon Exist") {
                errors.coupon_name = "ชื่อคูปองซ้ำ"
            } 

            if(!values.coupon_name) {
                errors.coupon_name = "ต้องมีชื่อของคูปอง"
            }

            if(!values.discount) {
                errors.discount = "ต้องมีส่วนลดของคูปอง"
            } 

            if(values.discount <= 0) {
                errors.discount = "ส่วนลดต้องไม่เท่ากับศูนย์หรือน้อยกว่า"
            }

            if(!images) {
                errors.coupon_img = "ต้องเพิ่มรูปภาพของคูปอง"
            }
            return errors
        },
        validateOnBlur: false,
        validateOnChange: false,
        onSubmit: (value) => {
            toast.success('เพิ่มข้อมูลสำเร็จ')            
            setTimeout(() => {
                window.location.href = "/couponManage"
            },500)
        }
    })
    
    return (
        <div className='bg-gray-500 flex'>

            <Toaster position="top-center" reverseOrder={false}/>
            <SidebarAdmin/>

            <div className='w-[100%] max-md:h-screen'>
                <ManageMenu destination1="/couponManage" destination2="/addCoupon"/>
                <p className='text-2xl font-bold text-center mt-5'>เพิ่มรายการส่วนลด</p>
                <form className='flex justify-center' onSubmit={formik.handleSubmit} action="/addCoupon" method='post' encType='multipart/form-data'>
                    <div className='w-[40%]'>
                        <div className='my-5'>
                            <label className='block'>ชื่อคูปองส่วนลด <span className='text-red-500'>*</span></label>
                            <input {...formik.getFieldProps('coupon_name')} className='border border-black py-2 px-4 w-full' name="coupon_name" placeholder='ชื่อสินค้า'/>
                            <span className='text-red-800'>{formik.errors.coupon_name}</span>
                        </div>

                        <div className='my-5'>
                            <label className='block'>ส่วนลด<span className='text-red-500'>*</span></label>
                            <input {...formik.getFieldProps('discount')} className='border border-black py-2 px-4 w-full' type="number"  name='discount' placeholder='ส่วนลด' min="0" />
                            <span className='text-red-800'>{formik.errors.discount}</span>
                        </div>

                        <div className='my-5'>
                            <label className='block'>รายละเอียดของคูปอง</label>
                            <input  {...formik.getFieldProps('description')} className='border border-black py-2 px-4 w-full'  name='description' placeholder='รายละเอียดคูปอง'/>
                        </div>

                        <label className='flex max-md:flex-col'>
                            <div className='w-[100%]'>
                                <p>เพิ่มรูปภาพคูปอง</p>
                                <i className="fa-solid fa-image text-6xl cursor-pointer"></i>
                                <input onChange={(e) => handdleFileUpload(e)}type="file" name='coupon_img' accept='.jpeg, .png, .jpg' className='hidden'></input>
                                <p className='text-red-800'>{formik.errors.coupon_img}</p>
                            </div>


                        <div className='w-[100%]'>
                            <img src={images.coupon_img} className={!images?"hidden":"w-[60%] m-auto max-md:w-[100%]"} alt="images"/>
                        </div>
                            
                        </label>

                        <button type='submit' className='w-[100%] text-white p-4 font-bold text-xl mt-5' style={{backgroundColor: "black"}}>บันทึก</button>
                    </div>
                </form>
            </div>
        
        </div>
    )
}

export default AddCoupon