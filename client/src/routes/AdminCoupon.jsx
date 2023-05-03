import React, { useEffect, useState } from 'react'
import SidebarAdmin from '../components/SidebarAdmin'
import ManageMenu from '../components/ManageMenu';
import DataTable from 'react-data-table-component';
import Modal from 'react-modal';
import axios from 'axios';
import  toast, {Toaster} from 'react-hot-toast';

const AdminCoupon = () => {

    const [pending, setPending] = useState(true)

    const [couponId, setCouponId] = useState('')

    const [coupons, setCoupon] = useState('')

    const [openDelete, setIsOpenDelete] = useState(false)

    useEffect(() => {
        axios.get('http://localhost:8080/getCoupon').then((value) => {
            setCoupon(value.data)
        })
        setTimeout(() => {
          setPending(false)
        },500) 
    })

    function openModalDelete() {
        setIsOpenDelete(true);
      }
  
      function closeModalDelete() {
        setIsOpenDelete(false);
      }
      


    const columns = [
        {
          name: 'รูปคูปอง',
          selector: row =><div className='w-[100%]'><img src={`http://localhost:8080/${row.coupon_img}`} className={`w-[50%]`} alt={`${row.coupon_name}`}/></div> ,
          sortable: true
        },
        {
          name: 'รายชิ่อคูปอง',
          selector: row => row.coupon_name,
          sortable: true,
        },
        {
          name: 'ส่วนลด',
          selector: row => row.discount,
          sortable: true
        },
        {
            name: 'รายละเอียดคูปอง',
            selector: row => row.description,
            sortable: true
        },
        {
          name: "",
          selector: row => 
          <div>

            <i className="fa-solid fa-trash p-2 text-xl cursor-pointer hover:text-red-500" onClick={() =>{
              setCouponId(row._id)
              openModalDelete()}}></i>
          </div>
        }
      ];
      
    return (
        <div className='flex bg-gray-500'>
            <SidebarAdmin/>

            <Toaster position="top-center" reverseOrder={false}/>

            <Modal
                isOpen={openDelete}
                onRequestClose={closeModalDelete}
                className="bg-gray-500 w-[30%] relative top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] translate-x-[-50%] translate-y-[-50%] p-5 max-md:top-[30%]">

                <p className='text-xl py-5'>คุณต้องการจะลบข้อมูลสินค้านี้ใช่มั้ย</p>

                <button onClick={() => {
                    axios.delete(`http://localhost:8080/deleteCoupon/${couponId}`)
                    .then(() => {
                        toast.success('ลบสำเร็จ')
                        setTimeout(() => {
                            window.location.reload()
                        },500)
                    })
                    .catch(error => error) 
                }}
                className="bg-green-500 p-2 w-20 mr-5 max-md:mb-2 hover:bg-green-900 max-md:mx-3">ตกลง</button>
                <button onClick={closeModalDelete} className="bg-red-500 p-2 w-20 hover:bg-red-900 max-md:mx-3">ปิด</button>
            </Modal>


            <div className='w-[100%]'>
                <div className='mt-5 flex px-20 justify-center mb-5'>
                    <div className='relative w-[40%] max-md:w-[60%] max-sm:w-[100%]'>
                        <i className="fa-solid fa-magnifying-glass text-xl absolute right-2 top-2.5"></i>
                        <input type="text" className='border-2 border-gray-300 p-2 ml-2 w-[100%] rounded-lg px-5' placeholder='ค้นหาข้อมูลสินค้า' /*onChange={(e) => setSearchTerm(e.target.value)}*/></input>
                    </div>
                </div>


                
                
                <ManageMenu destination1="/couponManage" destination2="/addCoupon"/>
                <div className='w-[100%] flex justify-center'>
                    <div className=' mt-16 w-[80%] max-sm:w-[100%]'>
                        <p className='text-2xl font-bold text-center'>แก้ไขข้อมูลคูปอง</p>
                        <DataTable progressPending={pending} fixedHeaderScrollHeight="550px" responsive pagination columns={columns} data={coupons} /*data={filteredData?filteredData:products}*/ />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminCoupon