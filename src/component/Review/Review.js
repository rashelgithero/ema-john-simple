/* eslint-disable no-undef */
import React, { useContext, useEffect, useState } from 'react';
import FakeData from '../../fakeData/product.json';
import ReviewItem from '../ReviewItem/ReviewItem'
import './Review.css'
import { getDataBaseCart, processOrder, removeFromDataBaseCart } from '../../utilities/dataBaseManager';
import Card from '../Card/Card';
import Shipment from '../Shipment/Shipment';
import { Link, useNavigate } from 'react-router-dom';
import { userContext } from '../../App';

const Review = () => {
    const navigate = useNavigate()
    const removeCart = (productKey) => {
        removeFromDataBaseCart(productKey);
        const newCart = cart.filter(pd => pd.key !== productKey)
        setCart(newCart);
    }
    const [cart, setCart] = useState([]);
    const [logInUser] = useContext(userContext)
    const handleProceedCheckout =() =>{
        setCart([]);
        processOrder();
        }
    useEffect(() => {
        const saveCart = getDataBaseCart();
        console.log(saveCart)
        const productKeys = Object.keys(saveCart);
        const productCart = productKeys.map(key => {
            const product = FakeData.find(pd => pd.key === key)
            product.quantity = saveCart[key];
            return product;
        })
        setCart(productCart);
    }, [])
     
    

    return (
        <div>
           
            
            <div className="shop-container">
                <div className="product-container">
                
                    {
                    cart.map((pd,i) => (
                        <div key={i}>
                            <ReviewItem  product ={pd} removeCart={removeCart}></ReviewItem>
                        </div>
                        )
                    ) 
                    }
                </div>   

                <div className="card-container">
                    <Card card={cart}>  
                    {logInUser.email ? 
                        <button onClick={() => navigate('/shipment')} className='link'>Proceed  CheckOut</button>
                        :
                        <button onClick={() => navigate('/login')} className='link'>Proceed CheckOut</button>
                    } 
                    </Card>
                </div>
            
            </div>
        </div>
    )
}
export default Review;