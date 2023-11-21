import "../styles/home.scss";
import "react-toastify/dist/ReactToastify.min.css";

import { Flip, ToastContainer, toast } from "react-toastify";
import { useCallback, useEffect, useState } from "react";

import Button from "./Button";
import { FaWindowClose } from "react-icons/fa";
import Footer from "./Footer";
import HedgehogLogo from "./HedgehogLogo";
import { MdDelete } from "react-icons/md";
import Modal from "react-modal";
import Pagination from "./Pagination";
import SignupForm from "./SignupForm";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface userInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  display_picture: string;
}

Modal.setAppElement("#root");

const Home = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("auth");
  const [users, setUsers] = useState<any[]>([]);
  const [numberOfPages, setNumberOfPages] = useState<number>(1);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const { reset } = useForm();

  const logout = () => {
    setLoading(true);
    localStorage.removeItem("auth");
    setLoading(false);
    navigate("/login");
  };

  const createUser = (data: any) => {
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
        toast.success("Registration successful.", {
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
        fetchUsers({ page: currentPage });
        setTimeout(() => {
          setLoading(false);
          setModalOpen(false);
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

  const deleteUser = (id: number) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
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
        fetchUsers({ page: currentPage });
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
  };

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
          setNumberOfPages(response.data.total_pages);
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
    fetchUsers({ page: 1 });
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
          <div className="home__body__header">
            <Button text={"Add User"} onClick={() => setModalOpen(true)} />
          </div>
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
                          className="icon square-icon icon-delete"
                          onClick={() => deleteUser(user.id)}
                        >
                          <MdDelete size={25} />
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
        <Pagination
          pages={numberOfPages}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          fetchUsers={fetchUsers}
        />
        <Footer />
      </div>

      <Modal
        isOpen={modalOpen}
        onRequestClose={() => setModalOpen(false)}
        contentLabel="Add New User"
        className={"home__modal"}
      >
        <div className="icon icon-close" onClick={() => setModalOpen(false)}>
          <FaWindowClose />
        </div>
        <h2>Add User</h2>
        <SignupForm onSubmit={createUser} loading={loading} />
      </Modal>

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
