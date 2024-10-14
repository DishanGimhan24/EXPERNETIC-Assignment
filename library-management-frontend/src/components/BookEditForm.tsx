// src/components/EditBook.tsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBookById, updateBook } from '../services/BookService';
import { Book } from '../models/Book';

const EditBook: React.FC = () => {
    const { id } = useParams<{ id: string }>(); // Get the book ID from the route
    const navigate = useNavigate(); // Hook for navigation
    const [book, setBook] = useState<Book | null>(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [description, setDescription] = useState('');
    const [publishedYear, setPublishedYear] = useState(0);

    useEffect(() => {
        const fetchBook = async () => {
            if (id) {
                const fetchedBook = await getBookById(Number(id));
                setBook(fetchedBook);
                setTitle(fetchedBook.title);
                setAuthor(fetchedBook.author);
                setDescription(fetchedBook.description); 
                setPublishedYear(fetchedBook.publishedYear); // Set the published year
            }
        };

        fetchBook();
    }, [id]);

    const handleUpdate = async () => {
        if (book) {
            const updatedBook: Book = { ...book, title, author,description, publishedYear }; // Include ISBN and Published Year
            await updateBook(book.id, updatedBook);
            navigate('/books'); // Redirect to book list after update
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Edit Book</h2>
            {book ? (
                <div className="card p-4">
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Title"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input
                            type="text"
                            className="form-control"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Author"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="ISBN"
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Published Year</label>
                        <input
                            type="number"
                            className="form-control"
                            value={publishedYear}
                            onChange={(e) => setPublishedYear(Number(e.target.value))}
                            placeholder="Published Year"
                        />
                    </div>
                    <button className="btn btn-primary me-2" onClick={handleUpdate}>
                        Update
                    </button>
                    <button className="btn btn-secondary" onClick={() => navigate('/books')}>
                        Cancel
                    </button>
                </div>
            ) : (
                <p>Loading book details...</p>
            )}
        </div>
    );
};

export default EditBook;
