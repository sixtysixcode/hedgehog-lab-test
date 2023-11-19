import "../styles/home.scss";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <div>
        <div className="">
          <h3 className="">Home</h3>
        </div>
        <div>
          <button type="submit" className="" onClick={logout}>
            Logout
          </button>
        </div>
      </div>
      <div className="">
        <div className="">
          <p className="">Hello User👋</p>
        </div>
      </div>
    </>
  );
};
export default Home;
