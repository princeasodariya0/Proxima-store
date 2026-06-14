import { useEffect, useState } from "react";
import { useParams, NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function ProductDetails() {
  const { id } = useParams();
  const navigator = useNavigate();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    ; (async () => {
      try {
        const res = await api.get(`/api/products/${id}`);

        setProduct(res.data.product || res.data);
      } catch (err) {
        toast.error(err.response?.data?.message || "Product does not exist");
      }
    })();
  }, [id]);

  const deleteProduct = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      const res = await api.delete(
        `/api/products/${id}`,
      );
      navigator("/products");
      toast.success(res?.data?.message || "Product was Successfully Deleted!");
    } catch (err) {
      if (err.response.status === 401) {
        navigator(`/products/${id}`);
        toast.error(
          err.response?.data?.message ||
          "You are not the owner of this product",
        );
        return;
      }
      toast.error(err.response?.data?.message || "Product does not exist");
    }
  };

  if (!product) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-pink-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-white">
          <div className="h-64 bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 flex items-center justify-center">

            <div className="w-28 h-28 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-6xl">
              🛍️
            </div>
          </div>

          <div className="p-6 md:p-10">
            <div className="mb-4">
              <span className="inline-block px-4 py-2 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold">
                {product.category}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 break-words">
              {product.title}
            </h1>
            <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
              {product.description}
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="bg-violet-50 rounded-2xl p-5 border border-violet-100">
                <p className="text-sm text-slate-500 mb-1">
                  Product Price
                </p>
                <h2 className="text-3xl font-bold text-violet-700">
                  ₹{product.price?.toLocaleString()}
                </h2>
              </div>
              <div className="bg-green-50 rounded-2xl p-5 border border-green-100">
                <p className="text-sm text-slate-500 mb-1">
                  Available Stock
                </p>
                <h2 className="text-3xl font-bold text-green-600">
                  {product.stock}
                </h2>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-10">
              <NavLink
                to={`/products/${id}/edit`}
                className="flex-1 text-center py-4 rounded-xl bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                ✏️ Edit Product
              </NavLink>
              <button
                onClick={deleteProduct}
                className="flex-1 py-4 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                🗑 Delete Product
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
