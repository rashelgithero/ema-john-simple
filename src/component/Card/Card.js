import React from 'react';

const Card = (props) => {
    const card = props.card;
    const total = card.reduce((total,   prd) =>(total + prd.price),0
    )
    let shipping = 12.99;
    if(total > 350 || total < 50){
        shipping = 0;
    }
    else if(total > 100){
        shipping = 5.99;
    }
    const tax = total / 10;
    const grandTotal = (total + shipping + Number(tax)
    );
    const formalNumber = (num) =>{
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
            <h4>Order Summary</h4>
            <p>Items Ordered: {card.length} </p>
            <p><small>Product Price:{formalNumber(total)} </small></p>
            <p><small>Shipping Cost: {shipping} </small></p>
            <p><small>Tax + Vat : {formalNumber(tax)} </small></p>
            <p style={{BorderTop: '1px solid grey'}}>total price : {formalNumber(grandTotal)} </p>
        </div>
    );
};

export default Card;