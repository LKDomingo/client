import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import OrderContext from '../context/OrderContext'

const DishCard = (props) => {
    const context = useContext(OrderContext);
    const history = useHistory();
    const { dish, dishId, setOrderItemFormDisplay, setDisplayOnId} = props;

    let button = {
        backgroundImage: 'linear-gradient(to right, #09F30F, #6ce914)',
        border: '1px solid #999999',
        borderRadius: '20px',
        width: '120px',
        height: '40px',
        margin: 'auto',
        padding: '5px'
    }

    return (
        <>
            <div className="card mb-1" style={{ width: '18rem', overflow: 'hidden', backgroundColor: '#f7f7f7' }}>
                <div className="card-body">
                    <div className='d-flex justify-content-center align-items-center px-3' style={{ overflow: 'hidden', height: '192px' }}><img style={{ height: '190px' }} src={dish.image} alt={dish.name} /></div>
                    <div className='d-flex justify-content-between align-items-center mt-3'>
                        <h5 className="card-title">{dish.name}</h5>
                        <h6 style={{ color: 'gray' }}>${dish.price}</h6>
                    </div>
                    <p className="card-text" style={{ height: '6rem', overflow: 'hidden' }}>{dish.description}</p>
                    {
                        context.order.name? 
                        <div onClick={() => {setOrderItemFormDisplay('d-block'); setDisplayOnId(dishId)} } className='d-flex justify-content-center'><button className='btn btn-primary'>Add to cart</button></div>
                        : null
                    }
                    {/* get name to show up on cart  */}
                </div>
            </div>
        </>
    )
}

export default DishCard;