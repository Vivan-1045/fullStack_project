import { Link }
from "react-router-dom";



function Home() {

  return (

    <div className="min-h-screen bg-gray-100">

      <nav
        className="
          bg-white
          shadow-md
          px-8
          py-4
          flex
          justify-between
          items-center
        "
      >

        <h1
          className="
            text-2xl
            font-bold
            text-blue-600
          "
        >
          Store Rating App
        </h1>

        <div className="space-x-4">

          <Link
            to="/login"
            className="
              bg-blue-500
              text-white
              px-4
              py-2
              rounded
            "
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="
              bg-green-500
              text-white
              px-4
              py-2
              rounded
            "
          >
            Signup
          </Link>

        </div>

      </nav>



    
      <div
        className="
          flex
          flex-col
          justify-center
          items-center
          text-center
          mt-32
          px-4
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            text-gray-800
            mb-6
          "
        >
          Welcome to Store Rating Platform
        </h1>

        <p
          className="
            text-lg
            text-gray-600
            max-w-2xl
            mb-8
          "
        >
          Users can explore stores,
          submit ratings, and manage
          reviews through a secure
          role-based platform.
        </p>

        <div className="space-x-4">

          <Link
            to="/signup"
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-3
              rounded-lg
              text-lg
            "
          >
            Get Started
          </Link>

          <Link
            to="/login"
            className="
              bg-gray-800
              hover:bg-gray-900
              text-white
              px-6
              py-3
              rounded-lg
              text-lg
            "
          >
            Login
          </Link>

        </div>

      </div>

    </div>

  );

}

export default Home;