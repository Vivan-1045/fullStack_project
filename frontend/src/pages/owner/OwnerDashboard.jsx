import { useEffect, useState }
from "react";

import API from "../../services/api";

import Navbar
from "../../components/Navbar";



function OwnerDashboard() {

  const [stores, setStores] =
    useState([]);




  const fetchDashboard = async () => {

    try {

      const res = await API.get(
        "/owner/dashboard"
      );

      setStores(res.data);

    } catch (error) {

      console.log(error);

    }

  };



  useEffect(() => {

    fetchDashboard();

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
          Owner Dashboard
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
                Store Name
              </th>

              <th className="p-4">
                Address
              </th>

              <th className="p-4">
                Average Rating
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

export default OwnerDashboard;