import { useContext } from "react";
import { MainContext } from "../context/context.jsx";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useContext(MainContext);
  async function handleLogin(e) {
    e.preventDefault();
    const request = await fetch(`${import.meta.env.VITE_API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: e.target.username.value,
        password: e.target.password.value,
      }),
    });
    if (!request.ok) {
      localStorage.removeItem("user");
      setUser(null);
      alert("Login failed");
      return;
    }
    const response = await request.json();
    setUser(response);
    localStorage.setItem("user", JSON.stringify(response));
    navigate("/");
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="username"
            >
              username :{" "}
            </label>
            <input
              type="text"
              id="username"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your username"
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-sm font-medium mb-2"
              htmlFor="password"
            >
              Password:{" "}
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 cursor-pointer"
            >
              Login
            </button>
            <button
              type="button"
              className="w-full text-gray-500 py-2 font-italic text-undline text-sm italic mt-2 hover:underline cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              don't have an account? Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
