import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import DataTable from 'react-data-table-component';
import SidebarAdmin from '../components/SidebarAdmin';
import Modal from 'react-modal';
import  toast,{Toaster}  from 'react-hot-toast';

const UserManage = () => {

    const userRole = useRef(null);

    const [userId, setUserId] = useState('')

    const [userData, setUserData] = useState({})

    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const [users, setUser] = useState([]);

    const [searchTerm, setSearchTerm] = useState('')

    const [pending, setPending] = useState(true)


    const filteredData = users.filter((item) => (item.username && item.username.toLowerCase().includes(searchTerm.toLowerCase()))) 

    function openModalDelete() {
        setIsOpenDelete(true);
    }
    
    function closeModalDelete() {
        setIsOpenDelete(false);
    }

    function openModalEdit() {
        setIsOpenEdit(true);
    }
    
    function closeModalEdit() {
        setIsOpenEdit(false);
    }

    useEffect(() => {
      setTimeout(() => {
        setPending(false)
      },500) 
    })

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
            <i className="fa-solid fa-pen-to-square p-2 text-xl cursor-pointer hover:text-blue-500" onClick={() => {
                setUserData({
                    role: row.role,
                })
                openModalEdit() 
                setUserId(row._id)}}></i>
            <i className="fa-solid fa-trash p-2 text-xl cursor-pointer hover:text-red-500" onClick={() =>{
                setUserId(row._id) 
                openModalDelete()}}></i>
          </div>
        }
      ];
      
      async function handleSubmit(e) {

        const putData = { 
          role: userRole.current.value,
        }
        
        e.preventDefault();
        await axios.put(`http://localhost:8080/updateUser/${userId}`, putData).then(() => {
          toast.success('แก้ไขข้อมูลสำเร็จ')
          setTimeout(() => {
            window.location.reload();   
          }, 500)
        }).catch((error) => {
          toast.error(`${error.response.data.error}`)
      })}
    

    useEffect(() => { 
        axios.get('http://localhost:8080/allUser').then((response) => {
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

        <Modal
        isOpen={isOpenEdit}
        onRequestClose={closeModalEdit}
        className="bg-gray-500 w-[30%] max-md:w-[50%]  relative top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] translate-x-[-50%] translate-y-[-50%] p-5 ">

        <p className='text-xl'>แก้ไขบัญชี</p>

        <form onSubmit={handleSubmit} className='flex flex-col'>
            <div className='my-2'>
                <label>ตำแหน่ง</label>
                <select type="text" placeholder='ตำแหน่ง' className='p-2 w-[100%]' defaultValue={userData.role} ref={userRole}>
                    <option value="">กรุณาเลือกตำแหน่ง</option>
                    <option value="user">user</option>
                    <option value="vip">vip</option>
                    <option value="admin">admin</option>
                </select>
            </div>
          
            <div className='my-2'>
                <button className="p-2 w-20 mr-5 max-md:mb-2 bg-green-500 hover:bg-green-900 max-md:mx-3">บันทึก</button>
                <button onClick={closeModalEdit} className="bg-red-500 p-2 w-20 hover:bg-red-900 max-md:mx-3">ปิด</button>
            </div>
        </form>
      </Modal>

      <Toaster position="top-center" reverseOrder={false}/>
            
            <SidebarAdmin/>
            <div className='w-[100%]'>
                <div className='mt-5 flex px-20 justify-center mb-5'>
                    <div className='relative w-[40%] max-md:w-[60%] max-sm:w-[100%]'>
                        <i className="fa-solid fa-magnifying-glass text-xl absolute right-2 top-2.5"></i>
                        <input type="text" className='border-2 border-gray-300 p-2 ml-2 w-[100%] rounded-lg px-5' placeholder='ค้นหาชื่อผู้ใช้' onChange={(event) => setSearchTerm(event.target.value)}></input>
                    </div>
                </div>
        
                <div className='w-[100%] flex justify-center'>
                    <div className=' mt-16 w-[80%] max-sm:w-[100%]'>
                        <p className='text-2xl font-bold text-center'>รายชื่อผู้ใช้งาน</p>
                        <DataTable progressPending={pending} fixedHeaderScrollHeight="550px" responsive pagination columns={columns} data={filteredData?filteredData:users} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UserManage