export const addItem=(item,next)=>{
	let cart=[]
	if(typeof window!=='undefined')
	{
		if(localStorage.getItem('cart'))
		{
			cart=JSON.parse(localStorage.getItem('cart'))
		}

		cart.push({
			...item,
			count:1

		})
//add count +1 if we add duplicate product set remove duplicates 
//and map again to fetch the values of item
/*
 Array. from() lets you create Array s from: array-like objects
 object can be map or set
 array.find()=cart.find 
*/
cart=Array.from(new Set(cart.map((p)=>(p._id)))).map(id=>{
	return cart.find(p=>p._id===id)
})

}

localStorage.setItem('cart',JSON.stringify(cart))
next()

}

export const itemTotal=()=>{
	if(typeof window!=='undefined')
	{
		if(localStorage.getItem('cart'))
		{
			return JSON.parse(localStorage.getItem('cart')).length
		}
	}
return 0

}

export const getCart=()=>{
	if(typeof window!=='undefined')
	{
		if(localStorage.getItem('cart'))
		{
			return JSON.parse(localStorage.getItem('cart'))
		}
	}
return []

}

export const removeItem=(productId,count)=>{
	let cart=[]
	if(typeof window!=='undefined')
	{
		if(localStorage.getItem('cart'))
		{
			cart=JSON.parse(localStorage.getItem('cart'))
		}

	cart.map((product,i)=>{
		if(product._id===productId)
		{
			cart.splice(cart[i],1)
			window.location.reload(false)

		}
	})

}

localStorage.setItem('cart',JSON.stringify(cart))
return cart

}









