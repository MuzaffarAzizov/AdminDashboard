import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormModal from "./FormModal"; // Import the FormModal component

const Models = () => {
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]); // State for brands
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchModels();
      fetchBrands(); // Fetch brands when the component mounts
    }
  }, [navigate, token]);

  const fetchModels = async () => {
    try {
      const response = await axios.get("https://realauto.limsa.uz/api/models", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModels(response.data.data);
    } catch (error) {
      console.error("Error fetching models:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await axios.get("https://realauto.limsa.uz/api/brands", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(response.data.data); // Store the list of brands
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    const data = {
      name: formData.name,
      brand_id: Number(formData?.brand_id), // Convert to number
    };

    console.log("Request Payload:", data); // Log the payload

    try {
      const response = await axios.post(
        "https://realauto.limsa.uz/api/models",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Model created:", response.data);
      setIsModalOpen(false);
      fetchModels(); // Refresh the list of models
    } catch (error) {
      if (error.response) {
        console.error("Server Response:", error.response.data); // Log the server's response
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const fields = [
    { name: "name", label: "Model Name", type: "text" },
    {
      name: "brand_id",
      label: "Brand",
      type: "select",
      options: brands?.map((brand) => ({
        value: brand.id, // Use brand ID as the value
        label: brand.title, // Use brand name as the label
      })),
    },
  ];

  return (
    <div className="p-4">
      {/* Header and Add Model button in one line */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Models</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Model
        </button>
      </div>

      {/* Models Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Brand</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {models.map((model) => (
            <tr
              key={model.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{model.name}</td>
              <td className="px-6 py-4">{model.brand_title}</td>
              <td className="px-6 py-4">
                <button
                  type="button"
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

      {/* Form Modal for Adding Models */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        fields={fields}
      />
    </div>
  );
};

export default Models;
