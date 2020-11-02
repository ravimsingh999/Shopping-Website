import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {read} from  './apiCore'
import Card from  './card'
//{JSON.stringify(product)}
const Product=(props)=>{
	const [product,setProduct]=useState({})
	const [error,setError]=useState(false)

	const loadSingleProduct=productId=>{
		read(productId).then(data=>{
			if(data.error){
					setError(data.error)
			}else
			{
				setProduct(data)
				console.log(data)
			}


		})


	}

	useEffect(()=>{
		const productId=props.match.params.productId
		loadSingleProduct(productId)

	},[])
	return (
		<Layout className="container" title={product.name} description={product.description} >
			<div className="row">
			<div className="col-12">
				<Card product={product}/>
			</div>
			</div>
		</Layout>
		)
}



export default Product





