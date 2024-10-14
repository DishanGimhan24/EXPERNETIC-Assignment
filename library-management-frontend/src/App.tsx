import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import BookList from './components/BookList';
import CreateBook from './components/CreateBook';
import EditBook from './components/BookEditForm';
import Login from './components/Login';
import Register from './components/Register';
import { AuthProvider, useAuth } from './components/AuthContext';

const ProtectedRoute: React.FC<{ element: JSX.Element }> = ({ element }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? element : <Navigate to="/login" />;
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <div>
                    <Routes>
                        <Route path="/login" element={<Login />} />
                        <Route path="/create" element={<ProtectedRoute element={<CreateBook />} />} />
                        <Route path="/books" element={<ProtectedRoute element={<BookList />} />} />
                        <Route path="/edit/:id" element={<ProtectedRoute element={<EditBook />} />} />
                        <Route path="/" element={<Register />} />
                    </Routes>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
