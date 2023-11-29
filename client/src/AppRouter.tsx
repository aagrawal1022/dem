import { Login } from "auth/login/Login";
import { Logout } from "auth/logout/Logout";
import { ExpenseForm } from "dashboard/expenseAddition/ExpenseForm";
import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import { NavigationBar } from "shared/NavigationBar";
import { users } from "store/slices/authSlice";

const PrivateRoute = () => {
  const user = useSelector(users);
  return user.isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const RedirectIfLoggedIn = () => {
  const user = useSelector(users);
  return user.isLoggedIn ? <Navigate to="/add-expense" replace /> : <Outlet />;
};

const AppRouter = () => {
  return (
    <div>
      <NavigationBar handleDrawerOpen={() => {}} />
      <Router>
        <Routes>
          <Route path="/" element={<RedirectIfLoggedIn />}>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
          </Route>
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/add-expense" element={<ExpenseForm />} />
          </Route>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
};

export default AppRouter;
