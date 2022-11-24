import axios from 'axios';
import React, { useRef } from 'react'
import { HiOutlineX } from 'react-icons/hi';

function Update({ select, popUp, fetch }) {
    const name = useRef();
    const number = useRef();
    const price = useRef();

    const toggle = (e) => {
        // e.preventDefault();
        document.querySelector('.update_page').classList.add("display_none")
    }

    return (
        <form className="update_container">
            <div className="icon" onClick={toggle}>
                <HiOutlineX />
            </div>
            <div>
                <label htmlFor="name">Product</label>
                <input type="text" ref={name} id='name' placeholder='Enter new Product Name' />
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input id='price' min="0" ref={price} type="number" placeholder='Enter New Price' />
            </div>
            <div>
                <label htmlFor="number">Quantity</label>
                <input id='number' min="0" ref={number} type="number" placeholder='Enter new qunatity of product' />
            </div>
            <button type='submit' id='update_btn' onClick={(e) => {
                e.preventDefault();
                const data = {
                    id: select,
                    name: document.querySelector('#name').value,
                    quantity: document.querySelector('#number').value,
                    price: document.querySelector('#price').value
                }
                axios.post("http://localhost:9000", { msg: "UPDATE", data })
                    .then(res => {
                        fetch();
                        popUp(res.data.message, 'success')
                        toggle();
                    })
            }}>Update</button>
        </form>
    )
}
export default Update;