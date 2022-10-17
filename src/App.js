import {BrowserRouter, Routes, Route} from "react-router-dom";
import UpdateUser from "./Pages/UpdateUser";
import Index from './Pages/Index';
import Beranda from "./Pages/Dashboard";
import TambahUser from "./Pages/TambahUser";
import PageLogin from "./Pages/PageLogin";
import PageRegister from "./Pages/PageRegister";
import Chats from "./Pages/Chat";
import Employee from "./Pages/Employee/Employee";
import TambahEmployee from "./Pages/Employee/TambahEmployee";
import UpdateEmployee from "./Pages/Employee/UpdateEmployee";
import Category from "./Pages/Category/Category";
import TambahCategory from "./Pages/Category/TambahCategory";
import UpdateCategory from "./Pages/Category/UpdateCategory";
import Produkss from "./Pages/Produk/Produkss";
import TambahProduk from "./Pages/Produk/TambahProduk";


function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<PageLogin/>}/>
      <Route path="/register" element={<PageRegister/>}/>
      <Route path="/dashboard" element={<Beranda/>}/>
      <Route path="users" element={<Index/>}/>
      <Route path="chats" element={<Chats/>}/>
      <Route path="users/addUsers" element={<TambahUser/>}/>
      <Route path="users/editUsers/:id" element={<UpdateUser/>}/>
      <Route path="employee" element={<Employee/>}/>
      <Route path="employee/addEmployee" element={<TambahEmployee/>}/>
      <Route path="employee/editEmployee/:id" element={<UpdateEmployee/>}/>
      <Route path="category" element={<Category/>}/>
      <Route path="category/addCategory" element={<TambahCategory/>}/>
      <Route path="category/editCategory/:id" element={<UpdateCategory/>}/>
      <Route path="produk" element={<Produkss/>}/>
      <Route path="produk/addProduk" element={<TambahProduk/>}/>
      
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
