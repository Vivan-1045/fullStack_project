import { useEffect, useState } from "react";

import API from "../../services/api";
import Navbar from "../../components/Navbar";

function UserStores() {
  const [stores, setStores] = useState([]);

  const fetchStores = async () => {
    try {
      const res = await API.get("/stores");

      setStores(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleRating = async (storeId, rating) => {
    try {
      await API.post("/ratings", {
        store_id: storeId,
        rating,
      });

      alert("Rating submitted");

      fetchStores();
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-100 py-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-slate-800">
              Store Directory
            </h1>
            <p className="mt-2 text-slate-500">
              Browse all stores and submit or update your ratings.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl bg-white shadow-xl border border-gray-200">
            <table className="min-w-full">
              <thead className="bg-indigo-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Store</th>
                  <th className="px-6 py-4 text-left">Address</th>
                  <th className="px-6 py-4 text-center">Overall Rating</th>
                  <th className="px-6 py-4 text-center">Your Rating</th>
                  <th className="px-6 py-4 text-center">Rate</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {stores.length > 0 ? (
                  stores.map((store) => (
                    <tr key={store.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 font-semibold text-slate-800">
                        {store.name}
                      </td>

                      <td className="px-6 py-4 text-gray-600">
                        {store.address}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-yellow-100 px-3 py-1 text-sm font-medium text-yellow-700">
                          ⭐ {store.average_rating || 0}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-center">
                        {store.user_rating ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-700">
                            {store.user_rating} ⭐
                          </span>
                        ) : (
                          <span className="text-gray-400">Not Rated</span>
                        )}
                      </td>

                      <td className="px-6 py-4 text-center">
                        <select
                          defaultValue=""
                          onChange={(e) =>
                            handleRating(store.id, e.target.value)
                          }
                          className="rounded-lg border border-gray-300 px-4 py-2 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-300"
                        >
                          <option value="">Rate Store</option>
                          <option value="1">⭐ 1</option>
                          <option value="2">⭐⭐ 2</option>
                          <option value="3">⭐⭐⭐ 3</option>
                          <option value="4">⭐⭐⭐⭐ 4</option>
                          <option value="5">⭐⭐⭐⭐⭐ 5</option>
                        </select>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="py-12 text-center text-gray-500">
                      No stores available.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default UserStores;
