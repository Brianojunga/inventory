import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./pages/App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import UpdateItem from "./pages/UpdateItem.jsx";
import MainContextProvider from "./context/context.jsx";
import AddItem from "./pages/AddItem.jsx";
import Login from "./pages/login.jsx";
import SignUp from "./pages/SignUp.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/:id",
    element: <UpdateItem />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "signup",
    element: <SignUp />,
  },
  {
    path: "/add",
    element: <AddItem />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MainContextProvider>
      <RouterProvider router={router} />
    </MainContextProvider>
  </StrictMode>,
);
