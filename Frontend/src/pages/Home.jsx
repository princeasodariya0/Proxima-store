import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/axios";

function Products() {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [showTax, setShowTax] = useState(false);

    useEffect(() => {
        ; (async () => {
            try {
                const res = await api.get(
                    `/api/products?search=${search}&category=${category}`,
                );
                setProducts(res.data.products);
            } catch (err) {
                toast.error(err.response?.data?.message || "Product does not exist");
            }
        })();
    }, [search, category]);

    const handleChange = (e) => {
        setSearch(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-violet-100 via-white to-pink-100 py-10 px-4">

            {/* Hero Section */}
            <div className="text-center mb-12">

                <div className="inline-flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                    ✨ Premium Shopping Experience
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 bg-clip-text text-transparent">
                    Discover Amazing Products
                </h1>

                <p className="text-slate-600 mt-4 text-lg max-w-2xl mx-auto">
                    Explore top-quality products with unbeatable prices and a seamless shopping experience.
                </p>

            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto mb-12">

                <div className="bg-white shadow-xl rounded-2xl p-3 flex flex-col sm:flex-row gap-3">

                    <input
                        type="text"
                        value={search}
                        onChange={handleChange}
                        placeholder="Search products..."
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    />

                    <button
                        className="px-8 py-3 rounded-xl bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 text-white font-semibold hover:scale-105 transition-all duration-300"
                    >
                        Search
                    </button>

                </div>

            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">

                {products.map((product) => (

                    <div key={product._id}>

                        <div className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 h-full">

                            {/* Product Banner */}
                            <div className="h-48 bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 flex items-center justify-center">

                                <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white text-4xl">
                                    🛍️
                                </div>

                            </div>

                            {/* Product Info */}
                            <div className="p-5 flex flex-col h-full">

                                <span className="w-fit px-3 py-1 text-xs font-semibold rounded-full bg-violet-100 text-violet-700 mb-3">
                                    {product.category}
                                </span>

                                <h3 className="font-bold text-xl text-slate-800 mb-2 capitalize">
                                    {product.name}
                                </h3>

                                <p className="text-3xl font-bold text-violet-700">
                                    ₹
                                    {showTax
                                        ? Math.round(product.price * 1.18)
                                        : product.price}
                                </p>

                                {showTax && (
                                    <p className="text-xs text-slate-500 mt-1">
                                        Includes 18% GST
                                    </p>
                                )}

                                <p className="text-green-600 font-medium mt-3">
                                    Stock: {product.stock}
                                </p>

                                <NavLink
                                    to={`/products/${product._id}`}
                                    className="mt-5 block text-center py-3 rounded-xl bg-gradient-to-r from-violet-700 via-purple-600 to-pink-500 text-white font-semibold hover:shadow-lg transition-all duration-300"
                                >
                                    View Details
                                </NavLink>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Products;
