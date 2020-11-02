import React ,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {createProduct,getCategories} from './apiAdmin'



const ADDProduct=()=>{
	
	const [values,setValues]=useState({
		name:'',
		description:'',
		price:'',
		categories:[],
		category:'',
		shipping:'',
		quantity:'',
		photo:'',
		loading:false,
		error:'',
		redirectToProfile:false,
		formData:''

	})


	const {user,token}=isAuthenticated()
	const {
		name,
		description,
		price,
		categories,
		category,
		shipping,
		quantity,
		loading,
		error,
		redirectToProfile,
		formData
	}=values

	//load categoris and det formdata
	const init=()=>{
		getCategories()
		.then(data=>{
			if(data.error){
				setValues({...values,error:data.error})
			}else
			{
			//console.log(data)
			setValues({...values,categories: data,formData:new FormData()})
			//console.log(categories)
			
			}
		})
	}

	useEffect(()=>{
			init()

		},[])

	const handleChange=name=>event=>{
			const value=name==='photo' ? event.target.files[0] :event.target.value
			formData.set(name,value)
			setValues({...values,[name]:value })

	}


	const clickSubmit=(event)=>{
		//
		event.preventDefault()
		setValues({...values,error:'',loading:true})
		console.log(values)
		createProduct(user._id,token,formData)
		.then(data=>{
			if(data.error){
				setValues({...values,error:data.error})
				console.log(data.error)
			}
			else
			{
					setValues({
						...values,name:'',
						description:'',
						photo:'',
						price:'',
						quantity:'',
						loading:false,
						createProduct:data.name
					})
					console.log(values)
			}

		})


	}

	const newPostForm=()=>(
		<form className="mb-3" onSubmit={clickSubmit}>
			<h4>Post Photo</h4>
			<div className="form-group col-md-4">	
				<label className="btn btn-secondary">
				<input type="file" onChange={handleChange('photo')} name="photo"  accept="image/*"   required/>
				</label>
			</div>

			<div className="row">
			<div className="form-group col-md-4">
				<label className="text-muted">Name</label>
				<input onChange={handleChange('name')} type="text" className="form-control"  value={name} required/>
			</div>
			<div className="form-group col-md-4">
				<label className="text-muted">Description</label>
				<textarea onChange={handleChange('description')}  className="form-control"  value={description} required></textarea>
			</div>
			<div className="form-group col-md-4">
				<label className="text-muted">Price</label>
				<input onChange={handleChange('price')} type="number" className="form-control"  value={price} required />
			</div>
			</div>
			<div className="row">
			<div className="form-group col-md-4">
				<label className="text-muted">Quantity</label>
				<input onChange={handleChange('quantity')} type="number" className="form-control"  value={quantity} required />
			</div>
			<div className="form-group col-md-4">
				<label className="text-muted">Category</label>
				<select
				 onChange={handleChange('category')} 
				  className="form-control" 

				  >
				  	<option  >Please Select</option>
				
			  	{categories && categories.map((c,i)=>(<option key={i}  value={c._id}>{c.name}</option>))}
				</select>
			</div>
			<div className="form-group col-md-4">
					<label className="text-muted">Shipping</label>
				<select
				 onChange={handleChange('shipping')} 
				  className="form-control"  
				  >
				  	<option  >Please Select</option>
				  	<option value="false" >No</option>
				  	<option value="true" >Yes</option>
				</select>
			</div>
		
			</div >
			<button className="btn btn-primary">ADD</button>

		</form>
		
		)
const showSuccess=()=>(
	<div className="alert alert-info"  style={{display:error?'':'none'}} >
		<h4>Product created</h4>
	</div>
)

const shaoLoading=()=>(
	loading &&
	<div className="alert alert-success"  >
		<h4>Product is being created please do not refresh the broweser</h4>
	</div>
)



	return (

		<Layout title="Add a new Product" 
		 description=" Good Day, ready to add a new Product" 
		 className="container">
			<div className="row">
			<div className="col-md-8 ">

					{showSuccess()}
					{newPostForm()}
					
					
			</div>
			<div className="col-md-4">
				{shaoLoading()}

			</div>
			</div>
			
		</Layout>
		)
}


export default ADDProduct





