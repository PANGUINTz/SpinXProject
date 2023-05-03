import axios from 'axios';
import React, { useEffect, useState } from 'react'
import DataTable from 'react-data-table-component';
import SidebarAdmin from '../components/SidebarAdmin';
import Modal from 'react-modal';
import  toast,{Toaster}  from 'react-hot-toast';

const AdminManage = () => {

    const [userId, setUserId] = useState('')

    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const [users, setUser] = useState([]);

    const [pending, setPending] = useState(true)

    const [searchTerm, setSearchTerm] = useState('')


    const filteredData = users.filter((item) => (item.username && item.username.toLowerCase().includes(searchTerm.toLowerCase()))) 

    useEffect(() => {
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
          name: 'ชื่อบัญชี',
          selector: row => row.username,
          sortable: true
        },
        {
          name: 'email',
          selector: row => row.email,
          sortable: true
        },
        {
          name: 'เบอร์โทร',
          selector: row => row.tel,
          sortable: true
        },
        {
          name: 'ชื่อจริง',
          selector: row => row.firstName,
          sortable: true
        },
        {
          name: 'นามสกุล',
          selector: row => row.lastName,
          sortable: true
        },
        {
            name: 'ตำแหน่ง',
            selector: row => row.role,
            sortable: true
          },
        {
          name: "",
          selector: row => 
          <div>
            <i className="fa-solid fa-trash p-2 text-xl cursor-pointer hover:text-red-500" onClick={() =>{
                setUserId(row._id) 
                openModalDelete()}}></i>
          </div>
        }
      ];

    useEffect(() => { 
        axios.get('http://localhost:8080/getAdmin').then((response) => {
          setUser(response.data)
        }).catch((error) => error)
    },[])

    Modal.setAppElement('#root')
    return (
        <div className='flex bg-gray-500'>

        {/*Delete User */}
        <Modal isOpen={isOpenDelete} onRequestClose={closeModalDelete} className="bg-gray-500 w-[30%] relative top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] translate-x-[-50%] translate-y-[-50%] p-5 max-md:top-[30%]">
            <p className='text-xl py-5'>คุณต้องการจะลบบัญชีนี้ใช่มั้ย</p>

            <button onClick={() => {
            axios.delete(`http://localhost:8080/deleteUser/${userId}`)
            .then(() => {
                toast.success("ลบสำเร็จ")
                setTimeout(() => {
                    window.location.reload()
                },500)
            })
            .catch(error => error) 
            }}
            className="bg-green-500 p-2 w-20 mr-5 max-md:mb-2 hover:bg-green-900 max-md:mx-3">ตกลง</button>
            <button onClick={closeModalDelete} className="bg-red-500 p-2 w-20 hover:bg-red-900 max-md:mx-3">ปิด</button>
        </Modal>

      <Toaster position="top-center" reverseOrder={false}/>
            
        <SidebarAdmin/>
            <div className='w-[100%]'>
                <div className='mt-5 flex px-20 justify-center mb-5'>
                    <div className='relative w-[40%] max-md:w-[60%] max-sm:w-[100%]'>
                        <i className="fa-solid fa-magnifying-glass text-xl absolute right-2 top-2.5"></i>
                        <input accept='image/*' type="text" className='border-2 border-gray-300 p-2 ml-2 w-[100%] rounded-lg px-5' onChange={(event) => setSearchTerm(event.target.value)} placeholder='ค้นหาชื่อผู้ใช้'></input>
                    </div>
                </div>
        
                <div className='w-[100%] flex justify-center'>
                    <div className=' mt-16 w-[80%] max-sm:w-[100%]'>
                        <p className='text-2xl font-bold text-center'>รายชื่อแอดมิน</p>
                        <DataTable fixedHeaderScrollHeight="0px" progressPending={pending} responsive pagination columns={columns} data={filteredData?filteredData : users } />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminManage