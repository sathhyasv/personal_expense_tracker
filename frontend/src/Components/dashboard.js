import React, { useState, useEffect } from 'react';

const Dashboard = ({ incomes, expenses }) => {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [filteredExpenses, setFilteredExpenses] = useState([]);
  const [filterType, setFilterType] = useState('lastWeek'); // default filter
  const [customDateRange, setCustomDateRange] = useState({
    startDate: '',
    endDate: ''
  });

  useEffect(() => {
    calculateTotals();
  }, [incomes, expenses]);

  // Function to calculate total income and expenses
  const calculateTotals = () => {
    const incomeTotal = incomes.reduce((acc, income) => acc + parseFloat(income.amount), 0);
    const expenseTotal = expenses.reduce((acc, expense) => acc + parseFloat(expense.amount), 0);
    setTotalIncome(incomeTotal);
    setTotalExpenses(expenseTotal);
  };

  // Function to filter expenses based on selected date range
  const filterExpensesByDate = () => {
    const today = new Date();
    let filtered = expenses;

    switch (filterType) {
      case 'lastWeek':
        filtered = expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          const lastWeek = new Date(today);
          lastWeek.setDate(today.getDate() - 7);
          return expenseDate >= lastWeek && expenseDate <= today;
        });
        break;
      case 'lastMonth':
        filtered = expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          const lastMonth = new Date(today);
          lastMonth.setMonth(today.getMonth() - 1);
          return expenseDate >= lastMonth && expenseDate <= today;
        });
        break;
      case 'custom':
        const { startDate, endDate } = customDateRange;
        filtered = expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          return expenseDate >= new Date(startDate) && expenseDate <= new Date(endDate);
        });
        break;
      default:
        break;
    }

    setFilteredExpenses(filtered);
  };

  // Handle custom date range input
  const handleCustomDateChange = (e) => {
    const { name, value } = e.target;
    setCustomDateRange({ ...customDateRange, [name]: value });
  };

  useEffect(() => {
    filterExpensesByDate();
  }, [filterType, customDateRange, expenses]);

  return (
    <div className="dashboard-container">
      <h2>Expense & Income Dashboard</h2>
      <div className="totals">
        <p>Total Income: ${totalIncome.toFixed(2)}</p>
        <p>Total Expenses: ${totalExpenses.toFixed(2)}</p>
      </div>
      <div className="filters">
        <label>
          Filter by:
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="lastWeek">Last Week</option>
            <option value="lastMonth">Last Month</option>
            <option value="custom">Custom Date Range</option>
          </select>
        </label>

        {filterType === 'custom' && (
          <div className="custom-date-range">
            <label>
              Start Date:
              <input
                type="date"
                name="startDate"
                value={customDateRange.startDate}
                onChange={handleCustomDateChange}
              />
            </label>
            <label>
              End Date:
              <input
                type="date"
                name="endDate"
                value={customDateRange.endDate}
                onChange={handleCustomDateChange}
              />
            </label>
          </div>
        )}
      </div>
      <div className="filtered-expenses">
        <h3>Filtered Expenses</h3>
        <ul>
          {filteredExpenses.map((expense, index) => (
            <li key={index}>
              {expense.description} - ${expense.amount} on {expense.date}
            </li>
          ))}
        </ul>
      </div>
      {/* Add CSS styles here */}
      <style jsx>{`
        .dashboard-container {
          padding: 20px;
        }
        .totals {
          margin-bottom: 20px;
        }
        .filters {
          margin-bottom: 20px;
        }
        .custom-date-range {
          margin-top: 10px;
        }
        .filtered-expenses ul {
          list-style: none;
          padding-left: 0;
        }
        .filtered-expenses li {
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
