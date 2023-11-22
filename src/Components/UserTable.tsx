import "../styles/table.scss";

import { MdDelete } from "react-icons/md";

interface UserInterface {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  display_picture: string;
}

interface UserTableProps {
  users: any[];
  deleteUser: (id: number) => void;
}

const UserTable = ({ users, deleteUser }: UserTableProps) => {
  return (
    <table className="table">
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
          users.map((user: UserInterface, id: number) => {
            return (
              <tr key={`user-${id}`}>
                <td className="bold">{user.id}</td>
                <td>
                  <div className="circle-image">
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
  );
};

export default UserTable;
