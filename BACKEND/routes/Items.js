 
// module.exports = router;
const router = require("express").Router();
const Item = require("../models/Item");
const Review = require("../models/Review");
const multer = require('multer');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'Uploads/'); // Specify the directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Specify the name of the uploaded file
  }
});

const upload = multer({ storage: storage });

// Add a new item
router.route("/add").post(upload.single('image'), (req, res) => {
  // Log the file and body to see what is received in the request
  console.log(req.file);  // This will log the file information
  console.log(req.body);  // This will log the body data

  // Check if the file was actually received
  if (!req.file) {
    return res.status(400).json("No image file provided.");
  }

  const { item_code, itemName, itemCategory, itemStatus, price, potion, description } = req.body;
  const image = req.file.filename; // Retrieve the filename of the uploaded image

  const newItem = new Item({
    item_code, itemName, itemCategory, itemStatus, price, potion, description, image
  });

  newItem.save()
    .then(() => res.json("Item Added"))
    .catch(err => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

// Get all items
router.route("/").get((req, res) => {
  Item.find()
    .then((items) => {
    res.json(items);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json("Error: " + err);
    });
});

// Update an item
router.route("/update/:id").put(upload.single('image'), async (req, res) => {
    let itemId = req.params.id;
    const { itemName, itemCategory, itemStatus, price, potion, description } = req.body;
  
    // Check if an image is provided
    let image;
    if (req.file) {
      image = req.file.filename;
    } else {
      // If no new image is uploaded, retain the existing image
      const currentItem = await Item.findById(itemId);
      if (!currentItem) {
        return res.status(404).send({ status: "Item not found" });
      }
      image = currentItem.image;
    }
  
    const updateItem = {
      itemName,
      itemCategory,
      itemStatus,
      price,
      potion,
      description,
      image
    };
  
    try {
      const updatedItem = await Item.findByIdAndUpdate(itemId, updateItem, { new: true });
      if (!updatedItem) {
        return res.status(404).send({ status: "Item not found" });
      }
      res.status(200).send({ status: "Item updated", item: updatedItem });
    } catch (err) {
      console.log(err);
      res.status(500).send({ status: "Error with updating item" });
    }
  });

// Delete an item
router.route("/delete/:id").delete(async (req, res) => {
   try {
     await Item.findByIdAndDelete(req.params.id);
     res.status(200).send({ status: "Item deleted" });
   } catch (err) {
    console.log(err);
     res.status(500).send({ status: "Error with delete item" });
   }
 });

// Get an item by ID
router.route("/get/:id").get(async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).send({ status: "Item not found" });
    }
    res.status(200).send({ status: "Item fetched", item });
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with get item" });
  }
});

// Search items by name or category
router.get("/search/:key", async (req, res) => {
  try {
    const result = await Item.find({
      "$or": [
        { itemName: { $regex: req.params.key, $options: 'i' } },
        { itemCategory: { $regex: req.params.key, $options: 'i' } }
      ]
    });
    res.send(result);
  } catch (err) {
    console.log(err);
    res.status(500).send({ status: "Error with search" });
  }
});

// router.route("/:id/review").post(async (req, res) => {
//   try {
//       const { id } = req.params;
//       const { name, rating, comment } = req.body;

//       const product = await Item.findById(id);
//       if (!product) {
//           return res.status(404).send({ status: "Item not found" });
//       }

//       const newReview = new Review({
//           product: id,
//           name,
//           rating,
//           comment,
//       });

//       await newReview.save();

//       product.ratings += rating;
//       product.numReviews += 1;
//       product.avgRating = product.ratings / product.numReviews;

//       await product.save();

//       res.status(201).json({ status: "Review added", review: newReview });
//   } catch (err) {
//       console.log(err);
//       res.status(500).send({ status: "Error with adding review" });
//   }
// });
// Get all Sri Lankan items
router.route("/SriLankan").get((req, res) => {
  Item.find({ itemCategory: "SriLankan" })
  .then((items) => {
    res.json(items);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json("Error: " + err);
  });
});


// Get all Korean items
router.route("/Korean").get((req, res) => {
  Item.find({ itemCategory: "Korean" })
  .then((items) => {
    res.json(items);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json("Error: " + err);
  });
});

module.exports = router;

// Get all Chinese items
router.route("/Chinese").get((req, res) => {
  Item.find({ itemCategory: "Chinese" })
  .then((items) => {
    res.json(items);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json("Error: " + err);
  });
});

module.exports = router;

// Get all Thai items
router.route("/Thai").get((req, res) => {
  Item.find({ itemCategory: "Thai" })
  .then((items) => {
    res.json(items);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json("Error: " + err);
  });
});

module.exports = router;

// Get all Indian items
router.route("/Indian").get((req, res) => {
  Item.find({ itemCategory: "Indian" })
  .then((items) => {
    res.json(items);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json("Error: " + err);
  });
});

module.exports = router;

// Get all Japanese items
router.route("/Japanese").get((req, res) => {
  Item.find({ itemCategory: "Japanese" })
  .then((items) => {
    res.json(items);
  })
  .catch((err) => {
    console.log(err);
    res.status(400).json("Error: " + err);
  });
});

module.exports = router;
