import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Expense from './Expense'; // Import Expense component
import Navbar from './Components/Navbar'; // Import your Navbar
import Dashboard from './Components/dashboard'; // Import your Dashboard component

const App = () => {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/expense" element={<Expense />} /> {/* Add this route */}
          <Route path="/" element={<Login />} /> {/* Default route */}
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
