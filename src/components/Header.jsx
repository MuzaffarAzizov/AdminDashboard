import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Categories from "./Categories";
import Brands from "./Brands";
import Models from "./Models";
import Locations from "./Locations";
import Cities from "./Cities";
import Cars from "./Cars";

const Header = () => {
  const navigate = useNavigate();
  const [selectedSection, setSelectedSection] = useState(
    localStorage.getItem("selectedSection") || "brands" // localStorage dan olish
  );

  // Tanlangan boʻlimni localStorage ga saqlash
  useEffect(() => {
    localStorage.setItem("selectedSection", selectedSection);
  }, [selectedSection]);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("selectedSection"); // Tanlangan boʻlimni ham tozalash
    navigate("/login");
  };

  const renderSection = () => {
    switch (selectedSection) {
      case "categories":
        return <Categories />;
      case "brands":
        return <Brands />;
      case "models":
        return <Models />;
      case "locations":
        return <Locations />;
      case "cities":
        return <Cities />;
      case "cars":
        return <Cars />;
      default:
        return <Brands />; // Default to Brands
    }
  };
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 flex flex-col">
        <div className="flex-1">
          <h2 className="text-xl font-bold mb-6">Admin Dashboard</h2>
          <nav>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setSelectedSection("categories")}
                  className={`w-full text-left p-2 rounded ${
                    selectedSection === "categories"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Categories
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("brands")}
                  className={`w-full text-left p-2 rounded ${
                    selectedSection === "brands"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Brands
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("models")}
                  className={`w-full text-left p-2 rounded ${
                    selectedSection === "models"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Models
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("locations")}
                  className={`w-full text-left p-2 rounded ${
                    selectedSection === "locations"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Locations
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("cities")}
                  className={`w-full text-left p-2 rounded ${
                    selectedSection === "cities"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Cities
                </button>
              </li>
              <li>
                <button
                  onClick={() => setSelectedSection("cars")}
                  className={`w-full text-left p-2 rounded ${
                    selectedSection === "cars"
                      ? "bg-gray-700"
                      : "hover:bg-gray-700"
                  }`}
                >
                  Cars
                </button>
              </li>
            </ul>
          </nav>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="mt-auto p-2 bg-red-600 hover:bg-red-700 rounded flex items-center"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 overflow-auto p-4">
        {renderSection()}
      </main>
    </div>
  );
};

export default Header;
