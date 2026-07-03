import { useState } from "react";
import { useNavigate, Link }
from "react-router-dom";

import API from "../services/api";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] =
    useState({
      email: "",
      password: ""
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

      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      const role = res.data.user.role;

      if (role === "ADMIN") {

        navigate("/admin/dashboard");

      } else if (role === "OWNER") {

        navigate("/owner/dashboard");

      } else {

        navigate("/stores");

      }

    } catch (error) {

      alert(
        error.response?.data?.message
      );

    }

  };



  return (

  <div
    className="
      min-h-screen
      flex
      justify-center
      items-center
      bg-gray-100
    "
  >

    <form
      onSubmit={handleSubmit}
      className="
        bg-white
        p-8
        rounded-lg
        shadow-lg
        w-[400px]
      "
    >

      <h1
        className="
          text-3xl
          font-bold
          mb-6
          text-center
        "
      >
        Login
      </h1>

      <input
        type="email"
        name="email"
        placeholder="Email"
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
        name="password"
        placeholder="Password"
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
        Login
      </button>

      <p
        className="
          text-center
          mt-4
        "
      >

        Don't have an account?

        <Link
          to="/signup"
          className="
            text-blue-600
            ml-2
          "
        >
          Signup
        </Link>

      </p>

    </form>

  </div>

);

}

export default Login;