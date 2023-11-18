import "../styles/home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const login = () => {
    navigate("/login");
  };
    
  return (
    <>
      <div>
        <div className="">
          <h3 className="">Home</h3>
        </div>
        <div>
          <button type="submit" className="" onClick={login}>
            Login
          </button>
        </div>
      </div>
      <div className="">
        <div
          className=""
        >
          <p className="">Hello User👋</p>
        </div>
      </div>
    </>
  );
};
export default Home;
