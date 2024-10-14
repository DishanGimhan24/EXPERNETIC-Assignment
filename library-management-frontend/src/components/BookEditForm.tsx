// src/components/BookEditForm.tsx
import React, { useState, useEffect } from 'react';
import { updateBook } from '../services/BookService'; // Ensure you import the correct update function
import { Book } from '../models/Book';

interface BookEditFormProps {
    book: Book;
    onUpdate: (updatedBook: Book) => void;
    onCancel: () => void;
}

const BookEditForm: React.FC<BookEditFormProps> = ({ book, onUpdate, onCancel }) => {
    const [title, setTitle] = useState<string>(book.title);
    const [author, setAuthor] = useState<string>(book.author);
    const [isbn, setIsbn] = useState<string>(book.isbn);
    const [publishedYear, setPublishedYear] = useState<number>(book.publishedYear);

    useEffect(() => {
        setTitle(book.title);
        setAuthor(book.author);
        setIsbn(book.isbn);
        setPublishedYear(book.publishedYear);
    }, [book]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const updatedBook: Book = { 
            ...book, 
            title, 
            author, 
            isbn, 
            publishedYear 
        };

        try {
            await updateBook(book.id, updatedBook); // Call the service to update the book with its ID
            onUpdate(updatedBook); // Call the parent handler to update the book list
        } catch (error) {
            console.error('Error updating book:', error);
            // You may want to handle error scenarios (e.g., show a notification)
        }
    };

    return (
        <div>
            <h3>Edit Book</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Title:</label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Author:</label>
                    <input
                        type="text"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>ISBN:</label>
                    <input
                        type="text"
                        value={isbn}
                        onChange={(e) => setIsbn(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Published Year:</label>
                    <input
                        type="number"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(Number(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Update Book</button>
                <button type="button" onClick={onCancel}>Cancel</button>
            </form>
        </div>
    );
};

export default BookEditForm;
