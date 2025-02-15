import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DataTable from "./DataTable";
import FormModal from "./FormModal";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("access_token");

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchBrands();
    }
  }, [navigate, token]);

  const fetchBrands = async () => {
    try {
      const response = await axios.get("https://realauto.limsa.uz/api/brands", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBrands(response.data.data);
    } catch (error) {
      console.error("Error fetching brands:", error);
    }
  };

  const handleAdd = () => {
    setSelectedBrand(null);
    setIsModalOpen(true);
  };

  const handleEdit = (brand) => {
    setSelectedBrand(brand);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    await axios.delete(`https://realauto.limsa.uz/api/brands/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchBrands(); // Refresh the list of brands
  };

  const handleSubmit = async (formData) => {
    const data = new FormData();
    data.append("title", formData.title);

    if (formData.image) {
      const allowedTypes = ["image/jpeg", "image/png"];
      if (!allowedTypes.includes(formData.image.type)) {
        setError("Invalid file type. Only JPEG and PNG are allowed.");
        return;
      }
      data.append("images", formData.image);
    }

    // Log the FormData to verify its contents
    for (let [key, value] of data.entries()) {
      console.log(key, value);
    }

    try {
      if (selectedBrand) {
        await axios.put(
          `https://realauto.limsa.uz/api/brands/${selectedBrand.id}`,
          data,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );
      } else {
        await axios.post("https://realauto.limsa.uz/api/brands", data, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
      }
      setIsModalOpen(false);
      setError(""); // Clear the error message
      fetchBrands(); // Refresh the list of brands
    } catch (error) {
      if (error.response) {
        console.error("Server Response:", error.response.data); // Log the server's response
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const columns = [
    { key: "title", title: "Name" },
    { key: "image_src", title: "Image" },
  ];

  const fields = [
    { name: "title", label: "Brand Name", type: "text" },
    { name: "image", label: "Brand Image", type: "file" },
  ];

  return (
    <div className="p-4">
      {/* Header and Add Brand button in one line */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Brands</h2>
        <button
          onClick={handleAdd}
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
        >
          Add Brand
        </button>
      </div>

      {/* DataTable and FormModal */}
      <DataTable
        data={brands}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <FormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setError(""); // Clear the error message when the modal is closed
        }}
        onSubmit={handleSubmit}
        initialData={selectedBrand}
        fields={fields}
        error={error} // Pass the error message to the modal
      />
    </div>
  );
};

export default Brands;
