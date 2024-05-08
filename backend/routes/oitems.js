const router = require("express").Router();
//const multer = require("multer")
let item = require("../models/oitem");
//const Review = require('../models/review');
/*
const imgconfig = multer.diskStorage({
    destination:(req,file,callback)=>{
        callback(null,"../frontend/public/uploads")
    },
    filename:(req,file,callback)=>{
        callback(null,`photo-${Date.now()}.${file.originalname}`)
    }
})

const isImage = (req,file,callback)=>{
    if(file.mimetype.startsWith("image")){
        callback(null,true)
    }else{
        callback(new Error("only image is allow"))
    }
}

const upload = multer({
    storage:imgconfig,
    fileFilter:isImage
})

router.post('/add',(req,res) =>{
    const item_code=req?.body?.item_code;
    const itemName = req?.body?.itemName;
    const itemCategory = req?.body?.itemCategory;
    const itemStatus = req?.body?.itemStatus;
    const price = req?.body?.price;
    const weight = req?.body?.weight;
    const description = req?.body?.description;
    //const image = req?.file?.filename;
   
   const newitem = new item({
    item_code,itemName,itemCategory,itemStatus,price,weight,description
})

newitem.save((err)=>{
        if(err){
            return res.status(400).json({
                error:err
            });
        }
        return res.status(200).json({
            success:"Item added successfully"
        });
    });
});
*/router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const price = Number(req.body.price);
    const quantity = Number(req.body.quantity);

    const newItem = new item({

        name,
        price,
        quantity
    })

    newItem.save().then(()=>{
        res.json("Item Added")
    }).catch((err)=>{
        console.log(err);
    })
})

router.route("/").get((req,res)=>{

    item.find().then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })
})

 
router.route("/update/:id").put(async (req, res) => {
    let userId = req.params.id;
    const {itemName,itemCategory,itemStatus,price,weight,description,image} = req.body;

    const updateItem = {
        itemName,
        itemCategory,
        itemStatus,
        price,
        weight,
        description,
        image
    }
    const update = await item.findByIdAndUpdate(userId,updateItem)
    .then(() => {
        res.status(200).send({status: "Item updated"})

    }).catch((err) => {
        console.log(err);
        res.status(500).send({status : "Error with updating date"});
    })
 
})



router.route("/delete/:id").delete(async(req,res) => {
    let userId = req.params.id;

    await item.findByIdAndDelete(userId)
    .then(() =>{
        res.status(200).send({status: "Item deleted"});   
    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with delete user", error: err.message});

    })
})

router.route("/get/:id").get(async(req,res) => {
    let userId = req.params.id;
    const user = await item.findById(userId)
    .then((item) =>{
        res.status(200).send({status: "Item fetched", item})

    }).catch((err) =>{
        console.log(err.message);
        res.status(500).send({status: "Error with get user",error:err.message});
    })
})

router.route("/wedding_cake").get((req,res)=>{

    item.find({ itemCategory: 'Wedding Cakes' }).then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })
})
router.route("/birthday_cakes").get((req,res)=>{

    item.find({ itemCategory: 'Birthday Cakes' }).then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })
})
router.route("/cup_cakes").get((req,res)=>{

    item.find({ itemCategory: 'Cup Cakes' }).then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })
})
router.route("/icing_cakes").get((req,res)=>{

    item.find({ itemCategory: 'Icing Cakes' }).then((items)=>{
        res.json(items)
    }).catch((err)=>{
        console.log(err)
    })
})

router.get("/search/:key" ,async(req,res) => {
    
    let result = await item.find({
        "$or" : [
            {
                itemName : { $regex : req.params.key}
            },
            {
                itemCategory : { $regex : req.params.key}
            }
        ]
    });
    res.send(result);
})



/*router.route("/wedding cake").get((req,res) => {

    item.find({ itemCategory: 'Wedding Cakes' }).then((items) => {
        res.json(items)

    }).catch((err) => {
        console.log(err);
    })
})*/

router.post('/item/:id/review',async(req,res)=>{

    const product =req.params.id;
    const name=req.body.name;
    const rating= req.body.rating;
    const comment= req.body.comment;

    const product1 = await item.findById(product);

    const Reviews = new Review({
        product,name,rating,comment
    })

    await Reviews.save();
    

    product1.ratings += rating;
    product1.numReviews += 1;
    product1.avgRating = product1.ratings / product1.numReviews;
   
    await product1.save();

    res.status(201).json(Reviews);

});

router.route(`/item/:id/reviews`).get((req,res) => {
        
    Review.find({product:req.params.id}).then((review) => {
        res.json(review)
    
    }).catch((err) => {
        console.log(err);
    })
});

router.route(`/item/:id/reviewscount`).get((req,res) => {
        
    Review.find({product:req.params.id ,rating:1}).then((review) => {
        res.json(review)
    
    }).catch((err) => {
        console.log(err);
    })
});

router.route(`/item/:id/5reviewscount`).get((req,res) => {
        
    Review.find({product:req.params.id ,rating:5}).count().then((review) => {
        res.json(review)
    
    }).catch((err) => {
        console.log(err);
    })
});

router.route(`/item/:id/4reviewscount`).get((req,res) => {
        
    Review.find({product:req.params.id ,rating:4}).count().then((review) => {
        res.json(review)
    
    }).catch((err) => {
        console.log(err);
    })
});

router.route(`/item/:id/3reviewscount`).get((req,res) => {
        
    Review.find({product:req.params.id ,rating:3}).count().then((review) => {
        res.json(review)
    
    }).catch((err) => {
        console.log(err);
    })
});


router.route(`/item/:id/2reviewscount`).get((req,res) => {
        
    Review.find({product:req.params.id ,rating:2}).count().then((review) => {
        res.json(review)
    
    }).catch((err) => {
        console.log(err);
    })
});

router.route(`/item/:id/1reviewscount`).get((req,res) => {
        
    Review.find({product:req.params.id ,rating:1}).count().then((review) => {
        res.json(review)
    
    }).catch((err) => {
        console.log(err);
    })
});

router.get('/item/:id/review',(req,res)=>{
    let oitemId = req.params.id;
    
    Review.findById(oitemId,(err,review) =>{
        if(err){
            return res.status(400).json({success:false,err});
        }
            return res.status(200).json({
                
                review
            });
        });
});

module.exports = router;