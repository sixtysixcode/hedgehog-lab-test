import "react-toastify/dist/ReactToastify.min.css";
import "../styles/auth.scss";

import { Flip, ToastContainer, toast } from "react-toastify";

import HedgehogLogo from "../Components/HedgehogLogo";
import LoginForm from "../Components/LoginForm";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const login = (data: any) => {
    setLoading(true);
    let params = {
      email: data.email,
      password: data.password,
    };
    axios
      .post("http://localhost:3002/api/login", params)
      .then(function (response) {
        if (response.data?.token) {
          toast.success("Login successful, redirecting...", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          localStorage.setItem("auth", response.data.token);
          setTimeout(() => {
            setLoading(false);
            navigate("/");
          }, 2000);
        }
      })
      .catch(function (error) {
        setLoading(false);
        toast.error(error.response.data.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
      });
  };

  return (
    <>
      <div className="auth">
        <HedgehogLogo />
        <div className="auth__form">
          <h1 className="no-margin-btm">Login</h1>
          <LoginForm onSubmit={login} loading={loading} />
        </div>

        <div className="auth__image login-image" />
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        limit={1}
        transition={Flip}
      />
    </>
  );
};
export default Login;
