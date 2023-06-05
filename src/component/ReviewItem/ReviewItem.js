import React from 'react';
import './ReviewItem.css'

const ReviewItem = (props) => {
    const reviewStyle = {
            marginLeft: '200px',
            paddingBottom: '5px',
            marginBottom: '5px',
            borderBottom: '1px solid lightgrey'
        }
    const {name,quantity, key, price} = props.product;

    return (
        <div>
            <div style={reviewStyle}>
            
            <h4>{name}</h4>
            <p>Quantity: {quantity} </p>
            <p>Price: {price}</p>
            <br />
            <button className='removeBtn' onClick={() =>props.removeCart(key)}>Remove</button>
            
        </div>
    </div>
    );
};

export default ReviewItem;