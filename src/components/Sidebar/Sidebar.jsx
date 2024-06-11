import React from 'react'
import  './Sidebar.css'
import { assets } from '../../assets/assets'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <div className="sidebar-options">
        <h3>Pedidos</h3>
        <NavLink to='/orders' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Órdenes</p>
        </NavLink>
        <h3>Items</h3>
        <NavLink to='/add' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Agregar</p>
        </NavLink>
        <NavLink to='/list' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Lista</p>
        </NavLink>

        <h3>Categorias</h3>
        <NavLink to='/addCategory' className="sidebar-option">
            <img src={assets.add_icon} alt="" />
            <p>Agregar</p>
        </NavLink>
        <NavLink to='/listCategory' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Lista</p>
        </NavLink>

        <h3>Usuarios</h3>
        <NavLink to='/listUser' className="sidebar-option">
            <img src={assets.order_icon} alt="" />
            <p>Lista</p>
        </NavLink>
      </div>
    </div>
  )
}

export default Sidebar
