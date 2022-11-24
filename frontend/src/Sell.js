import React, { useEffect, useState } from 'react'
import { HiOutlineX } from 'react-icons/hi';
import { FaPencilAlt } from 'react-icons/fa'
import { MdDeleteOutline } from "react-icons/md"
import axios from "axios"
import html2pdf from 'html2pdf.js';


function Sell({ items, fetch, sell, setSell }) {
    const [value, setValue] = useState("");
    const [quantity, setQuantity] = useState("");
    // const [select, setSelect] = useState("");
    const [cost, setCost] = useState(0);

    // console.log(sell);

    useEffect(() => {
        fetch();
    }, [])

    console.log(document.getElementById('sell_invoce'));

    const toggle = (e) => {
        setSell([]);
        setCost(0);
        document.querySelector('.sell-page').classList.add("display_none")
    }

    const open_update = (id) => {
        document.querySelector('.update_page').classList.remove("display_none");

        const item = sell.filter(item => item.id === id);

        document.querySelector("#name").value = item[0].name;
        document.querySelector("#number").value = item[0].quantity;
    }

    const onSearch = (searchTerm) => {
        setValue(searchTerm);
    }

    const onSubmit = (e) => {
        e.preventDefault();

        axios.post("http://localhost:9000", { msg: "SELL_CHECK", data: { name: value, quantity: quantity } })
            .then(res => {
                if (res.data.msg === "Valid data") {
                    console.log(res.data.price);
                    setSell([...sell, { name: value, quantity: quantity, id: res.data.id, price: res.data.price }])
                    setCost(cost + res.data.price)
                    setValue("");
                    setQuantity("");
                    document.querySelector(".sell_in_name").focus();
                }
                else {
                    setQuantity("");
                    document.querySelector(".sell_in").focus();
                }
            })
    }

    const sell_confirm = (e) => {
        e.preventDefault();
        html2pdf()
            .from(document.getElementById('sell_invoce'))
            .save();
        fetch();
        toggle();
        setSell([]);
    }

    const tdData = () => {
        const column = ["name", "quantity", "price"]

        return sell.map((data) => {
            // console.log(data);
            return (
                <tr key={data.id}>
                    {
                        column.map((v) => {
                            return <td>{data[v]}</td>
                        })
                    }
                    <td className='icon_container' key={data.id}>
                        <div className="update" define={data.id} onClick={(e) => {
                            const id = e.currentTarget.getAttribute("define");
                            // console.log(id);
                            // setSelect(id);
                            open_update(id);
                            document.querySelector("#name").focus();
                        }}   >
                            <FaPencilAlt />
                        </div>
                        <div className="delete" define={data.id}>
                            <MdDeleteOutline className='delete' define={data.id} />
                        </div>
                    </td>
                </tr >
            )
        })
    }


    return (
        <div className="sell-container">
            <div className="icon_sell" onClick={toggle}>
                <HiOutlineX />
            </div>
            <form className="form-container-sell" onSubmit={onSubmit}>
                <div>
                    <input type="text" autoComplete='off' className='sell_in_name' value={value} required id='search_name' placeholder='Search Item Here' onChange={(e) => {
                        setValue(e.target.value)
                    }} />
                    <div className="dropdown">
                        {items.data && items.data.filter(item => {
                            const searchTerm = value.toLowerCase();
                            const fullName = item.name.toLowerCase();
                            return searchTerm && fullName.startsWith(searchTerm) && fullName !== searchTerm;
                        })
                            .map((item) => (
                                <div onClick={() => onSearch(item.name)} key={item._id} className="dropdown-row">{item.name}</div>
                            ))}
                    </div>
                </div>
                <div className="sell_quan">
                    <input type="number" className='sell_in' value={quantity} required id='sell_quantity' min="0" placeholder='Number of Item' onChange={(e) => {
                        setQuantity(e.target.value);
                    }} />
                </div>
                <div className="sell_btn">
                    <button type='submit' className="add_to_bill_btn">Add To Bill</button>
                </div>
            </form>
            <div className="table_sell">
                <div className="sell_table_container">

                    <table id="sell_invoce">
                        <thead>
                            <tr>
                                <th className='th_name_sell'>Product Name</th>
                                <th className='th_stock_sell'>Quantity</th>
                                <th className='th_amount_sell'>Amount</th>
                                <th className=''>Edit</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sell && tdData()}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="footer">
                <div className="total_amount">
                    <h2>Total amount : <span className='total_cost'>{cost}</span> <span>/-</span></h2>
                </div>
                <button className='sell_confirm' onClick={sell_confirm}>Sell</button>
            </div>
        </div>
    )
}

export default Sell;