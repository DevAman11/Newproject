import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Products from './assets/Components/Products'
import Home from './assets/Components/Home'
import Navbar from './assets/Components/Navbar'
import Blog from './assets/Components/Blog'
import Categories from './assets/Components/Categories'
import Register from './assets/Components/Register'
import Login from './assets/Components/Login'
import Userdata from './assets/Components/Userdata'

function App() {
  return (
   <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Blog' element={<Blog/>}/>
        <Route path='/Categories' element={<Categories/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Userdata' element={<Userdata/>}/>
      
      </Routes>
    </BrowserRouter>

   </>
  )
}

export default App
