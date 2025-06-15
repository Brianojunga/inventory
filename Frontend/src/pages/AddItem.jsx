import Form from "../components/Form";
import { useNavigate } from "react-router-dom";

function AddItem() {
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const requestBody = {
      item: e.target.item.value,
      category: e.target.category.value,
      quantity: parseFloat(e.target.quantity.value),
      image_url: e.target.imageUrl.value,
    };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });
      if (!response.ok) {
        alert("Failed to add item, make sure you are an Admin");
        return;
      }
      alert("Item added successfully");
      navigate("/");
    } catch (err) {
      console.error("Error adding item:", err);
    }
  }

  function handleCancel() {
    navigate("/");
  }

  return (
    <section className="w-[400px] p-4 mx-auto text-sm mt-20">
      <h1 className="text-center mb-8 text-4xl font-semibold">Add Item</h1>
      <Form
        handleSubmit={handleSubmit}
        child1={"Add Item"}
        child2={"Cancel"}
        onDelete={handleCancel}
      />
    </section>
  );
}

export default AddItem;
