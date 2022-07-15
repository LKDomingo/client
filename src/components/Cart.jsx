import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrderContext from '../context/OrderContext'

const Cart = () => {
    const context = useContext(OrderContext);
    const [dishList, setDishList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/orderItems/order/${context.order._id}`)
            .then(res => {
                console.log(res);
                setDishList(res.data.results)
            })
            .catch(err => {
                console.log("error: ", err);
            })
    }, [])

    return (
        <>
            <h3 className="text-center py-3">Cart</h3>
            <div>
                {
                    dishList.map((orderItemObj, idx) => {
                        return (
                            <div key={idx}>
                                <h5>{orderItemObj.dishName}</h5>
                                <p>{orderItemObj.protein}</p>
                            </div>
                        )
                    })
                }
            </div>
        </>
    )
}

export default Cart;