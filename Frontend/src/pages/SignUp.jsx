import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();
  async function handleSignUp(e) {
    e.preventDefault();
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const request = await fetch(`${import.meta.env.VITE_API_URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        username: e.target.username.value,
        password: password,
      }),
    });
    if (!request.ok) {
      alert("Sign Up failed");
      return;
    }
    navigate("/login");
  }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Sign Up</h1>
      <form
        className="bg-white p-6 rounded shadow-md w-80"
        onSubmit={handleSignUp}
      >
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="username">
            Username:{" "}
          </label>
          <input
            type="text"
            id="username"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="password">
            Password:{" "}
          </label>
          <input
            type="password"
            id="email"
            name="password"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-sm font-medium mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password:{" "}
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className="w-full px-3 py-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
