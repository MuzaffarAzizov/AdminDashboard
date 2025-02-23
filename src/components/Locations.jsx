import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import FormModal from "./FormModal"; // Import the FormModal component

const Locations = () => {
  const [locations, setLocations] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchLocations();
    }
  }, [navigate, token]);

  const fetchLocations = async () => {
    try {
      const response = await axios.get(
        "https://realauto.limsa.uz/api/locations",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setLocations(response.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    }
  };

  const handleAdd = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (formData) => {
    const data = new FormData();
    data.append("name", formData.name);
    data.append("text", formData.text);

    if (formData.image) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(formData.image.type)) {
        alert("Invalid file type. Only JPEG and PNG are allowed.");
        return;
      }
      data.append("images", formData.image);
    }

    try {
      const response = await axios.post(
        "https://realauto.limsa.uz/api/locations",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Location created:", response.data);
      setIsModalOpen(false);
      fetchLocations(); // Refresh the list of locations
    } catch (error) {
      console.error("Error creating location:", error);
    }
  };

  const fields = [
    { name: "name", label: "Name", type: "text" },
    { name: "text", label: "Text", type: "text" },
    { name: "image", label: "Image", type: "file" },
  ];

  return (
    <div className="p-4">
      {/* Header and Add Location button in one line */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Locations</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Location
        </button>
      </div>

      {/* Locations Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">ID</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Text</th>
            <th className="px-6 py-3">Image</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location, index) => (
            <tr
              key={location.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{index + 1}</td>
              <td className="px-6 py-4">{location.name}</td>
              <td className="px-6 py-4">{location.text}</td>
              <td className="px-6 py-4">
                <img
                  src={`https://realauto.limsa.uz/api/uploads/images/${location.image_src}`}
                  alt={location.name || "Image"}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => (e.target.style.display = "none")} // Hide if the image is broken
                />
              </td>
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

      {/* Form Modal for Adding Locations */}
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        fields={fields}
      />
    </div>
  );
};

export default Locations;
