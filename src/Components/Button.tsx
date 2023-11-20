import { CgSpinner as Loader } from "react-icons/cg";

interface ButtonProps {
  text: string;
  loading: boolean;
}

const Button = ({ text, loading }: ButtonProps) => {
  return (
    <button
      className="button button-large button-primary"
      disabled={loading}
      type="submit"
    >
      {!loading ? text : <Loader className="spinner" />}
    </button>
  );
};

export default Button;
