import React, { useState } from "react";

const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  fields,
  error,
}) => {
  const [formData, setFormData] = useState(initialData || {});

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files ? files[0] : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add Brand</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}{" "}
        {/* Display error message */}
        <form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                {field.label}
              </label>
              {field.type === "file" ? (
                <input
                  type="file"
                  name={field.name}
                  onChange={handleChange}
                  className="mt-1 block w-full"
                />
              ) : (
                <input
                  type={field.type}
                  name={field.name}
                  value={formData[field.name] || ""}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              )}
            </div>
          ))}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
