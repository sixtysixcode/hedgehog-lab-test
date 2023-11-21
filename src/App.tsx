import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute, PrivateRouteProps } from "./Auth/PrivateRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const defaultPrivateRouteProps: Omit<PrivateRouteProps, "outlet"> = {
  isAuthenticated: !!localStorage.getItem("auth"),
  authenticationPath: "/login",
};

function App() {
  console.log("props", defaultPrivateRouteProps);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute {...defaultPrivateRouteProps} outlet={<Home />} />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
