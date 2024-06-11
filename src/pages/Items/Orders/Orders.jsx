import React, { useEffect, useState } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets, url_cs } from '../../../assets/assets';

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState({});

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url_cs}/api/Order/listOrders`);
      setOrders(response.data.reverse());
      console.log(response.data);
      toast.success("Órdenes Listadas");
    } catch (error) {
      toast.error("Error");
    }
  };

  const statusHandler = async (orderId, status) => {
    try {
      const response = await axios.post(`${url_cs}/api/Order/updateOrderStatus?id=${orderId}&status=${status}`);
      if (response.data.success) {
        await fetchAllOrders();
        toast.success("Estado Actualizado");
      } else {
        toast.error("Error updating order status");
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  const handleStatusChange = (event, orderId) => {
    const newStatus = event.target.value;
    setSelectedStatus(prevState => ({ ...prevState, [orderId]: newStatus }));
  };

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className='order-item-food'>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return item.name + " x " + item.quantity;
                  } else {
                    return item.name + " x " + item.quantity + ", ";
                  }
                })}
              </p>
              <p className='order-item-name'>{order.userEmail}</p>
              <div className='order-item-address'>
                <p>{order.ubicationUni}</p>
              </div>
            </div>
            <p>Items: {order.items.length}</p>
            <p>Bs {order.amount}</p>
            <select onChange={(e) => handleStatusChange(e, order.id)} value={selectedStatus[order.id] || order.status} name="" id="">
              <option value="Procesando Pedido">Procesando Pedido</option>
              <option value="En Curso de Entrega">En Curso de Entrega</option>
              <option value="Entregado">Entregado</option>
            </select>
            <button onClick={() => statusHandler(order.id, selectedStatus[order.id] || order.status)} className="update-status-button">ACTUALIZAR ESTADO</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Order;
