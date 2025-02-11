import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchCategories();
    }
  }, [navigate, token]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `https://realauto.limsa.uz/api/categories`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Categories</h2>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">NAME EN</th>
            <th className="px-6 py-3">NAME RU</th>
            <th className="px-6 py-3">IMAGE</th>
            <th className="px-6 py-3">ACTION</th>
          </tr>
        </thead>
        <tbody>
          {categories?.map((category) => (
            <tr
              key={category.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{category.name_en}</td>
              <td className="px-6 py-4">{category.name_ru}</td>
              <td className="px-6 py-4">
                <img
                  src={`https://realauto.limsa.uz/api/uploads/images/${category.image_src}`}
                  alt={category.name_en}
                  className="w-24 h-24 object-cover"
                />
              </td>
              <td className="px-6 py-4">
                <button
                  type="button"
                  class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Categories;
