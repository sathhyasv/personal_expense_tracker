// Dashboard.js
import React, { useState, useEffect } from 'react';
import { auth } from '../firebase'; // Import Firebase auth
import './Dashboard.css';
import DashboardVisualizations from './DashboardVisualizations';

const Dashboard = () => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [userId, setUserId] = useState(null);
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [filter, setFilter] = useState('lastWeek'); // Default filter

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
    const fetchData = async () => {
      if (userId) {
        try {
          const expensesResponse = await fetch(`http://localhost:5000/api/expenses?userId=${userId}`);
          const incomesResponse = await fetch(`http://localhost:5000/api/incomes?userId=${userId}`);
          
          const expensesData = await expensesResponse.json();
          const incomesData = await incomesResponse.json();

          setExpenses(expensesData);
          setIncomes(incomesData);

          const totalExp = expensesData.reduce((acc, expense) => acc + expense.amount, 0);
          const totalInc = incomesData.reduce((acc, income) => acc + income.amount, 0);

          setTotalExpenses(totalExp);
          setTotalIncome(totalInc);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    };
    fetchData();
  }, [userId]);

  return (
    <div className="dashboard-container">
      <h1>Dashboard</h1>
      <DashboardVisualizations expenses={expenses} incomes={incomes} />
      <div className="summary">
        <h2>Total Income: ${totalIncome}</h2>
        <h2>Total Expenses: ${totalExpenses}</h2>
      </div>
      <div className="filter">
        <select onChange={(e) => setFilter(e.target.value)} value={filter}>
          <option value="lastWeek">Last Week</option>
          <option value="lastMonth">Last Month</option>
          <option value="customRange">Custom Range</option>
        </select>
      </div>
      <div className="tables">
        <div className="expenses-table">
          <h3>Expenses</h3>
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
              {expenses.map((expense) => (
                <tr key={expense._id}>
                  <td>{expense.description}</td>
                  <td>${expense.amount}</td>
                  <td>{expense.category}</td>
                  <td>{expense.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="incomes-table">
          <h3>Incomes</h3>
          <table>
            <thead>
              <tr>
                <th>Source</th>
                <th>Amount</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income) => (
                <tr key={income._id}>
                  <td>{income.source}</td>
                  <td>${income.amount}</td>
                  <td>{income.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
