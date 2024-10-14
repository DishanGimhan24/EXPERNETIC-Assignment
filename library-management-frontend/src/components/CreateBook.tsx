// src/components/CreateBook.tsx
import React, { useState } from 'react';
import { createBook } from '../services/BookService';
import { Book } from '../models/Book';
import Header from './Header';

const CreateBook: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [publishedYear, setPublishedYear] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newBook: Book = {
            id: 0, // ID will be auto-generated
            title,
            author,
            description,
            publishedYear,
        };

        await createBook(newBook);
        // Clear the form
        setTitle('');
        setAuthor('');
        setDescription('');
        setPublishedYear(0);
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
                                placeholder="Enter ISBN"
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
                                onChange={(e) => setPublishedYear(Number(e.target.value))}
                                required
                            />
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
