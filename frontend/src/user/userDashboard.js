import React from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
const Dashboard =()=>
{
	const {user:{_id,name,email,role,address,contact}}=isAuthenticated()

	const userLinks=()=>{
		return (
			<div className="card">
				<h4 className="card-header">Important</h4>
				<ul className="list-group">
					<li className="list-group-item">
						<Link className="nav-link" to="/cart">
							My cart
						</Link>
					</li>
					<li className="list-group-item">
						<Link className="nav-link" to="/purchasehistory">
							My Orders
						</Link>
					</li>
				</ul>
			</div>
			)
	}

	const userInfo=()=>{
		return (
			<div className="card md-5">
				<h3 className="card-header">My Profile</h3>
				<ul className="list-group">
					<li className="list-group-item">
					{name}
					</li>
					<li className="list-group-item">
					{email}
					</li>
					<li className="list-group-item">
					{address}
					</li>
					<li className="list-group-item">
					{contact}
					</li>
					<li className="list-group-item">
					{role===1 ?'Admin' :"Registred User"}
					</li>
				</ul>
			</div>
			)

	}



	return (
		<Layout title="Dashboard"  description=" Good Day" className="container">
			<div className="row">
				<div className="col-md-3">
				{userLinks()}
				</div>
				<div className="col-md-9">
				{userInfo()}
				</div>
			</div>
			
		</Layout>
		)
}

export default Dashboard





