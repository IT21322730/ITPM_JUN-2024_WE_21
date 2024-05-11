require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const url =
  "mongodb+srv://iBlind:U7JZhxMI61REAVgn@iblind.wcmtu6n.mongodb.net/iblind";
//route imports
const userRoutes = require("./routes/user.routes");
const itemRoutes = require("./routes/item.routes");
const cartItemRoutes = require("./routes/cart.item.routes");
const orderRoutes = require("./routes/order.routes");
const cardRoutes = require("./routes/card.route");
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.use("/api/users", userRoutes);
app.use("/api/items", itemRoutes);
app.use("/api/cart", cartItemRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/cards", cardRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Replace PORT with your preferred port number
const PORT = 8085;

app.listen(PORT, () => console.log(`Server is running on ${PORT}`));
