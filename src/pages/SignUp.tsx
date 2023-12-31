import "react-toastify/dist/ReactToastify.min.css";
import "../styles/auth.scss";

import { Flip, ToastContainer } from "react-toastify";

import HedgehogLogo from "../Components/HedgehogLogo";
import SignupForm from "../Components/SignupForm";
import axios from "axios";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

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
          <h1 className="no-margin-btm">Sign Up</h1>
          <SignupForm onSubmit={submitData} loading={loading} loginLink />
        </div>

        <div className="auth__image signup-image" />
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
