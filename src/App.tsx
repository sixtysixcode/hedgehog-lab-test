import SignUp from "./Components/SignUp";
import Login from "./Components/Login";
import Home from "./Components/Home";
import { PrivateRoute, PrivateRouteProps } from "./Auth/PrivateRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const defaultPrivateRouteProps: Omit<PrivateRouteProps, 'outlet'> = {
  isAuthenticated: !!localStorage.getItem("auth"),
  authenticationPath: '/login',
};

function App() {

  console.log("props", defaultPrivateRouteProps);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute {...defaultPrivateRouteProps} outlet={<Home />} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
