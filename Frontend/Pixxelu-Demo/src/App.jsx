import React from 'react'
import {BrowserRouter, Routes,Route,useLocation} from 'react-router-dom'
import Products from './assets/Components/Products'
import Home from './assets/Components/Home'
import Navbar from './assets/Components/Navbar'
import Blog from './assets/Components/Blog'
import Admin from './assets/Components/Admin'
import Register from './assets/Components/Register'
import Login from './assets/Components/Login'
import Userdata from './assets/Components/Userdata'
import Update from './assets/Components/Update'
import AdminNav from './assets/Components/AdminNav'
import Categories from './assets/Components/Categories'
import Posts from './assets/Components/Posts'

function App() {
//  const location=useLocation()
  return (
   <>
    <BrowserRouter>
    {<Navbar/>}
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Categories' element={<Categories/>}/>
        <Route path='/Blog' element={<Blog/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Userdata' element={<Userdata/>}/>
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/Update' element={<Update/>}/>
        <Route path='/AdminNav' element={<AdminNav/>}/>
        <Route path='/Posts' element={<Posts/>}/>
      </Routes>
    </BrowserRouter>

   </>
  )
}

export default App
