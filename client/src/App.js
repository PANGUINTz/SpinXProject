import Home from './routes/Home';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import ProductPage from './routes/ProductPage';
import PromotionPage from './routes/PromotionPage';
import FormLogin from './routes/FormLogin'
import FormRegister from './routes/FormRegister';
import ModelPage from './routes/ModelPage';
import AdminProductPage from './routes/AdminProductPage';
import ProfilePage from './routes/ProfilePage';
import EditProfile from './routes/EditProfile';
import MyCoupon from './routes/MyCoupon';
import AddProduct from './routes/AddProduct';
import UserManage from './routes/UserManage';
import AdminManage from './routes/AdminManage';
import AdminCoupon from './routes/AdminCoupon';
import AddCoupon from './routes/AddCoupon';
import Forgot from './routes/Forgot';
import ChangePassword from './routes/ChangePassword';

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>}></Route>

          <Route path='/products' element={<ProductPage/>}></Route>

          <Route path='/promotion' element={<PromotionPage/>}></Route>

          <Route path='/login' element={<FormLogin/>}></Route>

          <Route path='/register' element={<FormRegister/>}></Route>

          <Route path='/admin' element={<AdminManage/>}></Route>

          <Route path='/model' element={<ModelPage/>}></Route>

          <Route path='/profile' element={<ProfilePage/>}></Route>

          <Route path='/editProfile' element={<EditProfile/>}></Route>

          <Route path='/ticket' element={<MyCoupon/>}></Route>

          <Route path='/addProduct' element={<AddProduct/>}></Route>

          <Route path='/user' element={<UserManage/>}></Route>

          <Route path='/productManage' element={<AdminProductPage/>}></Route>

          <Route path='/couponManage' element={<AdminCoupon/>}></Route>

          <Route path='/addCoupon' element={<AddCoupon/>}></Route>

          <Route path='/forgetPassword' element={<Forgot/>}></Route>

          <Route path='/changePassword' element={<ChangePassword/>}></Route>
          
        </Routes>
    </>
  );
}

export default App;
