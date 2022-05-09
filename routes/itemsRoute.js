const express = require("express");
const router = express.Router();
const Item = require("../models/itemModel");
const auth = require("../middleware/auth");

router.get("/getallitems", async (req, res) => {
  try {
    const items = await Item.find({});
    res.send(items);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

router.post("/getitembyid", async (req, res) => {
  const itemid = req.body.itemid;
  try {
    const item = await Item.findOne({ _id: itemid });
    res.send(item);
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/additem", auth, async (req, res) => {
  const item = req.body.item;
  try {
    const newItem = new Item({
      name: item.name,
      image: item.image,
      portions: ["small", "medium", "large"],
      description: item.description,
      category: item.category,
      prices: [item.prices],
    });

    await newItem.save();
    res.send("New item added succesfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/edititem", auth, async (req, res) => {
  const editedItem = req.body.editedItem;
  try {
    const item = await Item.findOne({ _id: editedItem._id });

    item.name = editedItem.name;
    item.description = editedItem.description;
    item.category = editedItem.category;
    item.image = editedItem.image;
    item.prices = [editedItem.prices];

    await item.save();
    res.send("Item details edited succesfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

router.post("/deleteitem", auth, async (req, res) => {
  const itemid = req.body.itemid;
  try {
    await Item.findOneAndDelete({ _id: itemid });
    res.send("Item deleted succesfully");
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

module.exports = router;
