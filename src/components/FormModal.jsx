import React, { useState, useEffect } from "react";

const FormModal = ({ isOpen, onClose, onSubmit, fields, initialData }) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      // Pre-fill the form with initialData
      setFormData(initialData);
    } else {
      // Reset the form when adding a new item
      setFormData({});
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value, // Handle file inputs
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h3 className="text-xl font-bold mb-4">
          {initialData ? "Edit Category" : "Add Category"}
        </h3>
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium mb-2">
                {field.label}
              </label>
              {field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              )}
            </div>
          ))}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
            >
              {initialData ? "Save Changes" : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
