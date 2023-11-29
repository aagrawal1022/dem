import { Login } from "auth/login/Login";
import { ExpenseForm } from "dashboard/expenseAddition/ExpenseForm";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NavigationBar } from "shared/NavigationBar";

const AppRouter = () => {
  return (
    <div>
      <NavigationBar handleDrawerOpen={() => {}} />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/add-expense" element={<ExpenseForm />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;