import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

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
      .post("http://localhost:3000/api/login", params)
      .then(function (response) {
        //   IF EMAIL ALREADY EXISTS
        if (response.data.success === false) {
          toast.error(response.data.message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
        } else {
          toast.success("Login Successful, redirecting...", {
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
        console.log(error);
      });
  };
    
  return (
    <>
      <div className="">
        <div
          className=""
        >
          <div className="">
            <div className="">
              <div className="">
                <h3 className="">
                  Login Form
                </h3>
                <form autoComplete="off" onSubmit={handleSubmit(login)}>
                  <div className="">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      id="exampleFormControlInput1"
                      {...register("email", { required: "Email is required!" })}
                    />
                    {errors.email && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.email.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <label className="form-label">Password</label>
                    <input
                      type="password"
                      className="form-input"
                      id="exampleFormControlInput2"
                      {...register("password", {
                        required: "Password is required!",
                      })}
                    />
                    {errors.password && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.password.message?.toString()}
                      </p>
                    )}
                  </div>
                  <div className="">
                    <button
                      className=""
                      type="submit"
                    >
                      Submit
                    </button>
                    <p className="">
                      Have an Account?{" "}
                      <Link style={{ textDecoration: "none" }} to={"/register"}>
                        Sign Up
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
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
