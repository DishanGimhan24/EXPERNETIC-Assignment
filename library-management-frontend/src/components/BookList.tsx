// src/components/BookList.tsx
import React, { useEffect, useState } from 'react';
import { getBooks, deleteBook } from '../services/BookService'; // Import deleteBook
import { Book } from '../models/Book';
import BookEditForm from './BookEditForm'; // Import BookEditForm component

const BookList: React.FC = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [editingBook, setEditingBook] = useState<Book | null>(null); // State for the book being edited

    useEffect(() => {
        const fetchBooks = async () => {
            const booksData = await getBooks();
            setBooks(booksData);
        };

        fetchBooks();
    }, []);

    const handleDelete = async (id: number) => {
        await deleteBook(id);
        setBooks(books.filter(book => book.id !== id)); // Remove the deleted book from the state
    };

    const handleEdit = (book: Book) => {
        setEditingBook(book); // Set the book to edit
    };

    const handleUpdate = (updatedBook: Book) => {
        setBooks(books.map(book => (book.id === updatedBook.id ? updatedBook : book))); // Update the book in the state
        setEditingBook(null); // Clear the editing book
    };

    return (
        <div>
            <h2>Book List</h2>
            <ul>
                {books.map(book => (
                    <li key={book.id}>
                        {book.title} by {book.author}
                        <button onClick={() => handleEdit(book)}>Edit</button>
                        <button onClick={() => handleDelete(book.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            {editingBook && (
                <BookEditForm 
                    book={editingBook} 
                    onUpdate={handleUpdate} 
                    onCancel={() => setEditingBook(null)} 
                />
            )}
        </div>
    );
};

export default BookList;
