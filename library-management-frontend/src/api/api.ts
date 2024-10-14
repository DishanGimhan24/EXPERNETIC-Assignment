// src/services/BookService.ts
import axios from 'axios';
import { Book } from '../models/Book';

const API_URL = 'http://localhost:5025/api/book'; // Your API endpoint

export const getBooks = async (): Promise<Book[]> => {
    const response = await axios.get<Book[]>(API_URL);
    return response.data;
};

export const getBookById = async (id: number): Promise<Book> => {
    const response = await axios.get<Book>(`${API_URL}/${id}`);
    return response.data;
};

export const createBook = async (book: Book): Promise<Book> => {
    const response = await axios.post<Book>(API_URL, book);
    return response.data;
};

export const updateBook = async (id: number, book: Book): Promise<void> => {
    await axios.put(`${API_URL}/${id}`, book);
};

export const deleteBook = async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/${id}`);
};
