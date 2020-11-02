import React from 'react'
import {BASE_URL} from "../config.js"


const ShowImage=(item)=>{
	console.log(item.item._id)

const image1=`${BASE_URL}/product/photo/${item.item._id}`

	return (
	<div className="product-img">
		<img src={image1} alt="Book" style={{"maxHeight":"50%" ,"maxWidth":"70%"}} className="mb-3"/>
	</div>
		)
}

export default ShowImage