import { Fragment } from 'react';
import './UserStoreItems.css';
import Card from './Card';


const UserStoreItems = (prop) => {
    console.log("ITEMS", prop.items);
    return (
        <Fragment>


        <div className='expense-item'>

            <span>
                <h2>Product name:</h2>
                <h2 className='expense-item__price'>{prop.items.itemName}</h2>
            </span>




          



            <span>
                <h2>Price:</h2>
                <h2 className='expense-item__price'>{prop.items.price}</h2>
            </span>

           
            




            <button className='button button-delete-color' onClick={() => { prop.deleteButtonClicked(prop.items.id) }}>Delete Product</button>
        </div>

     

        </Fragment>







    )
}

export default UserStoreItems;