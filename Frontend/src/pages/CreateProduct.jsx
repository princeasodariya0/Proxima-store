import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function CreateProduct() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();

      data.append("product[name]", form.name);
      data.append("product[description]", form.description);
      data.append("product[price]", form.price);
      data.append("product[stock]", form.stock);
      data.append("product[category]", form.category);

      const res = await api.post("/api/products/create", {
        product: {
          name: form.name,
          description: form.description,
          price: form.price,
          stock: form.stock,
          category: form.category,
        },
      });

      navigate("/products");
      toast.success(res.data.message || "New Product Created!");
    } catch (err) {
      toast.error(
        err.response?.data?.message || err.message || "Product does not exist",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-pink-50 to-fuchsia-100 py-10 px-4">

      <form
        onSubmit={submitHandler}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-6 md:p-10 space-y-6 border border-white"
      >

        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
            Create Product
          </h2>

          <p className="text-slate-500 mt-2">
            Add a new product to your Proxima Store
          </p>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Product Title
          </label>

          <input
            type="text"
            placeholder="Enter product title"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
          />
        </div>

        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Description
          </label>

          <textarea
            rows="5"
            placeholder="Enter product description"
            className="w-full px-4 py-3 rounded-xl border border-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            onChange={(e) =>
              setForm({
                ...form,
                description: e.target.value,
              })
            }
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Stock Quantity
            </label>

            <input
              type="number"
              placeholder="Available stock"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              onChange={(e) =>
                setForm({
                  ...form,
                  stock: e.target.value,
                })
              }
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-slate-700">
              Price (₹)
            </label>

            <input
              type="number"
              placeholder="Product price"
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
              onChange={(e) =>
                setForm({
                  ...form,
                  price: e.target.value,
                })
              }
            />
          </div>

        </div>

        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Category
          </label>

          <select
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-violet-500 transition"
            onChange={(e) =>
              setForm({
                ...form,
                category: e.target.value,
              })
            }
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Home">Home</option>
            <option value="Beauty">Beauty</option>
            <option value="Sports">Sports</option>
            <option value="Books">Books</option>
            <option value="Toys">Toys</option>
            <option value="Grocery">Grocery</option>
            <option value="Accessories">Accessories</option>
          </select>
        </div>

        <button
          disabled={loading}
          type="submit"
          className="w-full py-4 rounded-xl bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
