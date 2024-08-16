import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Classes", icon: "fas fa-inbox", link: "/home" },
    { name: "Send email", icon: "fas fa-paper-plane", link: "/home/sendmails" },
  ];

  const renderListItems = (items) => {
    return items.map((item) => (
      <li key={item.name} className="mb-2">
        <Link
          to={item.link}
          className="flex items-center p-2 hover:bg-gray-700 rounded"
        >
          <i className={`${item.icon} mr-3`}></i>
          <span>{item.name}</span>
        </Link>
      </li>
    ));
  };

  return (
    <div className="w-64 bg-gray-900 text-white overflow-y-auto flex-shrink-0 shadow-xl">
      <nav className="p-4">
        <ul>
          <li className="mb-6">
            <h2 className="text-lg font-semibold text-blue-400">Menu</h2>
          </li>
          {renderListItems(menuItems)}
        </ul>

        <hr className="my-4 border-gray-700" />

      </nav>
    </div>
  );
};

export default Sidebar;
