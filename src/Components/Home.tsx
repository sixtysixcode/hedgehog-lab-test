import "../styles/home.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState, useEffect, useCallback } from "react";
import { MdDelete } from "react-icons/md";
import Footer from "./Footer";
import Button from "./Button";
import HedgehogLogo from "./HedgehogLogo";

interface userInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  display_picture: string;
}

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setIsLoading] = useState(false);

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("auth");
    setIsLoading(false);
    navigate("/login");
  };

  const deleteUser = (id: number) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }  
      axios
        .delete(`http://localhost:3002/api/users/${id}`, config)
        .then(function (response) {
          console.log("user deleted", response);
          toast.success("User deleted.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
          fetchUsers();
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
  }

  const fetchUsers = useCallback(
    (data?: any) => {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          per_page: data?.perPage ?? null,
          page: data?.page ?? null,
        },
      };

      axios
        .get("http://localhost:3002/api/users", config)
        .then(function (response) {
          setUsers(response.data.data);
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
    },
    [token]
  );

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <>
      <div className="home">
        <div className="inline-row home__header">
          <div className="inline-row home__header-inner">
            <HedgehogLogo />
            <h1>Home</h1>
          </div>
          <div>
            <Button onClick={logout} text={"Logout"} loading={loading} />
          </div>
        </div>

        <div className="home__body">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Display Picture</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {users &&
                users.map((user: userInterface, id: number) => {
                  return (
                    <tr key={`user-${id}`}>
                      <td className="bold">{user.id}</td>
                      <td>
                        <div className="home__body__image">
                          <img src={user.display_picture} alt="User" />
                        </div>
                      </td>
                      <td>{user.first_name}</td>
                      <td>{user.last_name}</td>
                      <td>{user.email}</td>
                      <td>
                        <div
                          className="home__body__action action-delete"
                          onClick={() => deleteUser(user.id)}
                        >
                          <MdDelete className="icon icon-red" size={25} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Footer />
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
export default Home;
