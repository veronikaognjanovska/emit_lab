import React from 'react';
import ReactPaginate from 'react-paginate'
import BookComponent from "./BookComponent/BookComponent";
import './Books.css';
import {Link} from "react-router-dom";

class BooksList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 2
        }
    }

    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.books.length / this.state.size);
        const bookList = this.getBooksPage(offset, nextPageOffset);

        return (
            <div className={"row books"}>
                <div className={"button-right"}>
                    <Link className={"btn btn-outline-success add-btn"} to={"/books/add"}>Add New Book</Link>
                </div>
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
        return this.props.books.map((term, index) => {
            return (
                <BookComponent key={index} term={term} onEdit={this.props.onEdit} onView={this.props.onView}
                               onDeleteBook={this.props.onDelete}/>
            );
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

}

export default BooksList;
