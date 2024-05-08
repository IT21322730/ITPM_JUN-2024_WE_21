const router = require("express").Router();
const Complain = require("../models/complain");

router.route("/add").post((req, res) => {
    const { holderName, holderTelephoneNumber, complain } = req.body;

    const newComplain = new Complain({
        holderName,
        holderTelephoneNumber,
        complain
    });

    newComplain.save()
        .then(() => {
            res.json("Complain Added");
        })
        .catch((err) => {
            console.error(err);
            res.status(400).send("Unable to add complain");
        });
});

router.route("/").get((req, res) => {
    Complain.find()
        .then((complains) => {
            res.json(complains);
        })
        .catch((err) => {
            console.error(err);
            res.status(500).send("Internal Server Error");
        });
});

router.delete("/delete/:id", async (req, res) => {
    try {
        const result = await Complain.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 1) {
            res.json({ message: "Complaint deleted successfully" });
        } else {
            res.status(404).json({ message: "Complaint not found" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
