import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import OrderContext from '../context/OrderContext'

import DishCard from './DishCard';

const Menu = (props) => {
    const [isMounted, setIsMounted] = useState(false)
    const context = useContext(OrderContext);
    let { setOrderItemFormDisplay, setDisplayOnId } = props

    const [dishList, setDishList] = useState([]);

    useEffect(() => {
        setIsMounted(false);
        axios.get('http://localhost:8000/api/dishes')
            .then(res => {
                setDishList(res.data.results);
                setIsMounted(true);
            })
            .catch(err => {
                console.log("error: ", err);
            })
    }, [])
    /*
    -it will make them create an order- fill out info to make  a new order, will send post req and redirect to the page with the items to add to cart
    -in the menu page you will have info about the current order id
    submit the add to cart--> this will have information about the order item, also pass in info about crder id, and make a post request to backend to create a new order item, then once that item is created, it will query the order table to find the order based on the order id, and update the order
    -in the controlles part of the update you will also calc the price incresae from that order item to the total
    */

    return (
        <>
            {
            isMounted?
            <div className="px-1">
                
                <div className='d-flex justify-content-center align-items-start flex-wrap gap-3'>
                    {
                        dishList.map((dish, idx) => {
                            if (dish.type === 'appetizer') {
                                return (
                                    <DishCard setOrderItemFormDisplay={setOrderItemFormDisplay } dish={ dish } key={ dish._id } dishId={ dish._id } setDisplayOnId={ setDisplayOnId } />
                                )
                            }
                        }
                        )
                    }
                </div>
                <div className='mt-5' style={{ margin: '0 auto', width: '95%'}}>  
                    <hr />
                </div>
                <h3 className="text-center py-2 mt-4">Soups</h3>
                <div className='d-flex justify-content-center align-items-start flex-wrap gap-4'>
                    {
                        dishList.map((dish, idx) => {
                            if (dish.type === 'soup') {
                                return (
                                    <DishCard setOrderItemFormDisplay={setOrderItemFormDisplay } dish={ dish } key={ dish._id } dishId={ dish._id } setDisplayOnId={ setDisplayOnId } />
                                )
                            }
                        }
                        )
                    }
                </div>
                <div className='mt-5' style={{ margin: '0 auto', width: '95%'}}>
                    <hr />
                </div>
                <h3 className="text-center py-2">Main Dishes</h3>
                <div className='d-flex justify-content-center align-items-start flex-wrap gap-4'>
                    {
                        dishList.map((dish, idx) => {
                            if (dish.type === 'main') {
                                return (
                                    <DishCard setOrderItemFormDisplay={setOrderItemFormDisplay } dish={ dish } key={ dish._id } dishId={ dish._id } setDisplayOnId={ setDisplayOnId } />
                                )
                            }
                        }
                        )
                    }
                </div>
                <div className='mt-5' style={{ margin: '0 auto', width: '95%'}}>
                    <hr />
                </div>
                <h3 className="text-center py-2">Curries</h3>
                <div className='d-flex justify-content-center align-items-start flex-wrap gap-4'>
                    {
                        dishList.map((dish, idx) => {
                            if (dish.type === 'curry') {
                                return (
                                    <DishCard setOrderItemFormDisplay={setOrderItemFormDisplay } dish={ dish } key={ dish._id } dishId={ dish._id } setDisplayOnId={ setDisplayOnId } />
                                )
                            }
                        }
                        )
                    }
                </div>
            </div>
            : null
            }
        </>
    )
}


export default Menu;