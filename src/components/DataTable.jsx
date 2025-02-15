import React from "react";
const DataTable = ({ data, columns, onEdit, onDelete }) => {
  return (
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          {columns.map((column) => (
            <th key={column.key} scope="col" className="px-6 py-3">
              {column.title}
            </th>
          ))}
          <th scope="col" className="px-6 py-3">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr
            key={item.id}
            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200"
          >
            {columns.map((column) => (
              <td key={column.key} className="px-6 py-4">
                {column.key === "image_src" ? (
                  <img
                    src={`https://realauto.limsa.uz/api/uploads/images/${
                      item[column.key]
                    }`}
                    alt={item.title || "Brand Image"}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => (e.target.style.display = "none")} // Hide if the image is broken
                  />
                ) : (
                  item[column.key]
                )}
              </td>
            ))}
            <td className="px-6 py-4">
              <button
                onClick={() => onEdit(item.id)}
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(item.id)}
                className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
