import React, { useState } from 'react'
import './Add.css'
import { assets,url } from '../../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {

    const [data, setData] = useState({
        name: ""
    });

    const [image, setImage] = useState(false);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/category/add`, formData);
        if (response.data.success) {
            setData({
                name: ""
            })
            setImage(false);
            toast.success(response.data.message)
        }
        else{
            toast.error(response.data.message)
        }
    }

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }))
    }

    return (
        <div className='add'>
        <h1>Crear Categoría</h1>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Subir imagen</p>
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Nombre de la Categoría</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Escribir aqui' required />
                </div>
                <button type='submit' className='add-btn' >AGREGAR</button>
            </form>
        </div>
    )
}

export default Add
