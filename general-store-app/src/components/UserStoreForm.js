
import React from 'react';
import { Fragment, useRef, useState, useEffect } from 'react';
import axios from 'axios';
import UserStoreItems from './UserStoreItems';
import { generalStoreAction } from '../store/generalStore-reducer';
import { useDispatch, useSelector } from 'react-redux';
import "./Card.css";

const UserStoreForm = () => {
  const [storeItems, setStoreItems] = useState([]);
  const [isEditId, setIsEditId] = useState(null);
  const [sellerTotalPrice, setSellerTotalPrice] = useState(0);
  //const [totalPrice,setTotalPrice]=useState(0)

  const dispatch = useDispatch();
  const storeArr = useSelector((state) => state.generalStoreItems.items);
  //console.log("STORE ARR",storeArr)





  const enteredItemNameRef = useRef();
  const enteredPriceRef = useRef();

  let totalPrice = 0

  useEffect(() => {
    if (storeItems.length > 0) {
      totalPrice = storeItems.reduce((prev, current) => {
        return prev + Number(current.price);
      }, 0);
      console.log("TOTAL PRICE", totalPrice)
      setSellerTotalPrice(totalPrice)


    }
  }, [storeItems, dispatch]);



  useEffect(() => {
    axios.get('http://localhost:2000/getStoreItems').then(arr => setStoreItems(arr.data))

  }, [])
  console.log("STORE ITEMS", storeItems);


  /*const buyOneButtonHandler = (data) => {
    console.log("QUANTITY", data.quantity)
    const updatedQuantity = data.quantity - 1
    console.log("QUA", updatedQuantity);

    const updatedObj = {
      quantity: updatedQuantity

    }

    axios.post(`http://localhost:2000/decreasing-quantity/${data.id}`, updatedObj).then(arr => setStoreItems(arr.data));


  }

  const buyTwoButtonHandler = (data) => {
    console.log("QUANTITY", data.quantity)
    const updatedQuantity = data.quantity - 2
    console.log("QUA", updatedQuantity);

    const updatedObj = {
      quantity: updatedQuantity

    }

    axios.post(`http://localhost:2000/decreasing-quantity/${data.id}`, updatedObj).then(arr => setStoreItems(arr.data));


  }

  const buyThreeButtonHandler = (data) => {
    console.log("QUANTITY", data.quantity)
    const updatedQuantity = data.quantity - 3
    console.log("QUA", updatedQuantity);

    const updatedObj = {
      quantity: updatedQuantity

    }

    axios.post(`http://localhost:2000/decreasing-quantity/${data.id}`, updatedObj).then(arr => setStoreItems(arr.data));


  }
  */

  const editButtonHandler = (data) => {
    console.log("DATA", data)
    dispatch(generalStoreAction.edditingStoreItems(data.id));

    enteredItemNameRef.current.value = data.itemName;
    enteredPriceRef.current.value = data.price;



    setIsEditId(data.id);
  };





  const deleteHandler = (id) => {
    axios.delete(`http://localhost:2000/deleteUser/${id}`).then(arr => setStoreItems(arr.data))
  }



  const addStoreItemsHandler = (event) => {
    event.preventDefault();


    const enteredItemName = enteredItemNameRef.current.value;
    const enteredPrice = enteredPriceRef.current.value;






    const storeObj = {
      itemName: enteredItemName,
      price: enteredPrice,
    };

    if (
      enteredItemName.trim().length === 0 ||
      enteredPrice.trim().length === 0

    ) {
      alert("Fill all inputs before submit");
    } else {
      if (isEditId === null) {
        console.log("post");
        const resData = (res) => {
          const storeObjWithId = { ...storeObj, Id: res.data.ItemName };
          dispatch(generalStoreAction.addingNewStoreItems(storeObjWithId));
        };

        axios.post('http://localhost:2000/addStoreItems', storeObj).then(arr => setStoreItems(arr.data));



      } else {
        const resEditData = (data) => {
          console.log(data, "put data");
          dispatch(generalStoreAction.addingNewStoreItems(data.data));
          setIsEditId(null);
        };

        axios.post(`http://localhost:2000/editStoreItems/${isEditId}`, storeObj).then(arr => setStoreItems(arr.data));




      }
    }


    enteredItemNameRef.current.value = "";
    enteredPriceRef.current.value = "";


  };


  return (
    <Fragment>
      <div className='bg-container'>
        <form>
          <h1>Seller's Admin Page</h1>
          <label htmlFor="name">Product name</label>
          <input ref={enteredItemNameRef} type="text" id="name"></input>



          <label htmlFor="price">Selling Price</label>
          <input ref={enteredPriceRef} type="number" id="price"></input>


          <button onClick={addStoreItemsHandler}>Submit</button>
        </form>


      </div>

      <section className='bg-container'>
        <h1>Your Products</h1>
        {storeItems.length > 0 && storeItems.map((obj) => {
          return (<UserStoreItems
            key={Math.random()}
            items={obj}
            deleteButtonClicked={deleteHandler}
            editButtonClicked={editButtonHandler}



          />)
        })}
        <div>
          <h1>total value worth of products:{sellerTotalPrice}</h1>
        </div>

      </section>

    </Fragment>
  )
}

export default UserStoreForm;