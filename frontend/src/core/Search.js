import React,{useState,useEffect} from 'react'
import {getCategories,list} from  './apiCore'
import Card from  './card'
//{JSON.stringify(results)}
//serach not woring check serach variable
//
const Search=()=>{
	const [data,setData]=useState({
		categories:[],
		category:'',
		search:'',
		results:[],
		searched:false
	})

	const {categories,category,search,results,searched}=data

	const loadCategories=()=>
	{
		getCategories().then(data=>{
			if(!data)
			{
				console.log("error")
			}
			else
			{
				setData({...data,categories:data})
			}

		})
	}

	const serachSubmit=(e)=>{
		e.preventDefault()
		serachData()
		//console.log("serach")
	}

	const serachData=()=>
	{
		console.log(search,category)
		
			list({search:search ||undefined ,category:category})
			.then(response=>{
					if(response.error)
					{
						console.log(response.error)
					}
					else
					{
						//console.log(response)
						setData({...data,results:response,searched:true})
					}
			})
		
	}



const handlChange=(name)=>event=>{
	setData({...data,[name]:event.target.value,searched:false})
}

	const serachedProducts=(results=[])=>{
		return (
		<div className="row">
			{results.map((product,i)=>(
		<Card key={i} product={product} />
				))}
		</div>
			)
	}


	const searchForm=()=>(
		<form onSubmit={serachSubmit}>
			<span className="input-group-text">
				<div className="input-group input-group-lg">
					<div className="input-group-prepend">
						<select className="btn mr-2" onChange={handlChange("category")}>
							<option value="All">
								Search by category
							</option>
								{categories.map((c,i)=>(
							<option key={i} value={c._id}>
								{c.name}
							</option>
									))}
						</select>
						</div>
						<input placeholder="search by category " type="search"  className="form-control" onChange={handlChange("search")} />
					<button className="input-group-text">
						Search
					</button>
				</div>
			</span>

		</form>


	)

	useEffect(()=>{
		loadCategories()
	},[])

	return (
			<div className="row">
				<div className="container mb-3">
					{searchForm()}
				</div>
				<div className="container-fluid mb-3">
					{serachedProducts(results)}
				</div>
			</div>

		)
}

export default Search