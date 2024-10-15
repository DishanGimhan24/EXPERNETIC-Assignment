// src/components/CreateBook.tsx
import React, { useState } from 'react';
import { createBook } from '../services/BookService';
import { Book } from '../models/Book';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const CreateBook: React.FC = () => {
    // Define state with appropriate types
    const [title, setTitle] = useState<string>('');
    const [author, setAuthor] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [publishedYear, setPublishedYear] = useState<string>(''); // Keep as string for input control
    const [error, setError] = useState<string>(''); // To store validation errors
    const navigate = useNavigate();

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const year = Number(publishedYear);

        // Validate published year: must be a 4-digit positive number
        if (year < 1000 || year > 9999) {
            setError('Published year must be a four-digit positive number.');
            return;
        }

        const newBook: Book = {
            id: 0, // ID will be auto-generated
            title,
            author,
            description,
            publishedYear: year,
        };

        await createBook(newBook);
        // Clear the form
        setTitle('');
        setAuthor('');
        setDescription('');
        setPublishedYear('');
        setError(''); // Clear any existing error
        navigate('/books');
    };

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="card">
                    <div className="card-body">
                        <h2 className="card-title">Create Book</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter book title"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Author</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter author name"
                                    value={author}
                                    onChange={(e) => setAuthor(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Description</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter Description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Published Year</label>
                                <input
                                    type="number"
                                    className="form-control"
                                    placeholder="Enter published year"
                                    value={publishedYear}
                                    onChange={(e) => setPublishedYear(e.target.value)} // Keep it as a string for validation
                                    min="1000" // Set minimum value to 1000 for 4-digit years
                                    max="9999" // Set maximum value to 9999 for 4-digit years
                                    required
                                />
                                {error && <div className="text-danger">{error}</div>} {/* Display error message */}
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Add Book
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateBook;
