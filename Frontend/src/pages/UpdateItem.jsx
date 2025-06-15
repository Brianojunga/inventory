import { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MainContext } from "../context/context.jsx";
import Form from "../components/Form.jsx";

function UpdateItem() {
  const { id } = useParams();
  const { items, setItems } = useContext(MainContext);
  const item = items.find((item) => item.id === parseInt(id));
  const navigate = useNavigate();
  console.log(items);

  async function onHandleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/${parseInt(id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item: e.target.item.value,
            category: e.target.category.value,
            quantity: parseFloat(e.target.quantity.value),
            image_url: e.target.imageUrl.value,
          }),
        },
      );
      if (!response.ok) {
        alert("update failed, make sure you are an Admin");
        navigate("/");
        return;
      }
      setItems((prev) =>
        prev.map((item) => {
          return item.id === Number(id)
            ? {
                ...item,
                item: e.target.item.value,
                quantity: parseFloat(e.target.quantity.value),
                image_url: e.target.imageUrl.value,
              }
            : item;
        }),
      );
      alert("Item updated successfully");
      navigate("/");
    } catch (err) {
      console.error("Error updating item:", err);
    }
  }

  async function onDelete() {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/items/${parseInt(id)}`,
        {
          method: "DELETE",
        },
      );
      if (!response.ok) {
        alert("Delete failed, make sure you are an Admin");
        navigate("/");
        return;
      }
      setItems((prev) => prev.filter((item) => item.id !== parseInt(id)));
      alert("Item deleted successfully");
      navigate("/");
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  }

  return (
    <>
      {!item && <h1>Item not found</h1>}
      <section className="w-[400px] p-4 mx-auto text-sm flex mt-20">
        <div>
          <h1 className="text-center font-semibold text-2xl mb-8">
            UPDATE {item.name}
          </h1>
          <Form
            item={item}
            handleSubmit={onHandleSubmit}
            child1="Update Item"
            child2="Delete Item"
            onDelete={onDelete}
          />
        </div>
      </section>
    </>
  );
}
export default UpdateItem;
