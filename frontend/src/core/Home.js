import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts} from  './apiCore'
import Card from  './card'
import Search from './Search'

const Home=()=>{
	const [productsBysell,setProductsBysell]=useState([])
	const [error,setError]=useState(false)

	const loadproductsBysell=()=>
	{
		getProducts('sold')
		.then(data=>{
			if(!data)
			{
				setError("error in Home")
			}
			else
			{
				setProductsBysell(data)
				//console.log(productsBysell)
			}
		})
	}

		useEffect(()=>{
				loadproductsBysell()
			},[])


	return (
		<Layout className="container" title="Welcome to Dream reader" description="Nothing is pleasanter than exploring a library" >
				<Search />
			<h2 className="mb-4">Best Booksellers</h2>
			<div className="row">
			{productsBysell.map((product,i)=>(<div key={i} className="col-md-4 mb-3">
			<Card  product={product} />
				</div>
				))}
			</div>
		</Layout>
		)

}

export default Home














