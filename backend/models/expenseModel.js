const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  description: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  userId: { type: String, required: true } // assuming you'll associate this with a user
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
