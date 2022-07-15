import React, { useEffect, useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import OrderContext from '../context/OrderContext'

const OrderForm = () => {
    const context = useContext(OrderContext);
    const history = useHistory();
    const [formInfo, setFormInfo] = useState({
        name: "",
        phoneNumber: ""
    })
    const [errors, setErrors] = useState({});

    const changeHandler = (e) => {
            setFormInfo({
                ...formInfo,
                [e.target.name]: e.target.value
            })
        }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/orders', formInfo)
            .then(res=>{
                    console.log(res.data.results);
                    if(res.data.error) {
                        setErrors(res.data.error.errors)
                    } else {
                        context.setOrder(res.data.results)
                        history.push('/menu')
                    }
                    
                })
                .catch(err=>{
                    console.log("error: ", err);
                })

    }

    return (
        <>
            <div className="px-1">
                <h3 className="text-center py-3">To-Go Order</h3>
                <form onSubmit={ submitHandler } className='d-flex flex-column justify-content-center align-items-center'>
                    <div style={{ width: '400px' }}>
                        <div className="form-group">
                            <label htmlFor="name">Name on Order</label>
                            <input onChange={ changeHandler } type="text" name="name" className="form-control mt-1" placeholder="Enter name" value={formInfo.name} />
                            <small className='text-danger'>{errors.name?.message}</small>
                        </div>
                        <div className="form-group mt-3">
                            <label htmlFor="phoneNumber">Phone Number</label>
                            <input onChange={ changeHandler } type="text" name="phoneNumber" className="form-control mt-1" placeholder="Enter Phone Number" value={formInfo.phoneNumber} />
                            {errors.phoneNumber?
                                <div><small className='text-danger'>{errors.phoneNumber?.message}</small><br />
                                <small className='text-danger'> ex. 555-555-5555</small>
                                </div> :
                                <small className="form-text text-muted">ex. 555-555-5555</small> 
                            }
                        </div>
                        <div className='d-flex justify-content-end mt-3'><input className='btn btn-primary' type="submit" value="Start Order" /></div>
                    </div>

                </form>
            </div>
        </>

    )
}

export default OrderForm;