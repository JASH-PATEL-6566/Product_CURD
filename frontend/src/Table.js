// import axios from 'axios';
import React from 'react'
import { FaPencilAlt } from 'react-icons/fa'
import { MdDeleteOutline } from "react-icons/md"
import axios from "axios"


function Table({ data, setSelect, fetch }) {

    const toggle = (id) => {
        document.querySelector('.update_page').classList.remove("display_none");

        axios.post("http://localhost:9000", { msg: "UPDATE_BOX", id })
            .then(data => {
                // console.log(data);
                document.querySelector("#name").value = data.data.name;
                document.querySelector("#number").value = data.data.quantity;
                document.querySelector("#price").value = data.data.price;
            })
    }

    const tdData = () => {
        const column = ["name", "quantity", "price", "date"]
        return data.map((data) => {
            return (
                <tr key={data._id}>
                    {
                        column.map((v) => {
                            return <td>{data[v]}</td>
                        })
                    }
                    <td className='icon_container' key={data._id}>
                        <div className="update" define={data._id} onClick={(e) => {
                            const id = e.currentTarget.getAttribute("define");
                            setSelect(id);
                            toggle(id);
                            document.querySelector("#name").focus();
                        }}   >
                            <FaPencilAlt />
                        </div>
                        <div className="delete" define={data._id} onClick={(e) => {
                            const id = e.currentTarget.getAttribute("define");
                            setSelect(id);
                            const ans = window.confirm("Confirm , You want to delete this data.")
                            if (ans) {
                                axios.post("http://localhost:9000", { msg: "DELETE", id })
                                    .then(res => {
                                        fetch();
                                    })
                            }
                        }}>
                            <MdDeleteOutline className='delete' define={data._id} />
                        </div>
                    </td>
                </tr >
            )
        })
    }
    return (
        <div className="table-container">
            {data && <table>
                <thead>
                    <tr>
                        <th className='th_name'>Product Name</th>
                        <th className='stock'>Stock</th>
                        <th className='price'>Price</th>
                        <th className='th_date'>Last Change</th>
                        <th className='th_'>Edit</th>
                    </tr>
                </thead>
                <tbody>
                    {data && tdData()}
                </tbody>
            </table>}
        </div >
    )
}

export default Table;