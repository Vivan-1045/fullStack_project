import { useEffect, useState }
from "react";

import API from "../../services/api";

import Navbar
from "../../components/Navbar";



function StoresPage() {

  const [stores, setStores] =
    useState([]);




  const fetchStores = async () => {

    try {

      const res = await API.get(
        "/admin/stores"
      );

      setStores(res.data);

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {

    fetchStores();

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
          Stores
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