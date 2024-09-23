// src/Expense.js
import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import Firebase auth
import './expense.css';

const predefinedCategories = ['Food', 'Travel', 'Entertainment', 'Utilities', 'Others'];

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenseInput, setExpenseInput] = useState({
    description: '',
    amount: '',
    category: '',
    customCategory: '',
    date: ''
  });
  const [incomeInput, setIncomeInput] = useState({
    source: '',
    amount: '',
    date: ''
  });
  const [userId, setUserId] = useState(null);
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setUserId(user.uid);
      } else {
        setUserId(null);
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (userId) {
        const response = await fetch(`http://localhost:5000/api/expenses?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setExpenses(data);
        }
      }
    };
    fetchExpenses();
  }, [userId]);

  useEffect(() => {
    const fetchIncomes = async () => {
      if (userId) {
        const response = await fetch(`http://localhost:5000/api/incomes?userId=${userId}`);
        if (response.ok) {
          const data = await response.json();
          setIncomes(data);
        }
      }
    };
    fetchIncomes();
  }, [userId]);

  const handleExpenseChange = (e) => {
    setExpenseInput({ ...expenseInput, [e.target.name]: e.target.value });
  };

  const handleIncomeChange = (e) => {
    setIncomeInput({ ...incomeInput, [e.target.name]: e.target.value });
  };

  const validateDate = (date) => {
    return date <= today;
  };

  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear error message

    // Validate that the date is not in the future
    if (!validateDate(expenseInput.date)) {
      setError('Expense date cannot be in the future.');
      return;
    }

    // Use custom category if provided, otherwise use selected predefined category
    const finalCategory = expenseInput.customCategory.trim() !== '' ? expenseInput.customCategory : expenseInput.category;
    
    if (!finalCategory) {
      setError('Please select a category or enter a custom category.');
      return;
    }

    const expenseData = { 
      description: expenseInput.description, 
      amount: expenseInput.amount, 
      category: finalCategory, 
      date: expenseInput.date, 
      userId 
    };

    const response = await fetch('http://localhost:5000/api/expenses', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData)
    });
    if (response.ok) {
      const newExpense = await response.json();
      setExpenses([...expenses, newExpense]);
    }

    // Reset form
    setExpenseInput({ description: '', amount: '', category: '', customCategory: '', date: '' });
  };

  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear error message

    if (!validateDate(incomeInput.date)) {
      setError('Income date cannot be in the future.');
      return;
    }

    const incomeData = { ...incomeInput, userId };
    const response = await fetch('http://localhost:5000/api/incomes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(incomeData)
    });
    if (response.ok) {
      const newIncome = await response.json();
      setIncomes([...incomes, newIncome]);
    }

    setIncomeInput({ source: '', amount: '', date: '' });
  };

  const handleDeleteExpense = async (index) => {
    const expenseId = expenses[index]._id;
    const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, { method: 'DELETE' });
    if (response.ok) {
      setExpenses(expenses.filter((_, i) => i !== index));
    }
  };

  const handleDeleteIncome = async (index) => {
    const incomeId = incomes[index]._id;
    const response = await fetch(`http://localhost:5000/api/incomes/${incomeId}`, { method: 'DELETE' });
    if (response.ok) {
      setIncomes(incomes.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="expense-container">
      <div className="header">
        <h1>Expense Tracker</h1>
      </div>
      
      {error && <p className="error-message">{error}</p>}

      <div className="cards-container">
        <div className="card expense-card">
          <h2>Expenses</h2>
          <form onSubmit={handleExpenseSubmit} className="form">
            <input type="text" name="description" placeholder="Description" value={expenseInput.description} onChange={handleExpenseChange} required />
            <input type="number" name="amount" placeholder="Amount" value={expenseInput.amount} onChange={handleExpenseChange} required />

            <select name="category" value={expenseInput.category} onChange={handleExpenseChange} required>
              <option value="">Select a category</option>
              {predefinedCategories.map((category, index) => (
                <option key={index} value={category}>{category}</option>
              ))}
            </select>

            <input type="text" name="customCategory" placeholder="Custom Category (optional)" value={expenseInput.customCategory} onChange={handleExpenseChange} />

            <input type="date" name="date" value={expenseInput.date} onChange={handleExpenseChange} max={today} required />
            <button type="submit" className="action-button">Add Expense</button>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th>Description</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={expense._id}>
                  <td>{expense.description}</td>
                  <td>${expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                  <td>
                    <button onClick={() => handleDeleteExpense(index)} className="action-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card income-card">
          <h2>Incomes</h2>
          <form onSubmit={handleIncomeSubmit} className="form">
            <input type="text" name="source" placeholder="Source" value={incomeInput.source} onChange={handleIncomeChange} required />
            <input type="number" name="amount" placeholder="Amount" value={incomeInput.amount} onChange={handleIncomeChange} required />
            <input type="date" name="date" value={incomeInput.date} onChange={handleIncomeChange} max={today} required />
            <button type="submit" className="action-button">Add Income</button>
          </form>

          <table className="table">
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income, index) => (
                <tr key={income._id}>
                  <td>{income.source}</td>
                  <td>${income.amount}</td>
                  <td>{income.date}</td>
                  <td>
                    <button onClick={() => handleDeleteIncome(index)} className="action-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Expense;
