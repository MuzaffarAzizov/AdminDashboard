import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import Categories from "./Categories.jsx";
import Brands from "./Brands.jsx";
import Models from "./Models.jsx";
import Locations from "./Locations.jsx";
import Cities from "./Cities.jsx";
import Cars from "./Cars.jsx";

const Header = () => {
  const navigate = useNavigate();
  const validSections = [
    "categories",
    "brands",
    "models",
    "locations",
    "cities",
    "cars",
  ];
  const [selectedSection, setSelectedSection] = useState(
    validSections.includes(localStorage.getItem("selectedSection"))
      ? localStorage.getItem("selectedSection")
      : "brands"
  );

  // Save selected section to localStorage
  useEffect(() => {
    localStorage.setItem("selectedSection", selectedSection);
  }, [selectedSection]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("selectedSection");
    navigate("/login");
  };

  const sections = [
    { id: "categories", label: "Categories" },
    { id: "brands", label: "Brands" },
    { id: "models", label: "Models" },
    { id: "locations", label: "Locations" },
    { id: "cities", label: "Cities" },
    { id: "cars", label: "Cars" },
  ];

  const sectionComponents = {
    categories: <Categories />,
    brands: <Brands />,
    models: <Models />,
    locations: <Locations />,
    cities: <Cities />,
    cars: <Cars />,
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          <nav>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id}>
                  <button
                    onClick={() => setSelectedSection(section.id)}
                    className={`w-full text-left p-2 rounded ${
                      selectedSection === section.id
                        ? "bg-gray-700"
                        : "hover:bg-gray-700"
                    }`}
                    aria-current={
                      selectedSection === section.id ? "page" : undefined
                    }
                  >
                    {section.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto p-2 bg-red-600 hover:bg-red-700 rounded flex items-center"
        >
          <FaSignOutAlt className="w-5 h-5 mr-2" />
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-auto p-4">
        {sectionComponents[selectedSection] || <Brands />}
      </main>
    </div>
  );
};

export default Header;
