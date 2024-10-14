// src/components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBooks, deleteBook } from '../services/BookService';
import { Book } from '../models/Book';
import Header from './Header';

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchBooks = async () => {
            const booksData = await getBooks();
            setBooks(booksData);
        };

        fetchBooks();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id)); // Update the state after deletion
    };

    const handleEdit = (id: number) => {
        navigate(`/edit/${id}`); // Navigate to the edit route
    };

    return (
        <div><Header />
        <div className="container mt-5">
            
            <h2 className="mb-4">Book List</h2>
            <table className="table table-striped">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Published Year</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td>{book.id}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>{book.description}</td>
                            <td>{book.publishedYear}</td>
                            <td>
                                <button 
                                    className="btn btn-warning me-2"
                                    onClick={() => handleEdit(book.id)}
                                >
                                    Edit
                                </button>
                                <button 
                                    className="btn btn-danger" 
                                    onClick={() => handleDelete(book.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    );
};

export default BookList;
