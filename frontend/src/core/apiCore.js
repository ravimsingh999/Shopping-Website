import {BASE_URL} from "../config.js"


import queryString from 'query-string'

export const getProducts=(sortBy)=>{
	return fetch(`${BASE_URL}/products?sortBy==${sortBy}&order=desc`,{
		method:"GET",

	})
	.then(response=>{
		return response.json()
		//console.log(response)
	})
	.catch(err=>{
		console.log(err)
	})



}


export const getCategories=()=>{
	return fetch(`${BASE_URL}/categories`,{
		method:"GET",

	})
	.then(response=>{
		return response.json()
	})
	.catch(err=>{
		console.log(err)
	})



}

export const read=(productId)=>{
	return fetch(`${BASE_URL}/product/${productId}`,{
		method:"GET",

	})
	.then(response=>{
		return response.json()
	})
	.catch(err=>{
		console.log(err)
	})



}

export const list=params=>{
	const query=JSON.stringify(params)
	console.log('query',query)
	return fetch(`${BASE_URL}/products/search?${query}`,{//it is correct till here
		method:"GET",
	})
	.then(response=>{
		return response.json()
		//console.log(response)
	})
	.catch(err=>{
		console.log(err)
	})
}


export const getBraintreeClientToken=(userId,token)=>{
	
	return fetch(`https://ancient-peak-77982.herokuapp.com/api/braintree/getToken/${userId}`,{//it is correct till here
		method:"GET",
		headers:{
			"Content-Type":"application/json",
			Authorization:`Bearer ${token}`
		}

	})
	.then(response=>{
		return response.json()
		//console.log(response)
	})
	.catch(err=>{
		console.log(err)
	})
}

export const processPayment=(userId,token,paymentdata)=>{
	
	return fetch(`https://ancient-peak-77982.herokuapp.com/api/braintree/payment/${userId}`,{//it is correct till here
		method:"POST",
		headers:{
			"Content-Type":"application/json",
			Authorization:`Bearer ${token}`
		},
		body:JSON.stringify(paymentdata)

	})
	.then(response=>{
		return response.json()
		//console.log(response)
	})
	.catch(err=>{
		console.log(err)
	})
}


export const createOrder=(userId,token,createOrderData)=>{
	
	return fetch(`${BASE_URL}/api/order/create/${userId}`,{//it is correct till here
		method:"POST",
		headers:{
			"Content-Type":"application/json",
			Authorization:`Bearer ${token}`
		},
		body:JSON.stringify({order:createOrderData})

	})
	.then(response=>{
		return response.json()
		//console.log(response)
	})
	.catch(err=>{
		console.log(err)
	})
}



export const createOrdercod=(userId,createOrderData)=>{
	
	return fetch(`${BASE_URL}/order/create/${userId}`,{//it is correct till here
		method:"POST",
		headers:{
			"Content-Type":"application/json"
		},
		body:JSON.stringify({order:createOrderData})

	})
	.then(response=>{
		return response.json()
		//console.log(response)
	})
	.catch(err=>{
		console.log(err)
	})
}







export const listOrders=(userId,token)=>{
	return fetch(`${BASE_URL}/order/list/${userId}`,{
		method:"GET",
		headers:{
				Accept:"application/json",
				 Authorization:`Bearer ${token}`
			}

	})
	.then(response=>{
		return response.json()
	})
	.catch(err=>{
		console.log(err)
	})
}



