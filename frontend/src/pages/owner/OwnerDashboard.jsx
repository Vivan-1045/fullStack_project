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



        <div className="overflow-x-auto">

          <table
            className="
      w-full
      bg-white
      shadow-md
      rounded-lg
      overflow-hidden
    "
          >

            <thead>

              <tr className="bg-gray-200 text-gray-700">

                <th className="p-4 text-left">
                  Store Name
                </th>

                <th className="p-4 text-left">
                  Address
                </th>

                <th className="p-4 text-center">
                  Average Rating
                </th>

              </tr>

            </thead>



            <tbody>

              {stores.map((store) => (

                <tr
                  key={store.id}
                  className="
            border-b
            hover:bg-gray-50
            transition
          "
                >

                  <td className="p-4">
                    {store.name}
                  </td>

                  <td className="p-4">
                    {store.address}
                  </td>

                  <td className="p-4 text-center">
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

    </div>

  );

}

export default OwnerDashboard;