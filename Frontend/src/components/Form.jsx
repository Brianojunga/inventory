function Form({ item = null, handleSubmit, onDelete, child1, child2 }) {
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="item" className="block">
        Item name:
        <input
          type="text"
          name="item"
          required
          defaultValue={item?.name || ""}
          id="item"
          className="border-gray-300 border-2 py-2 px-3 rounded-md w-full my-2 font-normal text-gray-500"
        />
      </label>
      <label htmlFor="category">
        category :
        <select
          name="category"
          required
          defaultValue={item?.category || "1"}
          id="category"
          className="border-gray-300 border-2 py-2 px-3 rounded-md w-full my-2 text-gray-500"
        >
          <option value="1">Electronics</option>
          <option value="2">Books</option>
          <option value="3">Clothing</option>
          <option value="4">Groceries</option>
          <option value="5">Furniture</option>
        </select>
      </label>
      <label htmlFor="quantity" className="block">
        Quantity:
        <input
          type="number"
          name="quantity"
          min="0"
          required
          defaultValue={item?.quantity || "1"}
          id="quantity"
          className="border-gray-300 border-2 py-2 px-3 rounded-md w-full my-2 text-gray-500 font-normal"
        />
      </label>
      <label htmlFor="Image_Url">
        Image URL:
        <input
          type="text"
          name="imageUrl"
          required
          defaultValue={item?.image_url || ""}
          id="Image_Url"
          className="border-gray-300 border-2 py-2 px-3 rounded-md w-full my-2 text-gray-500"
        />
      </label>
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md mt-3 cursor-pointer"
        >
          {child1}
        </button>
        <button
          type="button"
          className="ml-2 bg-gray-300 text-black py-2 px-4 rounded-md mt-3 cursor-pointer"
          onClick={onDelete}
        >
          {child2}
        </button>
      </div>
    </form>
  );
}
export default Form;
