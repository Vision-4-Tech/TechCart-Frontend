import { NavLink, Outlet, useParams } from "react-router-dom";
import "../components/Sidebar.css"

const SideBar = ({ state }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar">
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? "navicons selected" : "navicons"
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/inventory"
          className={({ isActive }) =>
            isActive ? "navicons selected" : "navicons"
          }
        >
          Inventory
        </NavLink>
        <NavLink
          to="/admin/customers"
          className={({ isActive }) =>
            isActive ? "navicons selected" : "navicons"
          }
        >
          Customers
        </NavLink>
        <NavLink
          to="/admin/history"
          className={({ isActive }) =>
            isActive ? "navicons selected" : "navicons"
          }
        >
          History
        </NavLink>
      </div>
      <span className="divider"></span>
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default SideBar;
