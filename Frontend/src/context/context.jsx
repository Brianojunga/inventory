import { createContext } from "react";
import { useEffect, useState } from "react";

/* eslint-disable-next-line */
export const MainContext = createContext();

function MainContextProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState(1);
  const [user, setUser] = useState();
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const request = await fetch(
          `${import.meta.env.VITE_API_URL}/categories/${category}`,
          {
            credentials: "include",
          },
        );
        if (!request.ok) {
          setUser(null);
          localStorage.removeItem("user");
          return;
        }

        const response = await request.json();
        setItems(response);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [category, user]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setUserLoading(false);
  }, []);

  return (
    <MainContext.Provider
      value={{
        items,
        setItems,
        loading,
        setLoading,
        error,
        setError,
        category,
        setCategory,
        user,
        setUser,
        userLoading,
      }}
    >
      {children}
    </MainContext.Provider>
  );
}
export default MainContextProvider;
