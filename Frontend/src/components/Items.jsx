import { useNavigate } from "react-router-dom";

function formatedDate(datetime) {
  const date = new Date(datetime);
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  };
  return date.toLocaleString("en-US", options);
}

function Items({ items, loading }) {
  const navigate = useNavigate();
  return (
    <>
      <h2 className="h-[60px] flex items-center justify-between border-gray-300 border-b-2 px-2 text-gray-400 font-semibold">
        <span className="w-28 px-4">item</span>
        <span className="w-30 px-6">name</span>
        <span className="pl-4">quantity</span>
        <span>Inward/Updated Date</span>
      </h2>
      {loading ? (
        <h1 className="text-center font-semibold text-2xl mt-10">Loading...</h1>
      ) : (
        <>
          {items.length === 0 && (
            <h1 className="text-center font-semibold text-2xl mt-10">
              No items found
            </h1>
          )}
          {items.map((item) => {
            return (
              <div
                key={item.id}
                onClick={() => navigate(`/${item.id}`)}
                className="h-[55px] flex items-center justify-between border-gray-300 border-b-2 px-2"
              >
                <img
                  src={item.image_url}
                  alt=""
                  className="h-[45px] w-18 bg-transparent"
                />
                <p className="w-30">{item.name}</p>
                <p className="text-gray-400">{item.quantity}</p>
                <p className="text-gray-400">
                  {formatedDate(item.inward_date)}
                </p>
              </div>
            );
          })}
        </>
      )}
    </>
  );
}

export default Items;
