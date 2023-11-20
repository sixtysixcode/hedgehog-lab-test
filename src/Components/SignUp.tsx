import { ToastContainer, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import "../styles/auth.scss";
import signupImage from "../images/signup-image.jpg";
import SignupForm from "./SignupForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const { reset } = useForm();

  const submitData = (data: any) => {
    setLoading(true);
    let params = {
      first_name: data.firstname,
      last_name: data.lastname,
      email: data.email,
      password: data.password,
      password_confirmation: data.cpassword,
    };
    console.log(data);
    axios
      .post("http://localhost:3002/api/register", params)
      .then(function (response) {
        toast.success("Registration successful, redirecting...", {
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
          setLoading(false);
          navigate("/login");
        }, 3000);
      })
      .catch(function (error) {
        console.log(error);
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
        <div className="auth__form">
          <h1 className="">Sign Up Form</h1>
          <SignupForm onSubmit={submitData} loading={loading} loginLink />
        </div>

        <div className="auth__image">
          <img src={signupImage} alt="Google Deep Mind" />
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
