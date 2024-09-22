import React, { useState, useEffect } from 'react';
import { auth } from './firebase'; // Import Firebase auth
import Dashboard from './Components/dashboard';
import './expense.css';

const Expense = () => {
  const [showForm, setShowForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [expenseInput, setExpenseInput] = useState({
    description: '',
    amount: '',
    category: '',
    date: ''
  });
  const [incomeInput, setIncomeInput] = useState({
    source: '',
    amount: '',
    date: ''
  });
  const [userId, setUserId] = useState(null);

  // Get user ID from Firebase on component mount
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

  // Fetch expenses on component mount
  useEffect(() => {
    const fetchExpenses = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:5000/api/expenses?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setExpenses(data);
          }
        } catch (error) {
          console.error('Error fetching expenses:', error);
        }
      }
    };
    fetchExpenses();
  }, [userId]);

  // Fetch incomes on component mount
  useEffect(() => {
    const fetchIncomes = async () => {
      if (userId) {
        try {
          const response = await fetch(`http://localhost:5000/api/incomes?userId=${userId}`);
          if (response.ok) {
            const data = await response.json();
            setIncomes(data);
          }
        } catch (error) {
          console.error('Error fetching incomes:', error);
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

  // Submit Expense
  const handleExpenseSubmit = async (e) => {
    e.preventDefault();
    const expenseData = { ...expenseInput, userId };

    try {
      const response = await fetch('http://localhost:5000/api/expenses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(expenseData)
      });

      if (response.ok) {
        const newExpense = await response.json();
        setExpenses([...expenses, newExpense]);
      }
    } catch (error) {
      console.error('Error adding expense:', error);
    }

    setExpenseInput({ description: '', amount: '', category: '', date: '' });
    setShowForm(false);
  };

  // Submit Income
  const handleIncomeSubmit = async (e) => {
    e.preventDefault();
    const incomeData = { ...incomeInput, userId };

    try {
      const response = await fetch('http://localhost:5000/api/incomes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incomeData)
      });

      if (response.ok) {
        const newIncome = await response.json();
        setIncomes([...incomes, newIncome]);
      }
    } catch (error) {
      console.error('Error adding income:', error);
    }

    setIncomeInput({ source: '', amount: '', date: '' });
    setShowIncomeForm(false);
  };

  // Delete Expense
  const handleDeleteExpense = async (index) => {
    const expenseId = expenses[index]._id; // Assuming your expense has an `_id` field
  
    try {
      const response = await fetch(`http://localhost:5000/api/expenses/${expenseId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setExpenses(expenses.filter((_, i) => i !== index));
      } else {
        console.error('Failed to delete expense');
      }
    } catch (error) {
      console.error('Error deleting expense:', error);
    }
  };

  // Delete Income
  const handleDeleteIncome = async (index) => {
    const incomeId = incomes[index]._id; // Assuming your income has an `_id` field
  
    try {
      const response = await fetch(`http://localhost:5000/api/incomes/${incomeId}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setIncomes(incomes.filter((_, i) => i !== index));
      } else {
        console.error('Failed to delete income');
      }
    } catch (error) {
      console.error('Error deleting income:', error);
    }
  };

  return (
    <div className="expense-container">
      <header className="header">
        <h1>Expense & Income Tracker</h1>
      </header>

      <div className="card">
        <button className="button" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : 'Add Expense'}
        </button>
        {showForm && (
          <form className="expense-form" onSubmit={handleExpenseSubmit}>
            <div className="form-group">
              <label>Description:</label>
              <input type="text" name="description" value={expenseInput.description} onChange={handleExpenseChange} required />
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input type="number" name="amount" value={expenseInput.amount} onChange={handleExpenseChange} required />
            </div>
            <div className="form-group">
              <label>Category:</label>
              <input type="text" name="category" value={expenseInput.category} onChange={handleExpenseChange} required />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input type="date" name="date" value={expenseInput.date} onChange={handleExpenseChange} required />
            </div>
            <button className="button" type="submit">Add Expense</button>
          </form>
        )}
      </div>

      <div className="card">
        <h2>Expenses</h2>
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

      <div className="card">
        <button className="button" onClick={() => setShowIncomeForm(!showIncomeForm)}>
          {showIncomeForm ? 'Cancel' : 'Add Income'}
        </button>
        {showIncomeForm && (
          <form className="income-form" onSubmit={handleIncomeSubmit}>
            <div className="form-group">
              <label>Source:</label>
              <input type="text" name="source" value={incomeInput.source} onChange={handleIncomeChange} required />
            </div>
            <div className="form-group">
              <label>Amount:</label>
              <input type="number" name="amount" value={incomeInput.amount} onChange={handleIncomeChange} required />
            </div>
            <div className="form-group">
              <label>Date:</label>
              <input type="date" name="date" value={incomeInput.date} onChange={handleIncomeChange} required />
            </div>
            <button className="button" type="submit">Add Income</button>
          </form>
        )}
      </div>

      <div className="card">
        <h2>Incomes</h2>
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

      {/* Dashboard Section */}
      <div className="card">
        <button className="button" onClick={() => setShowDashboard(!showDashboard)}>
          {showDashboard ? 'Hide Dashboard' : 'Show Dashboard'}
        </button>
        {showDashboard && <Dashboard expenses={expenses} incomes={incomes} />}
      </div>
    </div>
  );
};

export default Expense;
