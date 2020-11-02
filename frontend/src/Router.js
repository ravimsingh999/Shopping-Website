import React from  'react'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import signup from './user/Signup'
import singin from './user/Signin'
import home from './core/Home'
import Menu from './core/menu/Menu'
import PrivateRoute from './auth/PrivateRoutes'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/userDashboard'
import AdminDashboard from './user/AdminDashboard'
import ADDCategory from './admin/ADDCategory'
import ADDProduct from './admin/ADDProduct'
import Shop from './core/Shop'
import Product from './core/Product'
import Cart from './core/Cart'
import Orders from './admin/Orders'
import PurchaseHistory from './core/purchasehistory'
import ManageOrders from './admin/ManageOrders'



const Routes=()=>{
	return (
		<BrowserRouter>
			<Menu/>
			<Switch>
				<Route path="/" exact component={home}/>
				<Route path="/shop" exact component={Shop}/>
				<Route path="/signup" exact component={signup}/>
				<Route path="/singin" exact component={singin}/>
				<PrivateRoute  path="/dashboard" exact component={Dashboard} />
				<PrivateRoute  path="/purchasehistory" exact component={PurchaseHistory} />
				<AdminRoute  path="/admin/dashboard" exact component={AdminDashboard} />
				<AdminRoute  path="/create/category" exact component={ADDCategory} />
				<AdminRoute  path="/admin/orders" exact component={Orders} />
				<AdminRoute  path="/create/product" exact component={ADDProduct} />
				<AdminRoute  path="/managerorder" exact component={ManageOrders} />
				<Route path="/product/:productId" exact component={Product}/>
				<Route path="/cart" exact component={Cart}/>
			</Switch>
		</BrowserRouter>
		)
}


export default Routes;