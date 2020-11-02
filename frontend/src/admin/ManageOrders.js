import React ,{useState,useEffect} from 'react'
import Layout from '../core/Layout'
import {isAuthenticated} from '../auth'
import {Link} from 'react-router-dom'
import {listOrders,manageOrders} from './apiAdmin'
//{JSON.stringify(Orders)}

const ManageOrders=()=>{

			const [orderid,setOrderid]=useState('')
			const [error,setError]=useState(false)
			const [sucess,setSuccess]=useState(false)
			const {user,token}=isAuthenticated()

			const [id, setId] = useState('');

			const handleChange=(e)=>{
			setOrderid(e.target.value)
			}

			
	

			const manageOrders=()=>{
				console.log('Id ', id)
				fetch(`http://localhost:8000/api/order/manage`,{
					method:"POST",
					headers:{
						'Content-Type': 'application/json',
						'Accept': 'application/json',
					},
					body:JSON.stringify({id:id})
				})
				.then(response=>{
					console.log(response)

				})
				.catch(err=>{
					console.log(err)
				})
			}

			const mouseUp=()=>
			{
				setSuccess(true)
				console.log(sucess)
			}
				const showSuccess=()=>{
			if(sucess){
			return (<div  className="text text-success" >
				Order Delivered !please collect cash
		</div>)
	}
	
	}

		


		const orderform=()=>(
		<form>
			<div className="form-group">
				<label className="text-muted">
					Order Id
				</label>
				<input type="text" className="form-control" onChange={(event) => setId(event.target.value)}  required/>
			</div>
			<div className="col-md-5">
			<button onClick={manageOrders} onMouseUp={mouseUp} className="btn btn-outline-primary">Order Deliverd</button>
			</div>

		</form>
	)

	return (
		<Layout title="Manage All Orders"  description="Manage user payment and order process" className="container">
			<div className="row">
				<div className="col-md-8 ">
				{showSuccess()}
				{orderform()}
			</div>
			</div>
		</Layout>
		)
}



export default ManageOrders













