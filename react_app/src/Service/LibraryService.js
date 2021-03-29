import axios from "../custom-axios/axios";

const LibraryService = {
    fetchBooks: () => {
        return axios.get("/books");
    },
    // fetchCategories: () => {
    //     return axios.get("/categories");
    // },
    // fetchBooks: () => {
    //     return axios.get("/Books");
    // },

    addBook: (name, category, author, availableCopies) => {
        console.log("addBook")

        // return axios.post("/books/add", {
        //     "name" : name,
        //     "category" : category,
        //     "author" : author,
        //     "availableCopies" : availableCopies
        // });
    },
    editBook: (id, name, category, author, availableCopies) => {
        console.log("editBook")

        // return axios.put(`/books/edit/${id}`, {
        //     "name" : name,
        //     "category" : category,
        //     "author" : author,
        //     "availableCopies" : availableCopies
        // });
    },
    deleteBook: (id) => {
        console.log("deleteBook")
        // return axios.delete(`/books/delete/${id}`);
    },
    getBook: (id) => {
        console.log("getBook")

        // return axios.get(`/books/${id}`);
    }
};

export default LibraryService;
