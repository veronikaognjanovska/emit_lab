import ReactPaginate from "react-paginate";
import BookPrintComponent from "./BookPrintComponent/BookPrintComponent";

import React from 'react';
import {Link} from "react-router-dom";

class BookView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            size: 5
        }
    }


    render() {
        const offset = this.state.size * this.state.page;
        const nextPageOffset = offset + this.state.size;
        const pageCount = Math.ceil(this.props.bookPrints.length / this.state.size);
        const bookPrintList = this.getBookPrintsPage(offset, nextPageOffset);

        return (
            <div className="row book-view">
                <div className={"button-right"}>
                    <a className={"btn btn-outline-success"}
                       onClick={() => this.props.addNewBookPrint(this.props.book?.id)}>
                        Add New Book Print
                    </a>
                </div>
                <div className={"button-left"}>
                    <Link className={"btn btn-outline-primary"} to={"/books"}>Back</Link>
                </div>
                <div className={"col-sm-12 m-4"}>
                    <h1>Book Info</h1>
                </div>
                <div className={"col-sm-12"}>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Book name</label>
                            <input type="text"
                                   className="form-control"
                                   id="name"
                                   name="name"
                                   value={this.props.book?.name}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Category</label>
                            <input type="text"
                                   className="form-control"
                                   id="category"
                                   name="category"
                                   value={this.props.book?.category}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Author</label>
                            <input type="text"
                                   className="form-control"
                                   id="author"
                                   name="author"
                                   value={this.props.book?.author?.name + ' ' + this.props.book?.author?.surname}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label>Author from</label>
                            <input type="text"
                                   className="form-control"
                                   id="author"
                                   name="author"
                                   value={this.props.book?.author?.country?.name + ' - ' + this.props.book?.author?.country?.continent}
                                   disabled
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="availableCopies">Number Available Copies</label>
                            <input type="text"
                                   className="form-control"
                                   id="availableCopies"
                                   name="availableCopies"
                                   // placeholder={this.props.book.availableCopies}
                                   value={this.props.book.availableCopies}
                                   disabled
                            />
                        </div>
                    </form>
                </div>
                <div className={"col-sm-12 mt-5"}>
                    <div className={"row"}>
                        <div className={"table-responsive mt"}>
                            <table className={"table table-striped"}>
                                <thead>
                                <tr>
                                    <th scope={"col"}>ID</th>
                                    <th scope={"col"}>Bookprint status</th>
                                    <th scope={"col"}></th>
                                </tr>
                                </thead>
                                <tbody>
                                {bookPrintList}
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

    getBookPrintsPage = (offset, nextPageOffset) => {
        return this.props.bookPrints.map((term, index) => {
            return (
                <BookPrintComponent key={index} term={term}
                                    onDeleteBookPrint={this.props.onDeleteBookPrint}
                                    onMarkAsTaken={this.props.onMarkAsTaken}
                                    onMarkAsReturned={this.props.onMarkAsReturned}/>
            );
        }).filter((book, index) => {
            return index >= offset && index < nextPageOffset;
        })
    }

}

export default BookView;
