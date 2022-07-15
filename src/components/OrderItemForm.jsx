import React, { useEffect, useState, useContext } from 'react'
import axios from 'axios';

import OrderContext from '../context/OrderContext'

const OrderItemForm = (props) => {
    // context variable of the Order
    const context = useContext(OrderContext);
    //import props
    const { setOrderItemFormDisplay, orderItemFormDisplay, displayOnId } = props
    // state used to verify whether api data has been fetched
    const [isMounted, setIsMounted] = useState(false);
    // dish object information
    const [dishObj, setDishObj] = useState({});
    // information from form input saved here
    const [formInfo, setFormInfo] = useState({
        dishName: '',
        protein: 'chicken',
        spiceLevel: '0',
        quantity: '1',
        order_id: context.order._id
    })
    // state to store errors from api post request
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setIsMounted(false);
        if (orderItemFormDisplay === 'd-block') {
            axios.get(`http://localhost:8000/api/dishes/${displayOnId}`)
                .then(res => {
                    setDishObj(res.data.results)
                    setIsMounted(true);
                })
                .catch(err => {
                    console.log("error: ", err);
                })
        }
    }, [orderItemFormDisplay])

    const changeHandler = (e) => {
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    const submitHandler = (e) => {
        console.log('submitting...');
        e.preventDefault();
        axios.post(`http://localhost:8000/api/orderItems/`, formInfo)
            .then(res => {
                console.log(res);
                if (res.data.error) {
                    setErrors(res.data.error.errors);
                } else {
                    // if post is successful...
                    // add the new orderItem id to the order context var
                    context.setOrder({
                        ...context.order,
                        [context.order.orderItem_ids]: context.order.orderItem_ids.push(res.data.results._id)
                    })
                    // remove order item form component from view
                    setOrderItemFormDisplay('d-none');
                    console.log({orderItemFormDisplay});
                    // reset form info for next item
                    setFormInfo({
                        dishName: dishObj.name,
                        protein: 'chicken',
                        spiceLevel: '0',
                        quantity: '1',
                        order_id: context.order._id
                    });
                    // put request to update the order in the db
                    axios.put(`http://localhost:8000/api/orders/${context.order._id}`, context.order)
                        .then(res => {
                            console.log(res);
                        })
                        .catch(err => {
                            console.log("error: ", err);
                        })
                }
            })
            .catch(err => {
                console.log("error: ", err);
            })

    }
    return (
        <>
            {isMounted ?
                <div className={orderItemFormDisplay}>
                    <div className="fixed-top top-50 start-50 translate-middle p-3" style={{ width: '50%', border: '1px solid #d8d8d8', color: 'black', backgroundColor: '#F7F7F7', borderRadius: '5px', boxShadow: '1px 1px 4px' }}>
                        <form onSubmit={ submitHandler }>
                            <h5 className='text-center'>{dishObj.name} Order</h5>
                            <p className='text-center'>{dishObj.description}</p>
                            <label htmlFor="protein">Protein:</label>
                            <select className='form-control' name="protein" onChange={changeHandler} value={formInfo.protein}>
                                <option value="chicken" selected>Chicken</option>
                                <option value="beef">Beef</option>
                                <option value="shrimp">Shrimp</option>
                                <option value="tofu">Tofu</option>
                                <option value="combo">Combo</option>
                            </select>
                            {/* error message */}
                            <small className='text-danger'>{errors.protein?.message}</small><br></br>
                            <label htmlFor="spiceLevel">Spice Level:</label>
                            <input className='form-control' type="number" min="0" max="5" name="spiceLevel" onChange={changeHandler} value={formInfo.spiceLevel} />
                            <small>0 = No Spice,  5 = Very Hot</small><br></br>
                            <small className='text-danger'>{errors.spiceLevel?.message}</small><br></br>
                            <label htmlFor="quantity">Quantity:</label>
                            <input className='form-control' type="number" min="1" name="quantity" onChange={changeHandler} value={formInfo.quantity} />
                            <small className='text-danger'>{errors.quantity?.message}</small><br></br>
                            <input type="hidden" name="order_id" value={context.order._id} />
                            <input type="hidden" name="dishName" value={dishObj.name} />
                            <input type="submit" className='btn btn-sm btn-primary' value="Add to cart" />
                        </form>
                    </div>
                </div>
                : null
            }
        </>
    )
}

export default OrderItemForm;