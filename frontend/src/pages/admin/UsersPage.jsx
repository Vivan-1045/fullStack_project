import { useEffect, useState } from "react";

import API from "../../services/api";

import Navbar from "../../components/Navbar";

function UsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "USER",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const createUser = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/users", formData);

      alert("User created successfully!");
      fetchUsers();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await API.get(
        `/admin/users?name=${search}`
      );

      setUsers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [search]);

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

        <form
          onSubmit={createUser}
          className="
    bg-white
    shadow-md
    p-6
    rounded
    mb-8
    grid
    grid-cols-2
    gap-4
  "
        >
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            className="border p-3 rounded"
            required
            minLength={8}
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />

          <select
            name="role"
            onChange={handleChange}
            className="border p-3 rounded"
          >
            <option value="USER">USER</option>

            <option value="OWNER">OWNER</option>

            <option value="ADMIN">ADMIN</option>
          </select>

          <button
            type="submit"
            className="
      bg-blue-600
      text-white
      rounded
      p-3
    "
          >
            Create User
          </button>
        </form>

        <input
          type="text"
          placeholder="Search user"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
    border
    p-3
    rounded
    mb-4
    w-full
  "
        />

        <table
          className="
            w-full
            bg-white
            shadow-md
          "
        >
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">Name</th>

              <th className="p-4">Email</th>

              <th className="p-4">Address</th>

              <th className="p-4">Role</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b">
                <td className="p-4">{user.name}</td>

                <td className="p-4">{user.email}</td>

                <td className="p-4">{user.address}</td>

                <td className="p-4">{user.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UsersPage;
