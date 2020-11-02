export const signup=(user)=>{
		//console.log(name,email,password)

		return fetch(`https://ancient-peak-77982.herokuapp.com/api/signup`,{
			method:"POST",
			headers:{
				 'Content-Type': 'application/json'
			},
			body:JSON.stringify(user)
		})
		.then(response=>{
			return response.json()

		})
		.catch(err=>{
			console.log(err)
		})
	}




export const signin=(user)=>{
		//console.log(name,email,password)

		return fetch(`https://ancient-peak-77982.herokuapp.com/api/signin`,{
			method:"POST",
			headers:{
				 'Content-Type': 'application/json'
			},
			body:JSON.stringify(user)
		})
		.then(response=>{
			return response.json()

		})
		.catch(err=>{
			console.log(err)
		})
	}

export const authenticate=(data,next)=>{
	if(typeof window!=='undefinced'){
		localStorage.setItem('jwt',JSON.stringify(data))
		next()

	}

}


export const signout=(next)=>{

if(typeof window!=='undefinced'){
		localStorage.removeItem('jwt')
		next()
		return fetch(`https://ancient-peak-77982.herokuapp.com/api/signout`,{
			method:"GET",
		})
		.then(response=>{
			console.log('signout')
			window.location.reload(false)

		})
		.catch(err=>console.log(err))
	}
}


export const isAuthenticated=()=>{
	if(typeof window=='undefinced'){
		return false
	}

	if(localStorage.getItem('jwt'))
	{
		return JSON.parse(localStorage.getItem('jwt'))
	}
	else
	{
		return false;
	}
}
















