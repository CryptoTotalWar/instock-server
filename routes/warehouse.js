const express = require("express");

const router = express.Router();

// GET list of all warehouses
router.get("/", (req, res) => {
  res.status(200).json({});
});

// GET single warehouse
router.get("/", (req, res) => {
  // NOTE: there is an extra level of detail here that has contact role i.e. "warehouse manager"
  res.status(200).json({});
});

// POST to add new warehouse
router.post("/", (req, res) => {
  res.status(200).json({});
});

// PUT to edit a single warehouse
router.put("/", (req, res) => {
  res.status(200).json({});
});

// DELETE warehouse with id
router.delete("/:id", (req, res) => {
  res.status(200).json({});
});

module.exports = router;