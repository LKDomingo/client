import React, { useEffect, useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import OrderContext from '../context/OrderContext'


const NavBar = () => {
    const context = useContext(OrderContext);

    const [cartValue, setCartValue] = useState("0");

    const deleteOrder = () => {
        
    }

    return (
        <>
            <nav className='navbar sticky-top p-2 d-flex justify-content-between align-items-center' style={{ backgroundImage: 'linear-gradient(to right, #09F30F, #a1e517)', boxShadow: '0px 1px 5px', borderTop: '3px solid black' }}>
                <h4><Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}>DojoDiner</Link></h4>
                <ul className='d-flex justify-content-between' style={{ textDecoration: 'none', listStyle: 'none', color: 'white' }}>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}><li className="px-2">Home</li></Link>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}><li className="px-2">About Us</li></Link>
                    <div onClick={()=>{context.setOrder({})}}>
                        <Link to={'/menu'} style={{ textDecoration: 'none', color: 'black' }}><li className="px-2">Menu</li></Link>
                    </div>
                    <Link to={'/'} style={{ textDecoration: 'none', color: 'black' }}><li className="px-2">Contact</li></Link>
                </ul>
                    {
                        context.order.name?
                        <div>
                            <button onClick={ deleteOrder }  className="btn btn-danger me-3">Cancel Order</button>
                            <button className='btn btn-warning'>
                                <Link to={"/cart"}>Cart ({context.order.orderItem_ids.length})</Link>
                            </button>
                        </div>
                        :
                        <button className="btn btn-warning"><Link to={'/create/order'} style={{ textDecoration: 'none', color: 'black' }}>Create To-Go Order</Link></button> 
                        
                    }

                
                {/* <p className="px-2" style={{ borderRadius: '5px', color: 'black', textDecoration: 'underline' }}>Cart ({cartValue})</p> */}

            </nav>
        </>

    )
}

export default NavBar;