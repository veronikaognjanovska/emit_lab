import './App.css';
import React, {Component} from "react";
import Header from '../Header/Header';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import LibraryService from "../../Service/LibraryService";
import BooksList from "../Books/BooksList";
import BookAdd from '../Books/BookAdd/BookAdd';
import BookEdit from '../Books/BookEdit/BookEdit';
import BookView from "../Books/BookView/BookView";
import Categories from "../Categories/Categories";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            authors: [],
            bookPrints: [],
            selectedBook: {}
        }
    }

    render() {
        return (
            <Router>
                <Header/>
                <main>
                    <div className={"container pt-4"}>
                        <Route path={"/categories"} exact render={() =>
                            <Categories
                                categories={this.state.categories}
                            />
                        }/>
                        <Route path={"/books/add"} exact render={() =>
                            <BookAdd
                                categories={this.state.categories}
                                authors={this.state.authors}
                                addBookPrint={this.addBookPrint}/>
                        }/>
                        <Route path={"/books/edit/:id"} exact render={() =>
                            <BookEdit
                                categories={this.state.categories}
                                authors={this.state.authors}
                                onEditBook={this.editBook}
                                book={this.state.selectedBook}/>
                        }/>
                        <Route path={"/books/view/:id"} exact render={() =>
                            <BookView
                                book={this.state.selectedBook}
                                bookPrints={this.state.bookPrints}
                                onMarkAsTaken={this.onMarkAsTaken}
                                onMarkAsReturned={this.onMarkAsReturned}
                                onDeleteBookPrint={this.deleteBookPrint}
                                addNewBookPrint={this.addNewBookPrint}
                            />
                        }/>
                        <Route path={"/books"} exact render={() =>
                            <BooksList books={this.state.books}
                                       onEdit={this.getBook}
                                       onView={this.onViewGet}/>
                        }/>
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>
        );
    }

    componentDidMount() {
        this.loadBooks();
        this.loadCategories();
        this.loadAuthors();
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                this.setState({
                    books: data.data
                })
            });
    }

    loadCategories = () => {
        LibraryService.fetchCategories()
            .then((data) => {
                this.setState({
                    categories: data.data
                })
            });
    }

    loadAuthors = () => {
        LibraryService.fetchAuthors()
            .then((data) => {
                this.setState({
                    authors: data.data
                })
            });
    }

    onViewGet = (id) => {
        this.getBook(id);
        this.getBookPrints(id);
    }

    getBook = (id) => {
        LibraryService.getBook(id)
            .then((data) => {
                this.setState({
                    selectedBook: data.data
                })
            })
    }

    getBookPrints = (id) => {
        LibraryService.getBookPrints(id)
            .then((data) => {
                this.setState({
                    bookPrints: data.data
                })
            })
    }

    addBookPrint = (name, price, quantity, category, manufacturer) => {
        LibraryService.addBookPrint(name, price, quantity, category, manufacturer)
            .then(() => {
                this.loadBooks();
            });
    }

    editBook = (id, name, price, quantity, category, manufacturer) => {
        LibraryService.editBook(id, name, price, quantity, category, manufacturer)
            .then(() => {
                this.loadBooks();
            });
    }

    onMarkAsTaken = (id) => {
        LibraryService.markAsTakenBookPrint(id)
            .then(() => {
                this.reloadSelected();
            });
    }

    onMarkAsReturned = (id) => {
        LibraryService.onMarkAsReturnedBookPrint(id)
            .then(() => {
                this.reloadSelected();
            });
    }

    deleteBookPrint = (id) => {
        LibraryService.deleteBookPrint(id)
            .then(() => {
                this.reloadSelected();
            });
    }

    addNewBookPrint = (id) => {
        LibraryService.addNewBookPrint(id)
            .then(() => {
                this.reloadSelected();
            });
    }

    reloadSelected() {
        this.loadBooks();
        this.getBook(this.state.selectedBook.id);
        this.getBookPrints(this.state.selectedBook.id);
    }
}

export default App;
