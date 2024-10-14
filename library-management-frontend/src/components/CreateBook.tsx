// src/components/CreateBook.tsx
import React, { useState } from 'react';
import { createBook } from '../services/BookService';
import { Book } from '../models/Book';

const CreateBook: React.FC = () => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [isbn, setIsbn] = useState('');
    const [publishedYear, setPublishedYear] = useState(0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const newBook: Book = {
            id: 0, // ID will be auto-generated
            title,
            author,
            isbn,
            publishedYear,
        };

        await createBook(newBook);
        // Clear the form
        setTitle('');
        setAuthor('');
        setIsbn('');
        setPublishedYear(0);
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create Book</h2>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="ISBN"
                value={isbn}
                onChange={(e) => setIsbn(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Published Year"
                value={publishedYear}
                onChange={(e) => setPublishedYear(Number(e.target.value))}
                required
            />
            <button type="submit">Add Book</button>
        </form>
    );
};

export default CreateBook;
