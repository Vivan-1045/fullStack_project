import { useEffect, useState }
from "react";

import API from "../../services/api";

import Navbar
from "../../components/Navbar";



function AdminDashboard() {

  const [data, setData] =
    useState({});



  const fetchDashboard = async () => {

    try {

      const res = await API.get(
        "/admin/dashboard"
      );

      setData(res.data);

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
            mb-8
          "
        >
          Admin Dashboard
        </h1>



        <div
          className="
            grid
            grid-cols-3
            gap-6
          "
        >

          <div
            className="
              bg-white
              shadow-md
              p-6
              rounded
            "
          >

            <h2 className="text-xl">
              Total Users
            </h2>

            <p
              className="
                text-4xl
                font-bold
                mt-4
              "
            >
              {data.totalUsers}
            </p>

          </div>



          <div
            className="
              bg-white
              shadow-md
              p-6
              rounded
            "
          >

            <h2 className="text-xl">
              Total Stores
            </h2>

            <p
              className="
                text-4xl
                font-bold
                mt-4
              "
            >
              {data.totalStores}
            </p>

          </div>



          <div
            className="
              bg-white
              shadow-md
              p-6
              rounded
            "
          >

            <h2 className="text-xl">
              Total Ratings
            </h2>

            <p
              className="
                text-4xl
                font-bold
                mt-4
              "
            >
              {data.totalRatings}
            </p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default AdminDashboard;