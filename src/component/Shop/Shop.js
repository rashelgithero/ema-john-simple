import React, { useEffect, useState } from 'react';
import{} from 'react-router-dom'
import fakeData from '../../fakeData/product.json';
import './Shop.css';
import Product from '../Product/Product';
import Card from '../Card/Card';
import {addToDataBaseCart, getDataBaseCart} from '../../utilities/dataBaseManager';
import { Link } from 'react-router-dom';



const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products] = useState(first10);
    const [card, setCard] = useState([]);
    const handleAddProduct = (product) => {
        const sameProduct = card.find(pd => pd.key === product.key);
        let count = 1;
        let newCart;
            if (sameProduct ) {
                count = sameProduct.quantity + 1;
                sameProduct.quantity = count;
                const others = card.filter(pd => pd.key !== product.key);
                newCart = [...others, sameProduct]
            }
            else{
                product.quantity = 1;
                newCart = [ ...card, product];
            }
        setCard(newCart);
        addToDataBaseCart(product.key, count)
    }

    
    useEffect(()=> {
        const storeCart = getDataBaseCart();
        console.log(storeCart);
        const productKey = Object.keys(storeCart);
        const productCart = productKey.map(key => {
            const product = fakeData.find(pd => pd.key === key);
            product.quantity = storeCart[key];
            return product;
        })
        setCard(productCart);
    },[])
    return (
        <div>
            
            <div className="shop-container">
            
                <div className="product-container">
                
                    {
                        products.map((pd,i) => (
                            <div key={i}>
                                <Product 
                                handleAddProduct ={handleAddProduct}
                                product={pd}></Product>
                            </div>
                            )
                        ) 
                    }
                
                </div>

                <div className="card-container">
                    <Card card={card}>
                        <Link to="/review"> 
                            <button className='link'>Review Order</button>
                        </Link>
                    </Card>
                </div>
            </div>
        </div>
        
        
    )
    
}

export default Shop;