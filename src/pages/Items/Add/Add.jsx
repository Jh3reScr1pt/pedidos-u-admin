import React, { useState, useEffect } from 'react';
import './Add.css';
import { assets, url } from '../../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = () => {
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: ""
    });

    const [image, setImage] = useState(false);
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${url}/api/category/activelist`);
                if (response.data.success) {
                    setCategories(response.data.data);
                } else {
                    toast.error("Error al cargar las categorías");
                }
            } catch (error) {
                toast.error("Error de red al cargar las categorías");
            }
        };

        fetchCategories();
    }, []);

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);
        const response = await axios.post(`${url}/api/food/add`, formData);
        if (response.data.success) {
            setData({
                name: "",
                description: "",
                price: "",
                category: categories.length > 0 ? categories[0].name : ""
            });
            setImage(false);
            toast.success(response.data.message);
        } else {
            toast.error(response.data.message);
        }
    };

    const onChangeHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setData(data => ({ ...data, [name]: value }));
    };

    return (
        <div className='add'>
        <h1>Crear Item / Plato</h1>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className='add-img-upload flex-col'>
                    <p>Subir imagen</p>
                    <label htmlFor="image">
                        <img src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                    </label>
                    <input onChange={(e) => { setImage(e.target.files[0]) }} type="file" id="image" hidden required />
                </div>
                <div className='add-product-name flex-col'>
                    <p>Nombre</p>
                    <input name='name' onChange={onChangeHandler} value={data.name} type="text" placeholder='Escribe aquí' required />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Descripción</p>
                    <textarea name='description' onChange={onChangeHandler} value={data.description} type="text" rows={6} placeholder='Escribe el contenido aquí' required />
                </div>
                <div className='add-category-price'>
                    <div className='add-category flex-col'>
                        <p>Categoría</p>
                        <select name='category' onChange={onChangeHandler} value={data.category} required>
                            {categories.map((category) => (
                                <option key={category._id} value={category.name}>{category.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className='add-price flex-col'>
                        <p>Precio</p>
                        <input type="Number" name='price' onChange={onChangeHandler} value={data.price} placeholder='Bs 25' required />
                    </div>
                </div>
                <button type='submit' className='add-btn'>AGREGAR</button>
            </form>
        </div>
    );
};

export default Add;
