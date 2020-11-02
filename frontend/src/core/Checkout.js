import React,{useState,useEffect} from 'react'
import Layout from './Layout'
import {getProducts,getBraintreeClientToken,processPayment,createOrder,createOrdercod} from  './apiCore'
import Card from  './card'
import {Link} from 'react-router-dom'
import {isAuthenticated} from '../auth'
//auth is a folder and it automtices import index
/*
buy
send the nonce to server 
nonce=data.instance.rerquestpayment method

*/ 
import 'braintree-web'
import DropIn from 'braintree-web-drop-in-react'
const Checkout=({products})=>{
	const [data,setData]=useState({
		success:false,
		clientToken:null,
		error:'',
		instance:{},
		cashod:false
	})

	const userId=isAuthenticated() && isAuthenticated().user._id
	const token=isAuthenticated() && isAuthenticated().token
	const useraddress=isAuthenticated() && isAuthenticated().user.address
	const userCon=isAuthenticated() && isAuthenticated().user.contact
	const getToken=(userId,token)=>{
		getBraintreeClientToken(userId,token)
		.then(data=>{
			if(!data)
			{
				setData({...data,error:"erro in cart"})
			}
			else
			{
				setData({...data,clientToken:data.clientToken})
			}
		})
	}


	const showCheckout=()=>{
		return 	isAuthenticated() ? (
		<button  className="btn btn-success">
			{showDropIn()}
		</button>
		) : (
		<Link  className="btn btn-primary" to='/singin'>
			Please Login First
		</Link>
		) 
	}

	const buy=()=>
	{
			let nonce;
			let getNonce=data.instance.requestPaymentMethod()
			.then(data=>{
				console.log(data)

				nonce=data.nonce
				console.log('send nonce to process',nonce,getTotal(products))
				const paymentData={
					payementMethodNonce:nonce,
					amount:getTotal(products)
				}

				processPayment(userId,token,paymentData)
				.then(response=>{
					console.log(response)
					setData({...data,success:response.success})
				


				})
				.catch(error=>console.log(error))

			})
			.catch(error=>{
				console.log('DropIn error')
				setData({...data,error:'error message'})
			})
	}
	
	const showSuccess=(success)=>
	{
		return(
		<div className="alert alert-info">
		
			Order confirmed
		</div>
	)
	}

	const handleCod=(cashod)=>
	{
		setData({cashod:true,success:true})
		console.log(data)
		console.log(useraddress)
		if(cashod)
		{
			const createOrderData={
			products:products,
			address:useraddress,
			contact:userCon
		}
		createOrdercod(userId,createOrderData)
			.then((data,err)=>{
			window.alert("order placed !Keep Shopping")
		})
		}
		
	}


	const showDropIn=()=>{
		return (
				<div>
			{data.clientToken !==null && products.length>0 ?(
				<div>

					<DropIn options={{
						authorization:data.clientToken
					}} 
				onInstance={instance=>data.instance=instance} />
				<button onClick={buy} className="btn btn-block btn-success">
				Pay
				</button>
				</div>

				):null}
			<hr/>
			<p>or</p>
			<hr/>
			<button onClick={handleCod} onMouseUp={showSuccess}>
			Cash on delivery
			</button>	
		
		</div>

		)
	
	}

	useEffect(()=>{
		getToken(userId,token)
	},[])


	const getTotal=()=>{
		///total number of values
		//reduce method is used to calculate
		return products.reduce((currval,nextval)=>{
			return currval+nextval.count*nextval.price
		},0)
	}

	const ShowError=error=>(
		<div className="alert alert-danger">
			if(error)
			{
				{error}
			}
		</div>
	)


	

	return <div>
	<h6>Total payment:${getTotal()}</h6>
	{showCheckout()}	
	</div>


}

export default Checkout










