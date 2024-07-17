import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const menuItems = [
    { name: "Inbox", icon: "fas fa-inbox", link: "/home" },
    { name: "Starred", icon: "fas fa-star", link: "/home" },
    { name: "Send email", icon: "fas fa-paper-plane", link: "/home" },
    { name: "Drafts", icon: "fas fa-file-alt", link: "/home" },
  ];

  const otherItems = [
    { name: "All mail", icon: "fas fa-envelope", link: "#" },
    { name: "Trash", icon: "fas fa-trash", link: "#" },
    { name: "Spam", icon: "fas fa-exclamation-circle", link: "#" },
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
    <div className="w-64 bg-gray-800 text-white overflow-y-auto flex-shrink-0">
      <nav className="p-4">
        <ul>
          <li className="mb-6">
            <h2 className="text-lg font-semibold">Menu</h2>
          </li>
          {renderListItems(menuItems)}
        </ul>

        <hr className="my-4 border-gray-600" />

        <ul>{renderListItems(otherItems)}</ul>
      </nav>
    </div>
  );
};

export default Sidebar;
