import { useEffect, useState }
from "react";

import API from "../../services/api";

import Navbar
from "../../components/Navbar";



function UsersPage() {

  const [users, setUsers] =
    useState([]);




  const fetchUsers = async () => {

    try {

      const res = await API.get(
        "/admin/users"
      );

      setUsers(res.data);

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {

    fetchUsers();

  }, []);




  return (

    <div>

      <Navbar />

      <div className="p-8">

        <h1
          className="
            text-3xl
            font-bold
            mb-6
          "
        >
          Users
        </h1>



        <table
          className="
            w-full
            bg-white
            shadow-md
          "
        >

          <thead>

            <tr className="bg-gray-200">

              <th className="p-4">
                Name
              </th>

              <th className="p-4">
                Email
              </th>

              <th className="p-4">
                Address
              </th>

              <th className="p-4">
                Role
              </th>

            </tr>

          </thead>



          <tbody>

            {users.map((user) => (

              <tr
                key={user.id}
                className="border-b"
              >

                <td className="p-4">
                  {user.name}
                </td>

                <td className="p-4">
                  {user.email}
                </td>

                <td className="p-4">
                  {user.address}
                </td>

                <td className="p-4">
                  {user.role}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default UsersPage;