const router = require("express").Router();
const { request, response } = require("express");
let Restaurant = require("../models/restaurant");

router.route("/add").post((req,res) => {

    const restaurantname = req.body.restaurantname;
    const restaurantaddress = req.body.restaurantaddress;
    const restaurantowner = req.body.restaurantowner;
    const restaurantphone = Number(req.body.restaurantphone);
    const restaurantemail = req.body.restaurantemail;
    const restaurantaccNumber = req.body.restaurantaccNumber;
    const restaurantitem = req.body.restaurantitem;
    const restaurantunitPrice = Number(req.body.restaurantunitPrice);

    const newRestaurant = new Restaurant({
        restaurantname,restaurantaddress,restaurantowner,restaurantphone,restaurantemail,restaurantaccNumber,restaurantitem,restaurantunitPrice
    })

    newRestaurant.save().then( () => {
        res.json("Restaurant Added")

    }).catch((err) => {
        console.log(err);
        
    })
})

router.route("/").get((req,res) => {

    Restaurant.find().then((restaurants) => {
        res.json(restaurants)

    }).catch((err) => {
        console.log(err);
    })
})


// Update restaurant route
router.put('/update/:id', async (req, res) => {
    let restaurantid = req.params.id;
    const { restaurantname, restaurantaddress, restaurantowner, restaurantphone, restaurantemail, restaurantaccNumber,restaurantitem,restaurantunitPrice } = req.body;

    const updateRestaurant = {
        restaurantname,
        restaurantaddress,
        restaurantowner,
        restaurantphone,
        restaurantemail,
        restaurantaccNumber,
        restaurantitem,
        restaurantunitPrice
    }

    try {
        const updatedRestaurant = await Restaurant.findByIdAndUpdate(restaurantid, updateRestaurant);
        if (!updatedRestaurant) {
            return res.status(404).send({ status: "Not found" });
        }
        res.status(200).send({ status: "Updated" });
    } catch (err) {
        console.log(err);
        res.status(500).send({ status: "Error with updating" });
    }
});

router.delete("/delete/:id", async(req,res) => {

    let result = await Restaurant.deleteOne({_id:req.params.id});
    res.send(result)
});

router.route("/get/:id").get(async (req, res) => {
    const id = req.params.id;

    try {
        const restaurant = await Restaurant.findById(id).exec();
        if (!restaurant) {
            return res.status(404).json({ success: false, message: "Restaurant not found" });
        }
        return res.status(200).json({
            success: true,
            restaurant
        });
    } catch (error) {
        return res.status(400).json({ success: false, error: error.message });
    }
});


router.get("/search/:key" ,async(req,res) => {
    
    let result = await Restaurant.find({
        "$or" : [
            {
                restaurantname : { $regex : req.params.key}
            },
            {
                restaurantitem : { $regex : req.params.key}
            }
        ]
    });
    res.send(result);
})


module.exports = router;