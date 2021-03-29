import './App.css';
import React, {Component} from "react";
import Header from '../Header/Header';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import LibraryService from "../../Service/LibraryService";
import BooksList from "../Books/BooksList";
import BookAdd from '../Books/BookAdd/BookAdd';
import BookEdit from '../Books/BookEdit/BookEdit';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            // products: [],
            // categories: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container pt-4"}>
                        {/*<Route path={"/categories"} exact render={() =>*/}
                        {/*    <Categories categories={this.state.categories}/>}/>*/}
                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd
                                // categories={this.state.categories}
                                //         manufacturers={this.state.manufacturers}
                                        onAddBook={this.addBook}/>
                        }/>
                        <Route path={"/books/edit/:id"} exact render={() =>
                            <BookEdit
                                // categories={this.state.categories}
                                //          manufacturers={this.state.manufacturers}
                                         onEditBook={this.editBook}
                                         book={this.state.selectedBook}/>
                        }/>
                        <Route path={"/books"} exact render={() =>
                            <BooksList books={this.state.books}
                                       onDelete={this.deleteBook}
                                       onEdit={this.getBook}/>
                        }/>
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        // this.loadCategories();
        // this.loadProducts();
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }
    //
    // loadProducts = () => {
    //     EShopService.fetchProducts()
    //         .then((data) => {
    //             this.setState({
    //                 products: data.data
    //             })
    //         });
    // }
    //
    // loadCategories = () => {
    //     EShopService.fetchCategories()
    //         .then((data) => {
    //             this.setState({
    //                 categories: data.data
    //             })
    //         });
    // }
    //
    deleteBook = (id) => {
        LibraryService.deleteBook(id)
            .then(() => {
                this.loadBooks();
            });
    }

    addBook = (name, price, quantity, category, manufacturer) => {
        LibraryService.addBook(name, price, quantity, category, manufacturer)
            .then(() => {
                this.loadBooks();
            });
    }

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedProduct: data.data
                })
            })
    }

    editBook = (id, name, price, quantity, category, manufacturer) => {
        LibraryService.editBook(id, name, price, quantity, category, manufacturer)
            .then(() => {
                this.loadBooks();
            });
    }
}

export default App;
