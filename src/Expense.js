import React, { useState } from 'react';

const Expense = () => {
  const [showForm, setShowForm] = useState(false);
  const [showIncomeForm, setShowIncomeForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: ''
  });
  const [incomeData, setIncomeData] = useState({
    source: '',
    amount: '',
    date: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [customCategory, setCustomCategory] = useState('');
  const [categories, setCategories] = useState(['Food', 'Travel', 'Entertainment', 'Utilities', 'Others']);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleIncomeChange = (e) => {
    const { name, value } = e.target;
    setIncomeData({ ...incomeData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingIndex !== null) {
      const updatedExpenses = expenses.map((expense, index) =>
        index === editingIndex ? formData : expense
      );
      setExpenses(updatedExpenses);
      setEditingIndex(null);
    } else {
      setExpenses([...expenses, formData]);
    }
    setFormData({ description: '', amount: '', category: '', date: '' });
    setShowForm(false);
  };

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    setIncomes([...incomes, incomeData]);
    setIncomeData({ source: '', amount: '', date: '' });
    setShowIncomeForm(false);
  };

  const handleEdit = (index) => {
    setEditingIndex(index);
    setFormData(expenses[index]);
    setShowForm(true);
  };

  const handleDelete = (index) => {
    setExpenses(expenses.filter((_, i) => i !== index));
  };

  const addCustomCategory = () => {
    if (customCategory && !categories.includes(customCategory)) {
      setCategories([...categories, customCategory]);
      setCustomCategory('');
    }
  };

  return (
    <div className="expense-container">
      <header className="header">
        <h1>Expense & Income Tracker</h1>
        <button className="add-button" onClick={() => setShowForm(!showForm)}>
          Add Expense
        </button>
        <button className="add-button" onClick={() => setShowIncomeForm(!showIncomeForm)}>
          Add Income
        </button>
      </header>

      {showForm && (
        <div className="expense-form">
          <h2>{editingIndex !== null ? 'Edit Expense' : 'Add Expense'}</h2>
          <form onSubmit={handleSubmit}>
            <label>Description
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g., Groceries"
                required
              />
            </label>
            <label>Amount
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="e.g., 50"
                required
              />
            </label>
            <label>Category
              <select name="category" value={formData.category} onChange={handleChange} required>
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat}>{cat}</option>
                ))}
              </select>
            </label>
            <label>Custom Category
              <input
                type="text"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                placeholder="e.g., Medical"
              />
              <button type="button" onClick={addCustomCategory}>Add Custom Category</button>
            </label>
            <label>Date
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit" className="submit-button">
              {editingIndex !== null ? 'Update' : 'Add'}
            </button>
          </form>
        </div>
      )}

      {showIncomeForm && (
        <div className="income-form">
          <h2>Add Income</h2>
          <form onSubmit={handleIncomeSubmit}>
            <label>Source
              <input
                type="text"
                name="source"
                value={incomeData.source}
                onChange={handleIncomeChange}
                placeholder="e.g., Salary"
                required
              />
            </label>
            <label>Amount
              <input
                type="number"
                name="amount"
                value={incomeData.amount}
                onChange={handleIncomeChange}
                placeholder="e.g., 500"
                required
              />
            </label>
            <label>Date
              <input
                type="date"
                name="date"
                value={incomeData.date}
                onChange={handleIncomeChange}
                required
              />
            </label>
            <button type="submit" className="submit-button">Add Income</button>
          </form>
        </div>
      )}

      <table className="expense-table">
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
            <tr key={index}>
              <td>{expense.description}</td>
              <td>${expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
              <td>
                <button onClick={() => handleEdit(index)} className="action-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(index)} className="action-button">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className="income-table">
        <thead>
          <tr>
            <th>Source</th>
            <th>Amount</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {incomes.map((income, index) => (
            <tr key={index}>
              <td>{income.source}</td>
              <td>${income.amount}</td>
              <td>{income.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <footer className="footer">
        <p>Track your expenses and income efficiently to manage your budget effectively.</p>
      </footer>

      {/* CSS */}
      <style jsx>{`
        // (same styling as before, additional styles for income form/table can be added)
      `}</style>
    </div>
  );
};

export default Expense;
