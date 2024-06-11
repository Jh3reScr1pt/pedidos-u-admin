import React, { useEffect, useState } from 'react'
import './List.css'
import { url } from '../../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {

  const [list,setList] = useState([]);
  
  const fetchList = async () => {
    const response = await axios.get(`${url}/api/user/list`)
    if(response.data.success)
    {
      setList(response.data.data);
    }
    else{
      toast.error("Error")
    }
  }

  

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
        <h1>Lista de las Usuarios</h1>
        <div className='list-table'>
          <div className="list-table-format-user title">
            <b>Nombre (s)</b>
            <b>Apellidos</b>
            <b>Correo Institucional</b>
          </div>
          {list.map((user,index)=>{
            return (
              <div key={index} className='list-table-format-user'>
                <p>{user.name}</p>
                <p>{user.lastname}</p>
                <p>{user.email}</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List
