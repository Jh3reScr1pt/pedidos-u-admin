import React, { useEffect, useState } from 'react';
import './List.css';
import { url } from '../../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);
  const [filter, setFilter] = useState('all');

  const fetchList = async (endpoint, message) => {
    const response = await axios.get(`${url}/api/food/${endpoint}`);
    if (response.data.success) {
      setList(response.data.data);
      toast.success(message);
    } else {
      toast.error("Error");
    }
  };

  const fetchAllFoods = () => fetchList('list', "Todas las comidas listadas");
  const fetchActiveFoods = () => fetchList('activelist', "Comidas activas listadas");
  const fetchInactiveFoods = () => fetchList('inactivelist', "Comidas inactivas listadas");

  const updateFoodState = async (foodId, newState) => {
    const endpoint = newState ? 'recover' : 'delete';
    const response = await axios.put(`${url}/api/food/${endpoint}`, { id: foodId });
    if (response.data.success) {
      toast.success(response.data.message);
      if (filter === 'all') {
        fetchAllFoods();
      } else if (filter === 'active') {
        fetchActiveFoods();
      } else {
        fetchInactiveFoods();
      }
    } else {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllFoods();
  }, []);

  useEffect(() => {
    if (filter === 'all') {
      fetchAllFoods();
    } else if (filter === 'active') {
      fetchActiveFoods();
    } else {
      fetchInactiveFoods();
    }
  }, [filter]);

  return (
    <div className='list add flex-col'>
      <h1>Lista de las Comidas</h1>
      <div className='filter-buttons'>
        <button className='btn-blue' onClick={() => setFilter('all')}>Todas</button>
        <button className='btn-green' onClick={() => setFilter('active')}>Activas</button>
        <button className='btn-red' onClick={() => setFilter('inactive')}>Inactivas</button>
      </div>
      <div className='list-table'>
        <div className="list-table-format-Item title">
          <b>Imagen</b>
          <b>Nombre</b>
          <b>Categoría</b>
          <b>Precio</b>
          <b>Estado</b>
          <b>Acción</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format-Item'>
            <img src={`${url}/images/` + item.image} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>Bs {item.price}</p>
            <p className={`status ${item.state ? 'active' : 'inactive'}`}>
              {item.state ? 'Activo' : 'Inactivo'}
            </p>
            <p className='cursor' onClick={() => updateFoodState(item._id, !item.state)}>
              {item.state ? 'x' : '✓'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
