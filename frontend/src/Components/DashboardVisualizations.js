import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

// Register the components
Chart.register(ArcElement, Tooltip, Legend);

const DashboardVisualizations = ({ expenses }) => {
  const categories = {};

  expenses.forEach(expense => {
    categories[expense.category] = (categories[expense.category] || 0) + parseFloat(expense.amount);
  });

  const data = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  return (
    <div>
      <h2>Expense Distribution by Category</h2>
      <Pie data={data} />
    </div>
  );
};

export default DashboardVisualizations;
