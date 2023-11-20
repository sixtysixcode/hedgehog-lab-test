import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import loginImage from "../images/login-image.jpg";
import "../styles/auth.scss";

const Login = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
    
  const login = (data: any) => {
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
            navigate("/");
          }, 3000);
        }
      })
      .catch(function (error) {
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
        <div className="auth__form">
          <h1>Login</h1>
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
                <p className="auth__form__error text-danger" style={{ fontSize: 14 }}>
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
                <p className="text-right text-danger" style={{ fontSize: 14 }}>
                  {errors.password.message?.toString()}
                </p>
              )}
            </div>
            <div>
              <button className="button button-large button-primary" type="submit">
                Submit
              </button>
              <p className="text-right">
                Don't have an Account?{" "}
                <Link style={{ textDecoration: "none" }} to={"/register"}>
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>

        <div className="auth__image">
          <img src={loginImage} alt="Google Deep Mind" />
        </div>
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
