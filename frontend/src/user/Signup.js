import React ,{useState} from 'react'
import {Link} from 'react-router-dom'
import Layout from '../core/Layout'
import {API} from '../config'
import {signup} from '../auth'
const Signup=()=>{
	const [values,setValues]=useState({
		name:'',
		email:'',
		password:'',
		error:'',
		success:false,
		contact:'',
		address:''
	})

	const handleChange=name=>event=>{
			setValues({...values,error:false,[name]:event.target.value})
	}

	const {name,email,password,error,success,contact,address}=values
	
	const clickSubmit=(event)=>{
		//prevent the page to reload
			event.preventDefault()
			
			signup({name,email,password,contact,address})
			.then(data=>{
				if(!data || email==='')
				{
					setValues({...values,error:"error",success:false})
				}
				else{
					setValues({...values,
						name:'',
						email:'',
						password:'',
						error:'',
						success:true,
						address:'',
						contact:''
					})
				}

			})

	}

	const SignUpForm=()=>(
		<form action="">
			<div className="form-group">	
				<label className="text-muted">Name</label>
				<input  type="text" value={name} required className="form-control" onChange={handleChange('name')}  />
			</div>
			<div className="form-group">	
				<label className="text-muted">Email</label>
				<input type="email" required value={email} className="form-control" onChange={handleChange('email')} />
			</div>
			<div className="form-group">	
				<label className="text-muted">Password</label>
				<input type="password" required value={password} className="form-control" onChange={handleChange('password')} />
			</div>
			<div className="form-group">	
				<label className="text-muted">Phone</label>
				<input  type="number" value={contact} required className="form-control" onChange={handleChange('contact')}  />
			</div>
			<div className="form-group">	
				<label className="text-muted">Addres</label>
				<input  type="text" value={address} required className="form-control" onChange={handleChange('address')}  />
			</div>
			<button onClick={clickSubmit} className="btn btn-primary" >Submit</button>
		</form>
	)

	const showError=()=>{
		return (
		<div  className="alert alert-danger" style={{display:error?'':'none'}}>
			Already exists Email or not valid data or server error
		</div>)
	}

	const showSuccess=()=>{
		if(success){
		return (<div  className="alert alert-info" >
			Account created please <Link to='/singin'>SignIn</Link>
		</div>)
	}
	
	}


	return (
		<Layout className="container col-md-8" title="Sign Up" description="Sign up to Dream Reader">
			{showSuccess()}
			{showError()}
			{SignUpForm()}
			
		</Layout>
		)

}

export default Signup