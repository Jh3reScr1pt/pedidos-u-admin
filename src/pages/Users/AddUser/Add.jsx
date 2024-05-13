import React, { useState } from "react";
import "./Add.css";
import { assets, url } from "../../../assets/assets";
import axios from "axios";
import { toast } from "react-toastify";

const Add = () => {
  const [data, setData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
  });

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(`${url}/api/user/register`, {
        name: data.name,
        lastname: data.lastname,
        email: data.email,
        password: data.password,
      });
      if (response.data.success) {
        setData({
          name: "",
          lastname: "",
          email: "",
          password: "",
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error al enviar la solicitud:", error);
      toast.error(
        "Error al enviar la solicitud. Por favor, inténtalo de nuevo más tarde."
      );
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-user-name flex-col">
          <p>Nombre(s)</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Escribir aqui"
            required
          />
        </div>
        <div className="add-user-name flex-col">
          <p>Apellidos</p>
          <input
            name="lastname"
            onChange={onChangeHandler}
            value={data.lastname}
            type="text"
            placeholder="Escribir aqui"
            required
          />
        </div>
        <div className="add-user-name flex-col">
          <p>Email</p>
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            type="text"
            placeholder="Escribir aqui"
            required
          />
        </div>
        <div className="add-user-name flex-col">
          <p>Contraseña</p>
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            type="password"
            placeholder="Escribir aqui"
            required
          />
        </div>
        <button type="submit" className="add-btn">
          AGREGAR
        </button>
      </form>
    </div>
  );
};

export default Add;
