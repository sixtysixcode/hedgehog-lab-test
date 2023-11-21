import "../styles/auth.scss";

import Button from "./Button";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

interface SignupFormProps {
  onSubmit: (data: any) => void;
  loading: boolean;
  loginLink?: boolean;
}

const SignupForm = ({ onSubmit, loading, loginLink }: SignupFormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  return (
    <form className="" autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
      <div className="auth__form__col">
        <div className="auth__form__row">
          <label className="form-label">First Name</label>
          <input
            type="text"
            className="form-input"
            id="formControlInput1"
            {...register("firstname", {
              required: "Firstname is required!",
            })}
          />
          {errors.firstname && (
            <p className="text-danger">
              {errors.firstname.message?.toString()}
            </p>
          )}
        </div>
      </div>
      <div className="auth__form__col">
        <div className="auth__form__row">
          <label className="form-label">Last Name</label>
          <input
            type="text"
            className="form-input"
            id="exampleFormControlInput2"
            {...register("lastname", {
              required: "Lastname is required!",
            })}
          />
        </div>
        {errors.lastname && (
          <p className="text-danger">{errors.lastname.message?.toString()}</p>
        )}
      </div>
      <div className="auth__form__col">
        <div className="auth__form__row">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-input"
            id="exampleFormControlInput3"
            {...register("email", { required: "Email is required!" })}
          />
        </div>
        {errors.email && (
          <p className="text-danger">{errors.email.message?.toString()}</p>
        )}
      </div>
      <div className="auth__form__col">
        <div className="auth__form__row">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-input"
            id="exampleFormControlInput5"
            {...register("password", {
              required: "Password is required!",
            })}
          />
        </div>
        {errors.password && (
          <p className="text-danger">{errors.password.message?.toString()}</p>
        )}
      </div>
      <div className="auth__form__col">
        <div className="auth__form__row">
          <label className="form-label">Confirm Password</label>
          <input
            type="password"
            className="form-input"
            id="exampleFormControlInput6"
            {...register("cpassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords don't match.",
            })}
          />
        </div>
        {errors.cpassword && (
          <p className="text-danger">{errors.cpassword.message?.toString()}</p>
        )}
      </div>
      <div>
        <Button text={"Submit"} loading={loading} large />
        {loginLink && (
          <p className="text-right">
            Already have an account?{" "}
            <Link style={{ textDecoration: "none" }} to={"/login"}>
              Log In
            </Link>
          </p>
        )}
      </div>
    </form>
  );
};

export default SignupForm;
