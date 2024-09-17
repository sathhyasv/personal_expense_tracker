// Expense.js
import React, { useState } from 'react';

const Expense = () => {
  const [showForm, setShowForm] = useState(false);
  const [expenses, setExpenses] = useState([]);
  const [formData, setFormData] = useState({
    description: '',
    amount: '',
    category: '',
    date: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setExpenses([...expenses, formData]);
    setFormData({ description: '', amount: '', category: '', date: '' });
    setShowForm(false);
  };

  return (
    <div className="expense-container">
      {showForm && (
        <div className="expense-form">
          <form onSubmit={handleSubmit}>
            <label>Description:
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </label>
            <label>Amount:
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </label>
            <label>Category:
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </label>
            <label>Date:
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </label>
            <button type="submit">Submit</button>
          </form>
        </div>
      )}

      <button
        className="add-button"
        onClick={() => setShowForm(!showForm)}
      >
        +
      </button>

      <table>
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <tr key={index}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>{expense.date}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <style jsx>{`
        .expense-container {
          position: relative;
          padding: 20px;
        }
        .expense-form {
          position: absolute;
          top: 0;
          right: 0;
          width: 300px;
          background: #fff;
          border: 1px solid #ddd;
          padding: 20px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
        }
        .add-button {
          position: fixed;
          bottom: 20px;
          right: 20px;
          font-size: 24px;
          border: none;
          background-color: #007bff;
          color: #fff;
          border-radius: 50%;
          width: 50px;
          height: 50px;
          text-align: center;
          line-height: 50px;
          cursor: pointer;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
        }
        th {
          background-color: #f4f4f4;
        }
      `}</style>
    </div>
  );
};

export default Expense;
