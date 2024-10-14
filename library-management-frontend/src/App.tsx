// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';
import EditBook from './components/BookEditForm';

const App: React.FC = () => {
    return (
        <Router>
            <div>
                

                <Routes>
                    <Route path="/" element={<h2>Welcome to the Library Management System!</h2>} />
                    <Route path="/create" element={<CreateBook />} />
                    <Route path="/books" element={<BookList />} />
                    <Route path="/edit/:id" element={<EditBook />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
