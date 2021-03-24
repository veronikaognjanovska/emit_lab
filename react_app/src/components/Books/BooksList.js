import React from 'react';
import ReactPaginate from 'react-paginate'
import BookComponent from "./BookComponent/BookComponent";
// import ProductTerm from '../ProductTerm/productTerm';
// import {Link} from 'react-router-dom';
import './Books.css';

class BooksList extends React.Component {

    constructor(props) {
        super(props);
        console.log('----------get books api------------')
        console.log(props)
        console.log('----------------------')


        this.state = {
            page: 0,
            size: 2
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        // const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const pageCount = Math.ceil(10 / this.state.size);
        const bookList = this.getBooksPage(offset, nextPageOffset);

        return (
            <div className={"row"}>
                <div className={"col-sm-12 m-4"}>
                    <h1>List of Books</h1>
                </div>
                <div className={"col-sm-12"}>
                    <div className={"row"}>
                        <div className={"table-responsive mt"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>ID</th>
                                    <th scope={"col"}>Book Name</th>
                                    <th scope={"col"}>Book Category</th>
                                    <th scope={"col"}>Author Name</th>
                                    <th scope={"col"}>Available Copies</th>
                                    <th scope={"col"}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {bookList}
                                </tbody>
                            </table>
                        </div>
                        <div className="col mb-3">
                            <div className="row">
                                <div className="col-sm-12 col-sm-12">
                                    <ReactPaginate previousLabel={"back"}
                                                   nextLabel={"next"}
                                                   breakLabel={<a href="/#">...</a>}
                                                   breakClassName={"break-me"}
                                                   pageClassName={"ml-1"}
                                                   pageCount={pageCount}
                                                   marginPagesDisplayed={2}
                                                   pageRangeDisplayed={5}
                                                   onPageChange={this.handlePageClick}
                                                   containerClassName={"pagination react-pagination-js-border-bottom mb-3 justify-content-center"}
                                                   activeClassName={"active"}/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    handlePageClick = (data) => {
        let selected = data.selected;
        this.setState({
            page: selected
        })
    }

    getBooksPage = (offset, nextPageOffset) => {
        const books = [
            {id: 1, name: "book1", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5},
            {id: 1, name: "book2", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5},
            {id: 1, name: "book3", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5},
            {id: 1, name: "book4", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5},
            {id: 1, name: "book5", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5},
            {id: 1, name: "book6", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5},
            {id: 1, name: "book7", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5},
            {id: 1, name: "book8", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5},
            {id: 1, name: "book9", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5},
            {id: 1, name: "book10", category: "NOVEL", author: {name: "aa", surname: "aba"}, availableCopies: 5}
        ];

        // this.props.
        return books.map((term, index) => {
            return (
                <BookComponent term={term} onDelete={this.handleOnDelete} onEdit={this.props.onEdit}/>
            );
        }).filter((product, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

    handleOnDelete = (data) => {
        console.log('delete clicked')
        console.log(data)
    }

}

export default BooksList;
