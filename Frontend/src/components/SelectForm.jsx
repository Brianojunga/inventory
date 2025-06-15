import { useNavigate } from "react-router-dom";

function SelectForm({ category, setCategory }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="flex items-center justify-between p-3 mt-15">
        <button
          onClick={() => navigate("/add")}
          type="button"
          className="bg-gray-100 px-4 rounded-md text-black transition-colors h-10 underline hover:bg-gray-200 hover:font-semibold cursor-pointer"
        >
          Add Item
        </button>
        <form action="" className="w-60 ml-auto my-3">
          <label htmlFor="category" className="mr-2 p-2">
            Category:
          </label>
          <select
            className="border-2 border-gray-400 py-2 px-5 rounded-md cursor-pointer"
            name="categories"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="1">Electronics</option>
            <option value="2">Books</option>
            <option value="3">Clothing</option>
            <option value="4">Groceries</option>
            <option value="5">Furniture</option>
          </select>
        </form>
      </div>
    </>
  );
}

export default SelectForm;
