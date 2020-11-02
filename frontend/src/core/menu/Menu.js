import React,{Fragment} from 'react'
import {Link,withRouter,Redirect} from 'react-router-dom'
import {signout,isAuthenticated} from '../../auth'
import {book } from './book.png'
import './book.css'
import {itemTotal} from '../CartHelper'
const Menu=()=>{
//Link is used so that page is not reloaded just render the data

/*




*/
return (
	<div >
		<ul className="nav nav-tabs bg-primary">
			<li className="nav-item">
				<Link className="nav-link" style={{color:'white'}} to="/">
					<img id="logo" src={require('./book.png')}></img>
				</Link>
			</li>

			

			<li className="nav-item">
				<Link className="nav-link" style={{color:'white'}} to="/cart">
					Cart 
					<sup>
						<small className="cart-badge">
							{itemTotal()}
						</small>
					</sup>
				</Link>
			</li>

			
			
			{isAuthenticated()  && isAuthenticated().user.role===0 && (
					<li className="nav-item">
				<Link className="nav-link" style={{color:'white'}} to="/dashboard">
					My Dashboard
				</Link>
			</li>

				)}

				{isAuthenticated()  && isAuthenticated().user.role===1 && (
					<li className="nav-item">
				<Link className="nav-link" style={{color:'white'}} to="/admin/dashboard">
					My Dashboard
				</Link>
			</li>

				)}
			
			
			
		
			{!isAuthenticated() && (
				<Fragment>
				<li className="nav-item">
					<Link className="nav-link" style={{color:'white'}} to="/singin">SignIn</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link" style={{color:'white'}} to="/signup">SignUp</Link>
				</li>
				</Fragment>
				)}



				{isAuthenticated() && (
				<div>
				<li className="nav-item">
							<Link className="nav-link" style={{cursor:'pointer',color:'white'}} onClick={()=>signout(()=>{
					return <Redirect to='/'  />
						})}>
						Signout</Link>
							</li>
				</div>
				)}
			
		</ul>
	</div>

	)
	
}


export default Menu