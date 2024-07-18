import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import './Sidebar.css';

const SideBar = ({ state }) => {
    const params = useParams();

    return (
      <div className="sidebar-container">
        <div className="sidebar">
          <NavLink
            to="/home/hero"
            className={({ isActive }) =>
              isActive ? "navicons selected" : "navicons"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/home/cart"
            className={({ isActive }) =>
              isActive ? "navicons selected" : "navicons"
            }
          >
            Cart
          </NavLink>
          <NavLink
            to="/home/account"
            className={({ isActive }) =>
              isActive ? "navicons selected" : "navicons"
            }
          >
            Account
          </NavLink>
          <NavLink
            to="/home/orders"
            className={({ isActive }) =>
              isActive ? "navicons selected" : "navicons"
            }
          >
            Orders
          </NavLink>
        </div>
        <span className="divider"></span>
        <div className="content">
          <Outlet />
        </div>
      </div>
    );
}

export default SideBar;
