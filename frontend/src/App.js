import { useRef, useState, useEffect } from 'react';
import './App.css';
import Table from './Table';
import axios from 'axios';
import Update from './Update';
import Sell from './Sell';
import Message from './Message';

function App() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) { dd = '0' + dd } if (mm < 10) { mm = '0' + mm } today = dd + '/' + mm + '/' + yyyy;
  const [item, setItem] = useState({
    name: '',
    quantity: 0,
    date: today,
    price: 0
  })

  const [items, setItems] = useState([]);
  const [select, setSelect] = useState();
  const [message, setMessage] = useState();
  const [sell, setSell] = useState([]);
  // const [updated, setUpdated] = useState();

  const fetch = () => {
    // console.log("in");
    axios.get("http://localhost:9000")
      .then(res => setItems(res))
  }

  // const massage = (text,type) => {
  //   document.querySelector('.massage-cotainer').classList.remove('display_none');
  //   setMessage(text);
  //   document.querySelector('.massage-cotainer').classList.add('display_none');
  //   setTimeout(() => {
  //     document.querySelector('.massage-cotainer').classList.add('display_none');
  //   }, 3000)
  // }

  useEffect(() => {
    // console.log('in');
    fetch();
  }, [])

  const nameRef = useRef();
  const numberRef = useRef();
  const priceRef = useRef();

  const change = () => {
    setItem({ ...item, name: nameRef.current.value, quantity: parseInt(numberRef.current.value), price: priceRef.current.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(item);
    axios.post("http://localhost:9000", { data: item, msg: "ADD_ITEM" })
      .then((res) => {
        // const { msg } = res.data;
        fetch();
        nameRef.current.focus();
        numberRef.current.value = ''
        nameRef.current.value = ''
        priceRef.current.value = ''
      })
  }

  return (
    <div className="container">
      {/* <Massage text={message} /> */}
      <nav>
        <ul>
          <li onClick={() => {
            document.querySelector('.sell-page').classList.remove("display_none")
          }}>Sell</li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit}>
        <input required type="text" ref={nameRef} placeholder='Enter name of the product' onChange={change} />
        <input required type="number" ref={numberRef} placeholder='Quantity of the product' onChange={change} />
        <input required type="number" ref={priceRef} placeholder='Enter the perProduct Price' onChange={change} />
        <button type='submit'>Add</button>
      </form>
      <Table data={items.data} setSelect={setSelect} fetch={fetch} />
      <div className="update_page display_none">
        <Update select={select} setMessage={setMessage} fetch={fetch} />
      </div>
      <div className="notification wrong display_none">
        Hello
      </div>
      <div className="sell-page display_none">
        <Sell items={items} fetch={fetch} sell={sell} setSell={setSell} />
      </div>
    </div>
  );
}

export default App;
