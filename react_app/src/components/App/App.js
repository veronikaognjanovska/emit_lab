import './App.css';
import React, {Component} from "react";
import Header from '../Header/Header';
import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'
import LibraryService from "../../Service/LibraryService";
import NotificationService from "../../Notifications/NotificationService";
import BooksList from "../Books/BooksList";
import BookAdd from '../Books/BookAdd/BookAdd';
import BookEdit from '../Books/BookEdit/BookEdit';
import BookView from "../Books/BookView/BookView";
import Categories from "../Categories/Categories";
import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'

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
                <ReactNotification/>
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
                                addBook={this.addBook}/>
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

    addBook = (name, price, quantity, category, manufacturer) => {
        LibraryService.addBook(name, price, quantity, category, manufacturer)
            .then(() => {
                this.loadBooks();
                NotificationService.success('Success!', 'Book Print added successfully!')
            });
    }

    editBook = (id, name, price, quantity, category, manufacturer) => {
        LibraryService.editBook(id, name, price, quantity, category, manufacturer)
            .then(() => {
                this.loadBooks();
                NotificationService.success('Success!', 'Book edited successfully!')
            });
    }

    onMarkAsTaken = (id) => {
        LibraryService.markAsTakenBookPrint(id)
            .then(() => {
                this.reloadSelected();
                NotificationService.success('Success!', 'Book Print marked as taken successfully!')
            });
    }

    onMarkAsReturned = (id) => {
        LibraryService.onMarkAsReturnedBookPrint(id)
            .then(() => {
                this.reloadSelected();
                NotificationService.success('Success!', 'Book Print marked as returned successfully!')
            });
    }

    deleteBookPrint = (id) => {
        LibraryService.deleteBookPrint(id)
            .then(() => {
                this.reloadSelected();
                NotificationService.warn('Warning!', 'Book Print deleted successfully!')
            });
    }

    addNewBookPrint = (id) => {
        LibraryService.addNewBookPrint(id)
            .then(() => {
                this.reloadSelected();
                NotificationService.success('Success!', 'Book Print added successfully!')
            });
    }

    reloadSelected() {
        this.loadBooks();
        this.getBook(this.state.selectedBook.id);
        this.getBookPrints(this.state.selectedBook.id);
    }
}

export default App;
