import React, { useEffect, useState } from "react";
import { fetchData, createData, updateData, deleteData } from "./API";
import DataTable from "./DataTable";
import FormModal from "./FormModal";

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    fetchBrands();
  }, []);

  const fetchBrands = async () => {
    const data = await fetchData("brands");
    setBrands(data);
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
    await deleteData("brands", id);
    fetchBrands();
  };

  const handleSubmit = async (formData) => {
    if (selectedBrand) {
      await updateData("brands", selectedBrand.id, formData);
    } else {
      await createData("brands", formData);
    }
    setIsModalOpen(false);
    fetchBrands();
  };

  const columns = [
    { key: "title", title: "Name" }, // Display brand name
    { key: "image_src", title: "Image" }, // Use the correct key from API response
  ];

  const fields = [{ name: "title", label: "Brand Name", type: "text" }];

  return (
    <div>
      <button onClick={handleAdd}>Add Brand</button>
      <DataTable
        data={brands}
        columns={columns}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <FormModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSubmit}
        initialData={selectedBrand}
        fields={fields}
      />
    </div>
  );
};

export default Brands;
