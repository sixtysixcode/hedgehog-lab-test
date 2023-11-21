import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/auth.scss";
import Button from "./Button";
import { useState } from "react";
import HedgehogLogo from "./HedgehogLogo";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    
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
          }, 3000);
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
          <form autoComplete="off" onSubmit={handleSubmit(login)}>
            <div className="auth__form__col">
              <div className="auth__form__row">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-input"
                  id="exampleFormControlInput1"
                  {...register("email", { required: "Email is required!" })}
                />
              </div>
              {errors.email && (
                <p className="auth__form__error text-danger">
                  {errors.email.message?.toString()}
                </p>
              )}
            </div>
            <div className="auth__form__col">
              <div className="auth__form__row">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-input"
                  id="exampleFormControlInput2"
                  {...register("password", {
                    required: "Password is required!",
                  })}
                />
              </div>
              {errors.password && (
                <p className="text-right text-danger">
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <Button text={"Login"} loading={loading} large />
              <p className="text-right">
                Don't have an Account?{" "}
                <Link style={{ textDecoration: "none" }} to={"/register"}>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
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
