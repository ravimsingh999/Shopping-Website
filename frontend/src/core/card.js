import React,{useState} from 'react'
import {Link,Redirect}   from 'react-router-dom'
import ShowImage from './ShowImage'
import {addItem,removeItem} from './CartHelper'

const Card=({product, showAddToCartButton=true ,showREmoveproductButton=false })=>{

	const [redirect,setRedirect]=useState(false)


	const addToCart=()=>{
		addItem(product,()=>{
			setRedirect(true)

		})
	}
	const shouldRedirect=redirect=>{
		if(redirect)
		{
			return <Redirect to="/cart"  />
		}


	}

	const showAddToCart=showAddToCartButton=>{
		return (
			showAddToCartButton &&(
				<button onClick={addToCart}  className="btn btn-outline-warning">
							Add to cart
							</button>
				)

			)
	}

	const removefromcart=()=>{
		removeItem(product._id,()=>{
		window.location.reload(false);
		})
	}
	
	const showremovebutton=showREmoveproductButton=>{
		return (
			showREmoveproductButton &&(
				<button onClick={removefromcart}  className="btn btn-outline-warning">
						remove from cart
				</button>
				)

			)

	}
	return (
			
				<div className="card">
					<div className="card-header">
						{product.name}
					</div>
					{shouldRedirect(redirect)}
					<ShowImage  item={product}  />
					<div className="card-body">
						<p>{product.description}</p>
						<p>Price:${product.price}</p>
						<p>Stock:{product.quantity}</p>
						<p>Sold:{product.sold}</p>
						<Link to={`/product/${product._id}`}>
							<button  className="btn btn-outline-primary mr-4">
								View
							</button>
						</Link>
						{showAddToCart(showAddToCartButton)}
						{showremovebutton(showREmoveproductButton)}
					</div>
				</div>

		)

}

export default Card









