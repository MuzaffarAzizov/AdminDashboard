import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormModal from "./FormModal.jsx"; // Import the FormModal component

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null); // Track the category being edited
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

  const handleAdd = () => {
    setEditingCategory(null); // Reset editing category when adding a new one
    setIsModalOpen(true);
  };

  const handleEdit = (category) => {
    setEditingCategory(category); // Set the category being edited
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    const data = new FormData();
    data.append("name_en", formData.name_en);
    data.append("name_ru", formData.name_ru);

    if (formData.image) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(formData.image.type)) {
        console.error("Invalid file type. Only JPEG and PNG are allowed.");
        return;
      }
      data.append("images", formData.image);
    }

    try {
      let response;
      if (editingCategory) {
        // Update existing category using PUT or PATCH
        response = await axios.put(
          `https://realauto.limsa.uz/api/categories/${editingCategory.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        // Create new category
        response = await axios.post(
          `https://realauto.limsa.uz/api/categories`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      }
      console.log("Category saved:", response.data);
      setIsModalOpen(false);
      fetchCategories(); // Refresh the list of categories
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  const fields = [
    { name: "name_en", label: "Name (English)", type: "text" },
    { name: "name_ru", label: "Name (Russian)", type: "text" },
    { name: "image", label: "Category Image", type: "file" },
  ];

  return (
    <div className="p-4">
      {/* Header and Add Category button in one line */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Categories</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Category
        </button>
      </div>

      {/* Categories Table */}
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
                  onClick={() => handleEdit(category)} // Pass the category to handleEdit
                  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form Modal for Adding/Editing Categories */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        fields={fields}
        initialData={editingCategory} // Pass the editing category data to the modal
      />
    </div>
  );
};

export default Categories;
