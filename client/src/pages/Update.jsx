import axios from 'axios';
import React from 'react'
import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

export const Update = () => {
    const [book, setBook] = useState({
        title: "",
        desc: "",
        cover: "",
        price: null,
    });

    const navigate = useNavigate()
    const location = useLocation()

    const bookId = location.pathname.split("/")[2];


    const handleClick = async e => {
        e.preventDefault();
        try{
            const result = await axios.put("http://localhost:8800/books/"+ bookId, book);
            console.log(result);
            navigate("/");
        }catch(err){
            console.log(err);
        }
    }

    const handleChange = (e) => {
        setBook(prev => ({ ...prev, [e.target.name]: e.target.value }))
    };
    console.log(book);
    return (
        <div className='form'>
            <h1>Update Book</h1>
            <input
                type="text"
                placeholder='title'
                onChange={handleChange}
                name='title'
            />
            <input 
                type="text" 
                placeholder='desc' 
                onChange={handleChange} 
                name='desc' 
            />
            <input 
                type="number" 
                placeholder='price' 
                onChange={handleChange}
                name='price' 
            />
            <input 
                type="text" 
                placeholder='cover' 
                onChange={handleChange} 
                name='cover' 
            />
            <button className='formButton' onClick={handleClick}>Update</button>
        </div>
    )
}
