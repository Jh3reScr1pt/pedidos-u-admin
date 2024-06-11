import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'

import Add from './pages/Items/Add/Add'
import List from './pages/Items/List/List'
import Orders from './pages/Items/Orders/Orders'

import AddCategory from './pages/Categories/Add/Add'
import ListCategory from './pages/Categories/List/List'

import AddUser from './pages/Users/AddUser/Add'
import ListUser from './pages/Users/ListUser/List'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <div className='app'>
      <ToastContainer/>
      <Navbar/>
      <hr />
      <div className="app-content">
        <Sidebar/>
        <Routes>
          <Route path="/add" element={<Add/>}/>
          <Route path="/list" element={<List/>}/>
          
          <Route path="/orders" element={<Orders/>}/>
          
          <Route path="/addCategory" element={<AddCategory/>}/>
          <Route path="/listCategory" element={<ListCategory/>}/>

          <Route path="/addUser" element={<AddUser/>}/>
          <Route path="/listUser" element={<ListUser/>}/>
        </Routes>
      </div>
    </div>
  )
}

export default App
