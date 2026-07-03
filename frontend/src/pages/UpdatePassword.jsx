import { useState }
from "react";

import API from "../services/api";

import Navbar
from "../components/Navbar";



function UpdatePassword() {

  const [formData, setFormData] =
    useState({
      oldPassword: "",
      newPassword: ""
    });




  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });

  };




  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const res = await API.put(
        "/users/update-password",
        formData
      );

      alert(res.data.message);

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };



  return (

    <div>

      <Navbar />

      <div
        className="
          flex
          justify-center
          mt-20
        "
      >

        <form
          onSubmit={handleSubmit}
          className="
            bg-white
            shadow-md
            p-8
            rounded
            w-[400px]
          "
        >

          <h1
            className="
              text-2xl
              font-bold
              mb-6
            "
          >
            Update Password
          </h1>



          <input
            type="password"
            name="oldPassword"
            placeholder="Old Password"
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              mb-4
              rounded
            "
          />



          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
            className="
              w-full
              border
              p-3
              mb-4
              rounded
            "
          />



          <button
            type="submit"
            className="
              w-full
              bg-blue-600
              text-white
              py-3
              rounded
            "
          >
            Update
          </button>

        </form>

      </div>

    </div>

  );

}

export default UpdatePassword;