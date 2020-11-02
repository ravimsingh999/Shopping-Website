import {BASE_URL} from "../config.js"


export const createcategory=(userId,token,category)=>{
		//console.log(name,email,password)

		return fetch(`${BASE_URL}/create/${userId}`,{
			method:"POST",
			headers:{
				 'Content-Type': 'application/json',
				 Authorization:`Bearer ${token}`
			},
			body:JSON.stringify(category)
		})
		.then(response=>{
			return response.json()

		})
		.catch(err=>{
			console.log(err)
		})
	}


export const createProduct=(userId,token,product)=>{
		//console.log(name,email,password)

		return fetch(`${BASE_URL}/product/create/${userId}`,{
			method:"POST",
			headers:{
				 Authorization:`Bearer ${token}`
			},
			body:product
		})
		.then(response=>{
			return response.json()

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

export const manageOrders=(orderId)=>{
	
		return fetch(`${BASE_URL}/order/manage`,{
			method:"POST",
			body:JSON.stringify({id:orderId})
		})
		.then(response=>{
			return response.json()
			console.log(response)

		})
		.catch(err=>{
			console.log(err)
		})
}








