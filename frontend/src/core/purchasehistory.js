import React ,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {listOrders} from './apiCore'
//{JSON.stringify(Orders)}

const PurchaseHistory=()=>{
	const [Orders,setOrders]=useState([])

	const {user,token}=isAuthenticated()
	const loadOrders=()=>
	{
		listOrders(user._id,token)
		.then(data=>{
			if(!data)
			{
				console.log("error")
			}
			else
			{
				setOrders(data)
			}
		})

		
	}
	useEffect(()=>{
		loadOrders()
			},[])

	
	return (
		<Layout title="Orders"  description="My Orders" className="container">
				{
					Orders.map((o,i)=>{
						const Orderid=o.user._id
						if(Orderid===user._id)
						{
							return (
							<div className="mt-5" key={i} style={{"borderBottom":"5px solid black"}}>
								<h5 className="mb-5">
								<span className="bg-primary">
								Order Id:{o._id}
								</span>
								</h5>
								<ul className="list-group mb-2">
									<li className="list-group-item">
										OrderStatus:{o.status}
									</li>
									<li className="list-group-item">
										Payment:"Cash On Delivery"
									</li>
									<li className="list-group-item">
										Address:{o.address}
									</li>
									<li className="list-group-item">
										Contact:{o.contact}
									</li>
									<li className="list-group-item">
										Prodcut:{o.products.map((name, index) => {
											return (
                                                  <li>{name.name}</li>
											)
										})}
									</li>
									<li className="list-group-item">
										Prodcut Price:{o.products.map((name, index) => {
											return (
                                                  <li>{name.price}</li>
											)
										})}
									</li>
									<li className="list-group-item">
										Order Date:{o.createdAt}
									</li>
								</ul>
								
							</div>
						)
						}
					})
				}
			
		</Layout>
		)
}


export default PurchaseHistory













