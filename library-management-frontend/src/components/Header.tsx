// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Css/Header.css';

const Header: React.FC = () => {
    return (
        <header className="header">
            <h1>Library Management System</h1>
            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                    <li>
                        <Link to="/create">Add Book</Link>
                    </li>
                    <li>
                        <Link to="/books">Book List</Link>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;
