import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchCars();
    }
  }, [navigate, token]);

  const fetchCars = async () => {
    try {
      const response = await axios.get("https://realauto.limsa.uz/api/cars", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCars(response.data.data);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleAddCar = () => {
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
        "https://realauto.limsa.uz/api/cars",
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Car created:", response.data);
      setIsModalOpen(false);
      fetchCars(); // Refresh the list of cars
    } catch (error) {
      console.error("Error creating car:", error);
      if (error.response) {
        console.error("Server response:", error.response.data);
      }
    }
  };

  return (
    <div className="p-4">
      {/* Header and Add Car button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Cars</h2>
        <button
          onClick={handleAddCar}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Car
        </button>
      </div>

      {/* Cars Table */}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-6 py-3">Brand</th>
            <th className="px-6 py-3">Model</th>
            <th className="px-6 py-3">Color</th>
            <th className="px-6 py-3">City</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cars.map((car) => (
            <tr
              key={car.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
            >
              <td className="px-6 py-4">{car.brand.title}</td>
              <td className="px-6 py-4">{car.model.name}</td>
              <td className="px-6 py-4">{car.color}</td>
              <td className="px-6 py-4">{car.city.name}</td>
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

      {/* Modal for Adding New Car */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Add New Car</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                handleSubmit({
                  name: formData.get("name"),
                  text: formData.get("text"),
                  image: formData.get("image"),
                });
              }}
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Text</label>
                <input
                  type="text"
                  name="text"
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Image</label>
                <input
                  type="file"
                  name="image"
                  className="w-full p-2 border rounded"
                  accept="image/jpeg, image/png"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cars;
