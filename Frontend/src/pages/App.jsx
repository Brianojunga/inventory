import { useContext, useEffect } from "react";
import Items from "../components/Items";
import SelectForm from "../components/SelectForm";
import { MainContext } from "../context/context.jsx";
import { useNavigate } from "react-router-dom";
import Logout from "./logout.jsx";

function App() {
  const { items, loading, category, setCategory, user, userLoading } =
    useContext(MainContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!userLoading && !user) {
      navigate("/login");
    }
  }, [user, navigate, userLoading]);

  if (userLoading) {
    return <div>Loading...</div>;
  }

  if (!user) return null;

  return (
    <section className="w-[800px] max-md:w-full p-4 mx-auto text-sm">
      <div>
        <h1 className="text-center font-bold text-4xl mt-10">INVENTORY</h1>
        <SelectForm category={category} setCategory={setCategory} />
        <Items items={items} loading={loading} />
      </div>
      <div>
        <Logout />
      </div>
    </section>
  );
}

export default App;
