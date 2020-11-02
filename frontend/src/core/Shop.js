import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getCategories} from './apiCore'
import Card from  './card'
import Checkbox from './Checkbox'
//{JSON.stringify(categories)}
const Shop=()=>{
	const [categories,setCategories]=useState([])
	const [error,setError]=useState(false)

		const init=()=>{
		getCategories()
		.then(data=>{
			if(data.error){
				setError(data.error)
			}else
			{
			setCategories(data)
			
			}
		})
		}

		useEffect(()=>{
			init()
		},[])

		const handelFilters=(filters,filterBy)=>{
			console.log('Shop',filters,filterBy)	

		}
	return (
		<Layout className="container" title="shop" description="Search and find books of your choice" >
			<div className="row">
				<div className="col-4">
				<h4>Filter BY categories</h4>
				<ul>
					<Checkbox categories={categories} handelFilters={filters=>handelFilters(filters,'category')} />
				</ul>
				</div>
				<div className="col-8">
						
				</div>
			</div>

		</Layout>
		)

}

export default Shop