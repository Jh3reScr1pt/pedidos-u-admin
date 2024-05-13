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

  const removeFood = async (foodId) => {
    const response = await axios.post(`${url}/api/food/remove`,{
      id:foodId
    })
    await fetchList();
    if (response.data.success) {
      toast.success(response.data.message);
    }
    else {
      toast.error("Error")
    }
  }

  useEffect(()=>{
    fetchList();
  },[])

  return (
    <div className='list add flex-col'>
        <p>All Foods List</p>
        <div className='list-table'>
          <div className="list-table-format title">
            <b>Nombre (s)</b>
            <b>Apellidos</b>
            <b>Category</b>
            <b>Action</b>
          </div>
          {list.map((user,index)=>{
            return (
              <div key={index} className='list-table-format'>
                <p>{user.name}</p>
                <p>{user.lastname}</p>
                <p>{user.email}</p>
                <p className='cursor' onClick={()=>removeFood(user._id)}>x</p>
              </div>
            )
          })}
        </div>
    </div>
  )
}

export default List
