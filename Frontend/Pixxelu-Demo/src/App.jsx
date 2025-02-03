import React from 'react'
import {BrowserRouter, Routes,Route,useLocation} from 'react-router-dom'
import Products from './assets/Components/Products'
import Home from './assets/Components/Home'
import Navbar from './assets/Components/Navbar'
import Posts from './assets/Components/Posts'
import Admin from './assets/Components/Admin'
import Register from './assets/Components/Register'
import Login from './assets/Components/Login'
import Userdata from './assets/Components/Userdata'
import Update from './assets/Components/Update'
import Categories from './assets/Components/Categories'
import Dashboard from './assets/Components/Dashboard'
import Users from './assets/Components/Users'
import LogUser from './assets/Components/LogUser'

function App() {
//  const location=useLocation()
  return (
   <>
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/Categories' element={<Categories/>}/>
        <Route path='/Posts' element={<Posts/>}/>
        <Route path='/Register' element={<Register/>}/>
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Userdata' element={<Userdata/>}/>
        <Route path='/Admin' element={<Admin/>}/>
        <Route path='/Update' element={<Update/>}/>
        {/* <Route path='/AdminNav' element={<AdminNav/>}/> */}
        <Route path='/Dashboard' element={<Dashboard/>}/>
        <Route path='/Users' element={<Users/>}/>
        <Route path='/LogUser' element={<LogUser/>}/>

      </Routes>
    </BrowserRouter>


   </>
  )
}

export default App
