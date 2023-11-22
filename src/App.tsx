import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute, PrivateRouteProps } from "./Auth/PrivateRoute";

import Home from "./Pages/Home";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";

const defaultPrivateRouteProps: Omit<PrivateRouteProps, "outlet"> = {
  authenticationPath: "/login",
};

function App() {
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
