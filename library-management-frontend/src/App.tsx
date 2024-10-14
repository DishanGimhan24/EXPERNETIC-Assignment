// src/App.tsx
import React from 'react';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';

const App: React.FC = () => {
    return (
        <div>
            <h1>Library Management System</h1>
            <CreateBook />
            <BookList />
        </div>
    );
};

export default App;
