const express = require('express');
const Expense = require('../models/expenseModel');

const router = express.Router();

// Create Expense
router.post('/', async (req, res) => {
  try {
    // Get userId from the request body
    const { userId, description, amount, category, date } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const expense = new Expense({
      userId, // Save the userId
      description,
      amount,
      category,
      date,
    });

    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  const { userId } = req.query; // Get userId from query params
  try {
    const expenses = await Expense.find({ userId }); // Find expenses for the user
    res.json(expenses);
  } catch (error) {
    res.status(500).send('Server error');
  }
});

// Delete Expense
router.delete('/:id', async (req, res) => {
  try {
    const expenseId = req.params.id;
    await Expense.findByIdAndDelete(expenseId);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).send('Server error');
  }
});
module.exports = router;
