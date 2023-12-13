import { CardDetails } from "account/Card/CardDetails";
import { Login } from "auth/login/Login";
import { Logout } from "auth/logout/Logout";
import { ExpenseForm } from "dashboard/expenseAddition/ExpenseForm";
import { IncomeForm } from "dashboard/incomeAddition/IncomeForm";
import React from "react";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";
import Footer from "shared/Footbar";
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
  const user = useSelector(users);
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
            <Route path="/add-income" element={<IncomeForm />} />
            <Route path="/add-card" element={<CardDetails/>}/>
          </Route>
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
      {user.isLoggedIn && <Footer />}
    </div>
  );
};

export default AppRouter;
