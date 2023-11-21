import { CgSpinner as Loader } from "react-icons/cg";

interface ButtonProps {
  onClick?: () => void;
  text: string;
  loading?: boolean;
  large?: boolean;
}

const Button = ({ text, loading, onClick, large }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`button ${large && "button-large"} button-primary`}
      disabled={loading}
      type="submit"
    >
      {!loading ? text : <Loader className="spinner" />}
    </button>
  );
};

export default Button;
