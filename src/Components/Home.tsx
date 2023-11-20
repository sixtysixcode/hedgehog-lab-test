import "../styles/home.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast, Flip } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState, useEffect, useCallback } from "react";
import { MdDelete } from "react-icons/md";

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

  const logout = () => {
    localStorage.removeItem("auth");
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
      let perPage = 10;
      let page = 1;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          per_page: data?.perPage ?? perPage,
          page: data?.page ?? page,
        },
      };

      axios
        .get("http://localhost:3002/api/users", config)
        .then(function (response) {
          console.log("user data", response);
          toast.success("Users fetched.", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: 0,
            toastId: "my_toast",
          });
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
          <h1 className="">Home</h1>
          <div>
            <button
              type="submit"
              className="button button-primary"
              onClick={logout}
            >
              Logout
            </button>
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
                        <td>{user.id}</td>
                        <td>
                          <div className="home__body__image">
                            <img src={user.display_picture} alt="User" />
                          </div>
                        </td>
                        <td>{user.first_name}</td>
                        <td>{user.last_name}</td>
                        <td>{user.email}</td>
                        <td className="home__body__actions">
                          <div onClick={() => deleteUser(user.id)}>
                            <MdDelete className="icon icon-red"  size={25} />
                          </div>
                        </td>
                      </tr>
                  );
                })}
            </tbody>
          </table>
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
export default Home;
