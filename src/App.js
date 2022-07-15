import { useState, useEffect } from 'react'
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";

import NavBar from "./components/NavBar";
import Menu from "./components/Menu";
import OrderItemForm from "./components/OrderItemForm";
import OrderForm from './components/OrderForm';
import OrderContext from './context/OrderContext'
import Cart from './components/Cart';



function App() {
	const [order, setOrder] = useState({});

	const [orderItemFormDisplay, setOrderItemFormDisplay] = useState('d-none');
	const [displayOnId, setDisplayOnId] = useState('');
	const [toggleComponent, setToggleComponent] = useState('');


	const handleToggleDisplayOff = () => {
		setOrderItemFormDisplay('d-none');
	}

	return (
		<BrowserRouter>
			<div className="App">
				<OrderContext.Provider value={{ order, setOrder }}>
					<NavBar />
					<div className="container" style={{ backgroundColor: 'white', minHeight: '800px', boxShadow: '0px 2px 4px' }}>
						<Switch>
							<Route exact path="/">
								<h1>Welcome to the Restaurant Website</h1>
							</Route>
							<Route exact path="/menu">
								<OrderItemForm setOrderItemFormDisplay={setOrderItemFormDisplay} orderItemFormDisplay={orderItemFormDisplay} displayOnId={displayOnId} />
								<Menu setOrderItemFormDisplay={setOrderItemFormDisplay} setDisplayOnId={setDisplayOnId} />
							</Route>
							<Route exact path="/create/order">
								<OrderForm />
							</Route>
							<Route exact path="/cart">
								<Cart />
							</Route>
						</Switch>
					</div>
				</OrderContext.Provider>
			</div>
		</BrowserRouter >
	);
}

export default App;



