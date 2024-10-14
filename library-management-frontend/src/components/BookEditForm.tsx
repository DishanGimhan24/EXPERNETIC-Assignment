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

    useEffect(() => {
        const fetchBook = async () => {
            if (id) {
                const fetchedBook = await getBookById(Number(id));
                setBook(fetchedBook);
                setTitle(fetchedBook.title);
                setAuthor(fetchedBook.author);
            }
        };

        fetchBook();
    }, [id]);

    const handleUpdate = async () => {
        if (book) {
            const updatedBook: Book = { ...book, title, author };
            await updateBook(book.id, updatedBook);
            navigate('/books'); // Redirect to book list after update
        }
    };

    return (
        <div>
            <h2>Edit Book</h2>
            {book ? (
                <div>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                        placeholder="Title" 
                    />
                    <input 
                        type="text" 
                        value={author} 
                        onChange={(e) => setAuthor(e.target.value)} 
                        placeholder="Author" 
                    />
                    <button onClick={handleUpdate}>Update</button>
                    <button onClick={() => navigate('/books')}>Cancel</button>
                </div>
            ) : (
                <p>Loading book details...</p>
            )}
        </div>
    );
};

export default EditBook;
