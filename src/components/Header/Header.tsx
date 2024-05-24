import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <nav>
        <ul>
          <li><NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink></li>
          <li><NavLink to="/posts" className={({ isActive }) => isActive ? "active" : ""}>Posts</NavLink></li>
          <li><NavLink to="/albums" className={({ isActive }) => isActive ? "active" : ""}>Albums</NavLink></li>
          <li><NavLink to="/photos" className={({ isActive }) => isActive ? "active" : ""}>Photos</NavLink></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
