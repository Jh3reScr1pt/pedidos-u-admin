import React, { useEffect, useState } from 'react';
import './List.css';
import { url } from '../../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchList = async (endpoint, message) => {
    const response = await axios.get(`${url}/api/category/${endpoint}`);
    if (response.data.success) {
      setList(response.data.data);
      toast.success(message);
    } else {
      toast.error("Error");
    }
  };

  const fetchAllCategories = () => fetchList('list', "Todas las Categorias listadas");
  const fetchActiveCategories = () => fetchList('activelist', "Categorias activas listadas");
  const fetchInactiveCategories = () => fetchList('inactivelist', "Categorias inactivas listadas");

  const updateCategoryState = async (categoryId, newState) => {
    const endpoint = newState ? 'recover' : 'delete';
    const response = await axios.put(`${url}/api/category/${endpoint}`, { id: categoryId });
    if (response.data.success) {
      toast.success(response.data.message);
      if (filter === 'all') {
        fetchAllCategories();
      } else if (filter === 'active') {
        fetchActiveCategories();
      } else {
        fetchInactiveCategories();
      }
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      fetchAllCategories();
    } else if (filter === 'active') {
      fetchActiveCategories();
    } else {
      fetchInactiveCategories();
    }
  }, [filter]);

  return (
    <div className='list add flex-col'>
      <h1>Lista de las Categorias</h1>
      <div className='filter-buttons'>
        <button className='btn-blue' onClick={() => setFilter('all')}>Todas</button>
        <button className='btn-green' onClick={() => setFilter('active')}>Activas</button>
        <button className='btn-red' onClick={() => setFilter('inactive')}>Inactivas</button>
      </div>
      <div className='list-table'>
        <div className="list-table-format-Category title">
          <b>Imagen</b>
          <b>Nombre</b>
          <b>Estado</b>
          <b>Acción</b>
        </div>
        {list.map((category, index) => (
          <div key={index} className='list-table-format-Category'>
            <img src={`${url}/images/` + category.image} alt="" />
            <p>{category.name}</p>
            <p className={`status ${category.state ? 'active' : 'inactive'}`}>
              {category.state ? 'Activo' : 'Inactivo'}
            </p>
            <p className='cursor' onClick={() => updateCategoryState(category._id, !category.state)}>
              {category.state ? 'x' : '✓'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
