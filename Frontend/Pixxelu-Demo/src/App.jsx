import React from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Products from './assets/Components/Products'
import Home from './assets/Components/Home'
import Navbar from './assets/Components/Navbar'
import Blog from './assets/Components/Blog'
import Admin from './assets/Components/Admin'
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
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Userdata' element={<Userdata/>}/>
        <Route path='/Admin' element={<Admin/>}/>
      
      </Routes>
    </BrowserRouter>

   </>
  )
}

export default App
