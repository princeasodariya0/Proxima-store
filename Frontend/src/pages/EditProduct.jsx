import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    ; (async () => {
      try {
        const res = await api.get(`/api/products/${id}`);
        setProduct(res.data.product || res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Product does not exist");
      }
    })();
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();

      data.append("product[name]", product.name);
      data.append("product[description]", product.description);
      data.append("product[stock]", product.stock);
      data.append("product[price]", product.price);
      data.append("product[category]", product.category);

      const res = await api.put(`/api/products/${id}`, {
        product: {
          name: product.name,
          description: product.description,
          price: product.price,
          stock: product.stock,
          category: product.category,
        },
      });

      navigate(`/products/${id}`);
      toast.success(res?.data?.message || "Product was Successfully Edited!");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error(
          err.response?.data?.message ||
          "You are not the owner of this product",
        );
        navigate("/products");
        return;
      }

      if (err.response?.status === 403) {
        navigate("/login");
        toast.error(err.response?.data?.message || "Something went wrong");
        return;
      }
    } finally {
      setLoading(false);
    }
  };

  if (!product) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 via-white to-violet-100 py-10 px-4">

      <form
        onSubmit={submitHandler}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-lg shadow-2xl rounded-3xl p-6 md:p-10 space-y-6 border border-white"
      >

        <div className="text-center">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 via-teal-500 to-violet-600 bg-clip-text text-transparent">
            Update Product
          </h2>

          <p className="text-slate-500 mt-2">
            Modify your product information
          </p>
        </div>

        <div>
          <label className="block mb-2 font-semibold text-slate-700">
            Product Name
          </label>

          <input
            type="text"
            placeholder="Product Name"
            value={product.name || ""}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            onChange={(e) =>
              setProduct({
                ...product,
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
            placeholder="Product Description"
            value={product.description || ""}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 resize-none focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            onChange={(e) =>
              setProduct({
                ...product,
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
              placeholder="Available Stock"
              value={product.stock || ""}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              onChange={(e) =>
                setProduct({
                  ...product,
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
              placeholder="Product Price"
              value={product.price || ""}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              onChange={(e) =>
                setProduct({
                  ...product,
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
            value={product.category || ""}
            className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            onChange={(e) =>
              setProduct({
                ...product,
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
          className="w-full py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-500 to-violet-600 text-white font-semibold text-lg shadow-lg hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50"
        >
          {loading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
