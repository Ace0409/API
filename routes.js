const express = require("express");
const router = express.Router();
const Employee = require("./db");
const validate = require("./validation");

// GET all employees
router.get("/employees", async (req, res) => {
  const data = await Employee.find();
  res.json(data);
});

// GET by ID
router.get("/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ message: "Not found" });
    res.json(emp);
  } catch {
    res.status(400).json({ message: "Invalid ID" });
  }
});

// POST
router.post("/employees", async (req, res) => {
  const { error } = validate.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const emp = new Employee(req.body);
  await emp.save();
  res.json(emp);
});

// PUT
router.put("/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!emp) return res.status(404).json({ message: "Not found" });
    res.json(emp);
  } catch {
    res.status(400).json({ message: "Error updating" });
  }
});

// DELETE
router.delete("/employees/:id", async (req, res) => {
  try {
    const emp = await Employee.findByIdAndDelete(req.params.id);
    if (!emp) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted" });
  } catch {
    res.status(400).json({ message: "Error deleting" });
  }
});

module.exports = router;
