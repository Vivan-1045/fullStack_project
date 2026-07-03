import { useEffect, useState } from "react";

import API from "../../services/api";

import Navbar from "../../components/Navbar";



function StoresPage() {

  const [stores, setStores] = useState([]);
  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      address: "",
      owner_id: ""
    });

  const [owners, setOwners] = useState([]);
  const [search, setSearch] = useState("");

  const fetchStores = async () => {
    try {
      const res = await API.get(`/admin/stores?name=${search}`);
      setStores(res.data);

    } catch (err) {
      console.log(err);
    }
  };

  const fetchOwners = async () => {
    try {
      const res = await API.get("/admin/users?role=OWNER");
      setOwners(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const createStore = async (e) => {
    e.preventDefault();

    try {
      await API.post("/admin/stores", formData);
      alert("Store created successfully!");
      fetchStores();
    } catch (error) {
      {
        alert(error.response?.data?.message);
      }
    };

  }

  useEffect(() => {
    fetchStores();
    fetchOwners();

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

          Stores
        </h1>

        {owners.length === 0 && (

          <div
            className="
      bg-yellow-100
      text-yellow-800
      p-4
      rounded
      mb-6
    "
          >
            No owners found.

            Please create an OWNER user first
            from Users page.
          </div>

        )}

        <form
          onSubmit={createStore}
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
            placeholder="Store Name"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          />



          <input
            type="email"
            name="email"
            placeholder="Store Email"
            onChange={handleChange}
            required
            className="border p-3 rounded"
          />



          <input
            type="text"
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="border p-3 rounded"
            required
            minLength={8}
          />



          <select
            name="owner_id"
            onChange={handleChange}
            className="border p-3 rounded"
            required
          >

            <option>
              Select Owner
            </option>

            {owners.map((owner) => (

              <option
                key={owner.id}
                value={owner.id}
              >
                {owner.name}
              </option>

            ))}

          </select>



          <button
            type="submit"
            disabled={owners.length === 0}
            className={`
    text-white
    rounded
    p-3

    ${owners.length === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600"
              }
  `}
          >
            Create Store
          </button>

        </form>

        <input
          type="text"
          placeholder="Search store"
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
                Rating
              </th>

            </tr>

          </thead>



          <tbody>

            {stores.map((store) => (

              <tr
                key={store.id}
                className="border-b"
              >

                <td className="p-4">
                  {store.name}
                </td>

                <td className="p-4">
                  {store.email}
                </td>

                <td className="p-4">
                  {store.address}
                </td>

                <td className="p-4">
                  {
                    Number(
                      store.average_rating
                    ).toFixed(1)
                  }
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default StoresPage;