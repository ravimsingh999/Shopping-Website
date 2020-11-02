import React ,{useState} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {createcategory} from './apiAdmin'

const ADDCategory=()=>{
	const [name,setName]=useState('')
	const [error,setError]=useState(false)
	const [sucess,setSuccess]=useState(false)

	//destruct user and token from localstoarage
	const {user,token}=isAuthenticated()

	const handleChange=(e)=>{
		setError('')
		setName(e.target.value)
	}


	const clickSubmit=(e)=>{
		e.preventDefault()
		setError('')
		setSuccess(false)
		//make request to api to create categroy
		createcategory(user._id,token,{name})
		.then(data=>{
			if(data.error)
			{
				setError(true)
			}
			else
			{
				setError('')
				setSuccess(true)
			}
		})

	}

	const showSuccess=()=>{
		if(sucess){
			return <h3 className="text-success">Category {name} Created Succefully</h3>
			window.location.reload(true);

		}
		else if(error)
		{
			return <h3 className="text-danger">Category should be unique </h3>	
		}
	}
	const showError=()=>{
		if(error){
			return <h3 className="text-danger">Category should be unique </h3>

		}
	}



	const newCategoryForm=()=>(
		<form onSubmit={clickSubmit}>
			<div className="form-group">
				<label className="text-muted">
					Name
				</label>
				<input type="text" value={name}  className="form-control" onChange={handleChange}  required/>
			</div>
			<div className="col-md-5">
			<button className="btn btn-outline-primary ">Create Category</button>
			</div>

			
		</form>
	)


	return (
		<Layout title="Add a new Category"  description=" Good Day, ready to add a new categroy" className="container">

		{showSuccess()}
			<div className="row">
				<div className="col-md-8 ">
				{newCategoryForm()}
			</div>
			</div>
			
		</Layout>
		)

}

export default ADDCategory





