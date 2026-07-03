import { Link, useNavigate }
from "react-router-dom";



function Navbar() {

  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("user")
    );



  const logout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("user");

    navigate("/login");

  };



  return (

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

      <Link
        to="/"
        className="
          text-2xl
          font-bold
          text-blue-600
        "
      >
        Store Rating App
      </Link>



      <div className="space-x-4">

        {user?.role === "ADMIN" && (

          <>
            <Link to="/admin/dashboard">
              Dashboard
            </Link>

            <Link to="/admin/users">
              Users
            </Link>

            <Link to="/admin/stores">
              Stores
            </Link>
          </>

        )}



        {user?.role === "USER" && (

          <Link to="/stores">
            Stores
          </Link>

        )}



        {user?.role === "OWNER" && (

          <Link to="/owner/dashboard">
            Dashboard
          </Link>

        )}



        <Link to="/update-password">
          Update Password
        </Link>



        <button
          onClick={logout}
          className="
            bg-red-500
            text-white
            px-4
            py-2
            rounded
          "
        >
          Logout
        </button>

      </div>

    </nav>

  );

}

export default Navbar;