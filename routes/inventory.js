const express = require("express");

const router = express.Router();

// GET list of all inventory
router.get("/", (req, res) => {
  res.status(200).json({});
});

// GET single inventory item
router.get("/:id", (req, res) => {
  // NOTE: there is an extra level of detail here that has the item description
  res.status(200).json({});
});

// POST to add new inventory item
router.post("/:id", (req, res) => {
  res.status(200).json({});
});

// PUT to edit a single inventory item
router.put("/:id", (req, res) => {
  res.status(200).json({});
});

// DELETE inventory item with id
router.delete("/:id", (req, res) => {
  res.status(200).json({});
});

module.exports = router;
