const formidable=require('formidable');
const lodash= require('lodash');
const fs=require('fs')
const Product=require('../models/product')



exports.productById=(req,res,next,id)=>
{
	Product.findById(id).exec((err,product)=>
	{
		if(err || !product)
		{
			return res.status(400).json({
				error:"Product not found"	
			})
		}

		req.product=product
		next()
	})
}

exports.read=(req,res)=>
{
	//req.product.photo=undefined
	return res.json(req.product)
}

exports.create=(req,res)=>
{
	let form=new formidable.IncomingForm()
	form.keepExtensions=true
	form.parse(req,(err,fields,files)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:'Image could not be uploaded'
			})
		}
		let product=new Product(fields)
		if(files.photo)
		{
			product.photo.data=fs.readFileSync(files.photo.path)
			product.photo.contentType=files.photo.type
		}


		product.save((err,result)=>
		{
			if(err)
			{
				return res.status(400).json({
				error:'error'
			})
			}
			res.json(result)
			
		})
	})	
}

exports.remove=(req,res)=>
{
	let product=req.product
	product.remove((err,deleted)=>{
		if(err)
		{
			return res.status(400).json({
			error:"can not delet order"
		})
		}
		res.json({
			deleted,
			message:"product deleted"
		})

		

	})
}

///sells and arriaval

//by sell=/products?sortby=sold&order=desc&&imit

//by arivall=/products?sortby=createdAt&order=desc&&limit
//if no params are sent then all products are returned
/*Mongoose uses two queries to fulfill the request. The a collection is queried to get the docs that match the main query, and then the j collection is queried to populate the d field in the docs. Basically the model 'a' is containing an attribute 'd' which is referencing(pointing) towards the model 'j'.
*/

exports.list=(req,res)=>
{

	let order=req.query.order?req.query.order :'asc'
	let sortBy=req.query.order?req.query.order :'_id'
	let limit=req.query.order?parseInt(req.query.order) :2

	Product.find()
	.select("-photo")
	.populate('category')
	.sort([[sortBy,order]])
	.limit(limit)
	.exec((err,data)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:"product not found"
			})
		}

		res.send(data)

	})


}

/*
find products based on the req product categlory
oterh products that has same categrory will be reurned
*/

exports.listRelated=(req,res)=>{
	let limit=req.query.order?parseInt(req.query.order) :10

//ne =not including
	Product.find({_id:{$ne:req.product},categrory:req.product.categrory})
	.limit(limit)
	.populate('categrory','_id name')
	.exec((err,products)=>
	{
		if(err)
		{
			return res.status(400).json({
				error:"product not found"
			})
		}

		res.json(products)
	})

}


 
exports.listBySearch = (req, res) => {
    let order = req.body.order ? req.body.order : "desc";
    let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = parseInt(req.body.skip);
    let findArgs = {};
 
    // console.log(order, sortBy, limit, skip, req.body.filters);
    // console.log("findArgs", findArgs);
 
    for (let key in req.body.filters) {
        if (req.body.filters[key].length > 0) {
            if (key === "price") {
                // gte -  greater than price [0-10]
                // lte - less than
                findArgs[key] = {
                    $gte: req.body.filters[key][0],
                    $lte: req.body.filters[key][1]
                };
            } else {
                findArgs[key] = req.body.filters[key];
            }
        }
    }
 
    Product.find(findArgs)
        .select("-photo")
        .populate("category")
        .sort([[sortBy, order]])
        .skip(skip)
        .limit(limit)
        .exec((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "Products not found"
                });
            }
            res.json({
                size: data.length,
                data
            });
        });
};


exports.photo=(req,res,next)=>{
	if(req.product.photo.data)
	{
		//set the contet type
		res.set('Contetnt-Type',req.product.photo.contentType)
		return res.send(req.product.photo.data)
	}
	next()
}




exports.listSearch=(req,res)=>{
	//create query object to hold serach value
	const query={}
	//assign serach value
	if(req.query.search )
	{
		query.name={$regex:req.query.serach,$options:'i'}
		//assign categor value to query.categor
		if(req.query.category && req.query.category !='ALL')
		{
			query.category=req.query.category
		}
		//find the product based on query object
		Product.find(query,(err,products)=>{
			if(err)
			{
				return res.status(400).json({
					error:"err searching"
				})
			}
			console.log(query)
			res.json(products)
		})
	}

}











