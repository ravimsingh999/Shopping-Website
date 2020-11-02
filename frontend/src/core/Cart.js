import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCart,removeItem} from  './CartHelper'
import Card from  './card'
import Checkout from './Checkout'

const Cart=()=>{
	const [items,setItems]=useState([])


	useEffect(()=>{
		setItems(getCart())

	},[])

	const showItems=items=>{
		return (
			<div>
			{items.map((product,i)=>(<Card key={i} product={product} showAddToCartButton={false} showREmoveproductButton={true} />))}
			</div>
			)
	}

	const noItemsMessage=()=>
	(
		<h2>Your cart is empty</h2>
	)
	return (
		<Layout className="container" title="Shopping Cart" description="Manage your cart" >
		<div className="row">
			<div className="col-6 mb-3">
					{items.length>0 ? showItems(items) : noItemsMessage()}

			</div>
			<div className="col-6">
				<h5 className="mb-4">
					Your cart summary
				</h5>
				<hr/>
				<Checkout  products={items}/>
			</div>
		</div>
		</Layout>
		)


}




export default Cart