import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import API from "../services/api";

function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/auth/register", formData);

      alert("Signup successful");

      navigate("/");
    } catch (error) {
      alert(error.response?.data?.message);
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
      py-10
    "
    >
      <form
        onSubmit={handleSubmit}
        className="
        bg-white
        p-8
        rounded-lg
        shadow-lg
        w-[450px]
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
          Signup
        </h1>

        {/* NAME */}

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          mb-4
          rounded
        "
        />

        {/* EMAIL */}

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

        {/* ADDRESS */}

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="
          w-full
          border
          p-3
          mb-4
          rounded
          h-24
        "
        />

        {/* PASSWORD */}

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

        {/* PASSWORD NOTE */}

        <p
          className="
          text-sm
          text-gray-500
          mb-4
        "
        >
          Password must contain: 8-16 characters, one uppercase letter, and one
          special character.
        </p>

        {/* BUTTON */}

        <button
          type="submit"
          className="
          w-full
          bg-green-600
          hover:bg-green-700
          text-white
          py-3
          rounded
          transition
        "
        >
          Signup
        </button>

        {/* LOGIN LINK */}

        <p
          className="
          text-center
          mt-4
        "
        >
          Already have an account?
          <Link
            to="/login"
            className="
            text-blue-600
            ml-2
          "
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Signup;
