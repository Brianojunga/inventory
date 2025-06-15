import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { MainContext } from "../context/context.jsx";

function Logout() {
  const { setUser } = useContext(MainContext);
  const navigate = useNavigate();
  function handleLogout(e) {
    e.preventDefault();
    fetch(`${import.meta.env.VITE_API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Logout failed");
        }
        localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during logout:", error);
      });
  }

  return (
    <div className="flex items-center justify-end my-6">
         <button
      onClick={handleLogout}
      className="text-left  text-red-600 italic py-2 rounded font-semibold cursor-pointer hover:underline"
    >
      Logout
    </button>
    </div>
   
  );
}

export default Logout;