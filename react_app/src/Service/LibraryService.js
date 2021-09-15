import axios from "../custom-axios/axios";

const LibraryService = {

    fetchBooks: () => {
        return axios.get("/books");
    },

    fetchCategories: () => {
        return axios.get("/books/categories");
    },

    fetchAuthors: () => {
        return axios.get("/authors");
    },

    addBook: (name, category, author, availableCopies) => {
        return axios.post("/books/add", {
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        });
    },

    editBook: (id, name, category, author, availableCopies) => {
        return axios.put(`/books/edit/${id}`, {
            "name": name,
            "category": category,
            "author": author,
            "availableCopies": availableCopies
        });
    },

    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },

    deleteBookPrint: (id) => {
        return axios.delete(`/books/delete/bookprint/${id}`);
    },

    addNewBookPrint: (id) => {
        return axios.put(`/books/addNewBookPrint/${id}`);
    },

    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },

    getBookPrints: (id) => {
        return axios.get(`/books/print/${id}`);
    },

    markAsTakenBookPrint: (id) => {
        return axios.put(`/books/markAsTaken/${id}`);
    },

    onMarkAsReturnedBookPrint: (id) => {
        return axios.put(`/books/markAsReturned/${id}`);
    },

};

export default LibraryService;
