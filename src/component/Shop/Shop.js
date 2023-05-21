import React, { useState } from 'react';
import fakeData from '../../fakeData/product.json';
import './Shop.css';
import Product from '../Product/Product';
import Card from '../Card/Card';
const Shop = () => {
    const first10 = fakeData.slice(0, 10);
    const [products, setProduct] = useState(first10);
    const [card, setCard] = useState([]);
    const handleAddProduct = (pd) => {
        console.log('added the product', pd)
        const newCard = [...card, pd];
        setCard(newCard);
    }
    return (
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
                <Card card={card}></Card>
            </div>

        </div>
        
    )
    
}

export default Shop;