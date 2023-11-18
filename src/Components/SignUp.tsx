import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  const submitData = (data: any) => {
    let params = {
      firstname: data.firstname,
      lastname: data.lastname,
      email: data.email,
      password: data.password,
      confirmpassword: data.cpassword,
    };
    console.log(data);
    axios
      .post("http://localhost:3000/api/register", params)
      .then(function (response) {
        toast.success("Registration Successful, redirecting...", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: false,
          progress: 0,
          toastId: "my_toast",
        });
        reset();
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <div className="">
        <div className="">
          <div className="">
            <div className="">
              <div className="">
                <h3 className="">Sign Up Form</h3>
                <form
                  className=""
                  autoComplete="off"
                  onSubmit={handleSubmit(submitData)}
                >
                  <div className="">
                    <div className="">
                      <label className="form-label">Firstname</label>
                      <input
                        type="text"
                        className="form-input"
                        id="formControlInput1"
                        {...register("firstname", {
                          required: "Firstname is required!",
                        })}
                      />
                      {errors.firstname && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.firstname.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <div className="">
                      <label className="form-label">Lastname</label>
                      <input
                        type="text"
                        className="form-input"
                        id="exampleFormControlInput2"
                        {...register("lastname", {
                          required: "Lastname is required!",
                        })}
                      />
                      {errors.lastname && (
                        <p className="text-danger" style={{ fontSize: 14 }}>
                          {errors.lastname.message?.toString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-input"
                      id="exampleFormControlInput3"
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
                      id="exampleFormControlInput5"
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
                  <div>
                    <label className="form-label">Confirm Password</label>
                    <input
                      type="password"
                      className="form-input"
                      id="exampleFormControlInput6"
                      {...register("cpassword", {
                        required: "Confirm Password is required",
                        validate: (value) =>
                          value === watch("password") ||
                          "Passwords don't match.",
                      })}
                    />
                    {errors.cpassword && (
                      <p className="text-danger" style={{ fontSize: 14 }}>
                        {errors.cpassword.message?.toString()}
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
                      Already have an account?{" "}
                      <Link style={{ textDecoration: "none" }} to={"/login"}>
                        Log In
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
export default SignUp;