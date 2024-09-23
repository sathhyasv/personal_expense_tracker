const express = require('express');
const Income = require('../models/incomeModel');

const router = express.Router();

// Create Income
router.post('/', async (req, res) => {
  try {
    const income = new Income(req.body);
    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get Incomes for a specific user
router.get('/', async (req, res) => {
  const userId = req.query.userId; // Get userId from query parameters
  try {
    const incomes = await Income.find({ userId }); // Filter by userId
    res.json(incomes);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete Income
router.delete('/:id', async (req, res) => {
  try {
    const incomeId = req.params.id;
    await Income.findByIdAndDelete(incomeId);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).send('Server error');
  }
});

module.exports = router;
