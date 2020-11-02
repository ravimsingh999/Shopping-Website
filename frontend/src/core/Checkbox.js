import React ,{useState,useEffect} from 'react'

const Checkbox=({categories,handelFilters})=>
{
	const [checked,setChecked]=useState([])

	const handleToggle=c=>()=>
	{
		const currentCategoryId=checked.indexOf(c)
		//return the first index or -1

		const newCheckedCategoryID=[...checked]
		//if currently checked was not checked then push
		//else pull of
		if(currentCategoryId===-1)
		{
			newCheckedCategoryID.push(c)
		}
		else
		{
			newCheckedCategoryID.splice(currentCategoryId)
		}
		console.log(newCheckedCategoryID)
		setChecked(newCheckedCategoryID)
		handelFilters(newCheckedCategoryID)

	}

	return categories.map((c,i)=>(
		<li key={i} className="list-unstyled">
			<input onChange={handleToggle(c._id)} value={checked.indexOf(c._id===-1)} type="checkbox" className="form-check-input" />
			<label className="form-check-label">
				{c.name}
			</label>
		</li>
		))
}


export default Checkbox