import React, { useEffect, useRef, useState } from 'react'
import SidebarAdmin from '../components/SidebarAdmin'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import ManageMenu from '../components/ManageMenu';
import Modal from 'react-modal';
import toast, {Toaster} from 'react-hot-toast';


const AdminPage = () => { 

    const [products, setProducts] = useState([]);

    const [dataList, setDataList] = useState({})

    const [isOpenDelete, setIsOpenDelete] = useState(false)

    const [isOpenEdit, setIsOpenEdit] = useState(false)

    const [productId, setProductsId] = useState('')

    const [pending, setPending] = useState(true)

    const [searchTerm, setSearchTerm] = useState('')

    const [images, setImages] = useState('')



    const filteredData = products.filter((item) => (item.product_name && item.product_name.toLowerCase().includes(searchTerm.toLowerCase()))) 

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
      axios.get('http://localhost:8080/getProduct').then((response) => {
        setProducts(response.data)      
        setTimeout(() => {
          setPending(false)
        },500) 
      }).catch((error) => error)
    },[])


    //USE REF

    const productName = useRef(null);
    const productPrice = useRef(null);
    const productBrand = useRef(null);
    const productCategories = useRef(null);
    const productDescription = useRef(null);
    const productSeller = useRef(null);


    async function handleSubmit(value) {
    
      const putData = { 
        product_name: productName.current.value,
        price: productPrice.current.value,
        product_brand: productBrand.current.value,
        categories: productCategories.current.value,
        description: productDescription.current.value,
        bestSeller: productSeller.current.value,
      }

      value.preventDefault();
      const result = await axios.put(`http://localhost:8080/updateProduct/${productId}`, putData).then((value) => {
        toast.success('แก้ไขข้อมูลสำเร็จ')
        setTimeout(() => {
          window.location.reload();
        }, 500)
        return result;
      }).catch((error) => error)
    }


  const handdleFileUpload = async(e) => {
    const file = e.target.files[0]
    console.log(file);
    const base64 = await convertToBase64(file)
    console.log(base64);
    setImages({product_img: base64})
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

  const columns = [
    {
      name: 'รูปสินค้า',
      selector: row =><div className='w-[100%]'><img src={`http://localhost:8080/${row.product_img}`} className={`w-[50%]`} alt={`${row.product_name}`}/></div> ,
      sortable: true
    },
    {
      name: 'รายชิ่อสินค้า',
      selector: row => row.product_name,
      sortable: true
    },
    {
      name: 'ราคา',
      selector: row => row.price,
      sortable: true
    },
    {
      name: 'ประเภท',
      selector: row => row.categories,
      sortable: true
    },
    {
      name: 'ยี่ห้อ',
      selector: row => row.product_brand,
      sortable: true
    },
    {
      name: 'รายละเอียดสินค้า',
      selector: row => row.description,
      sortable: true
    },
    {
      name: 'สินค้าขายดี',
      selector: row => row.bestSeller,
      sortable: true
    },
    {
      name: "",
      selector: row => 
      <div>
        <i className="fa-solid fa-pen-to-square p-2 text-xl cursor-pointer hover:text-blue-500" onClick={() => {
          setDataList({
            product_img: row.product_img,
            product_name: row.product_name,
            price: row.price,
            categories: row.categories,
            product_brand: row.product_brand,
            description: row.description,
            bestSeller: row.bestSeller
          })
          setProductsId(row._id)
          openModalEdit()
        }}></i>
        <i className="fa-solid fa-trash p-2 text-xl cursor-pointer hover:text-red-500" onClick={() =>{
          setProductsId(row._id)
          openModalDelete()}}></i>
      </div>
    }
  ];
  Modal.setAppElement('#root');

  return (
    <div className='bg-gray-500 flex '>
      <Toaster position="top-center" reverseOrder={false}/>
      
      <SidebarAdmin/>

      <Modal
        isOpen={isOpenDelete}
        onRequestClose={closeModalDelete}
        className="bg-gray-500 w-[30%] relative top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] translate-x-[-50%] translate-y-[-50%] p-5 max-md:top-[30%]">

        <p className='text-xl py-5'>คุณต้องการจะลบข้อมูลสินค้านี้ใช่มั้ย</p>

        <button onClick={() => {
          axios.delete(`http://localhost:8080/deleteProduct/${productId}`)
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


      <Modal
        isOpen={isOpenEdit}
        onRequestClose={closeModalEdit}
        className="bg-gray-500 w-[30%] max-md:w-[50%]  relative top-[50%] left-[50%] right-auto bottom-auto mr-[-50%] translate-x-[-50%] translate-y-[-50%] p-5 ">
        <p className='text-xl '>แก้ไขข้อมูลรายการสินค้า</p>
        <form onSubmit={handleSubmit} className='flex flex-col'/* encType='multipart/form-data'*/>

          <div className='my-2'>
            <label>ชื่อสินค้า</label>
            <input type="text" placeholder='ชื่อสินค้า' className='p-2 w-[100%]' defaultValue={dataList.product_name}  ref={productName}></input>
          </div>

          <div className='my-2'>
            <label>ราคาสินค้า</label>
            <input type="text" placeholder='ราคาสินค้า' className='p-2 w-[100%]' defaultValue={dataList.price} ref={productPrice}></input>
          </div>

          <div className='my-2'>
            <label>ประเภทของสินค้า</label>
            <select name="categories" className='border border-black p-2 w-full' defaultValue={dataList.categories} ref={productCategories}>
              <option disabled value="">เลือกประเภทของสินค้า</option>
              <option value="แว่นสายตา">แว่นสายตา</option>
              <option value="แว่นกันแดด">แว่นกันแดด</option>
            </select>
          </div>

          <div className='my-2'>
            <label>ยี่ห้อสินค้า</label>
            <input type="text" placeholder='ยี่ห้อสินค้า' className='p-2 w-[100%]' defaultValue={dataList.product_brand} ref={productBrand}></input>
          </div>

          <div className='my-2'>
            <label>รายละเอียดของสินค้า</label>
            <input type="text" placeholder='รายละเอียดสินค้า' className='p-2 w-[100%]' defaultValue={dataList.description} ref={productDescription}></input>
          </div>

          <div className='my-2'>
            <label>สินค้าขายดี</label>
            <select name="bestSeller" className='border border-black p-2 w-full' defaultValue={dataList.bestSeller} ref={productSeller}>
              <option disabled value="">เลือกสินค้าขายดี</option>
              <option value="true">ขายดี</option>
              <option value="false">ขายไม่ดี</option>
            </select>
          </div>

          <div className='my-2'>
            <label>เปลี่ยนรูปภาพ</label>
            <div className='w-[100%]'>
              <input type="file" placeholder='เปลี่ยนรูปภาพ' className='py-2 w-[100%]' onChange={(e)=> handdleFileUpload(e)} accept='.jpeg, .png, .jpg' name="productImage" ></input>
              <img src={images?`${images.product_img}`:`http://localhost:8080/${dataList.product_img}`} alt={`${dataList.product_name}`} className="w-[40%]"></img>
            </div>
          </div>


          
        <div className='my-2'>
          <button className="p-2 w-20 mr-5 max-md:mb-2 bg-green-500 hover:bg-green-900 max-md:mx-3">บันทึก</button>

          <button onClick={closeModalEdit} className="bg-red-500 p-2 w-20 hover:bg-red-900 max-md:mx-3">ปิด</button>
        </div>

        </form>
      </Modal>
      

    
      <div className='w-[100%]'>
        <div className='mt-5 flex px-20 justify-center mb-5'>
          <div className='relative w-[40%] max-md:w-[60%] max-sm:w-[100%]'>
            <i className="fa-solid fa-magnifying-glass text-xl absolute right-2 top-2.5"></i>
            <input type="text" className='border-2 border-gray-300 p-2 ml-2 w-[100%] rounded-lg px-5' placeholder='ค้นหาข้อมูลสินค้า' onChange={(e) => setSearchTerm(e.target.value)}></input>
          </div>
        </div>
        
        <ManageMenu  destination1="/productManage" destination2="/addProduct"/>
    
        <div className='w-[100%] flex justify-center'>
          <div className=' mt-16 w-[80%] max-sm:w-[100%]'>
            <p className='text-2xl font-bold text-center'>แก้ไขรายการสินค้า</p>
            <DataTable progressPending={pending} fixedHeaderScrollHeight="550px" responsive pagination columns={columns} data={filteredData?filteredData:products} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminPage