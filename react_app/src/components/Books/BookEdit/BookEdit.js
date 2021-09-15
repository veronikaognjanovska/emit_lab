import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const BookEdit = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: "",
        category: -1,
        author: -1,
        availableCopies: 0
    })

    const handleChange = (e) => {
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim()
        });
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name !== "" ? formData.name : props.book.name;
        const category = formData.category !== -1 ? formData.category : props.book.category;
        const author = formData.author !== -1 ? formData.author : props.book.author.id;
        const availableCopies = props.book.availableCopies;

        props.onEditBook(props.book.id, name, category, author, availableCopies);
        history.push("/books");
    }

    return (
        <div className="row book-edit">
            <div className={"button-left"}>
                <Link className={"btn btn-outline-primary"} to={"/books"}>Back</Link>
            </div>
            <div className={"col-sm-12 m-4"}>
                <h1>Edit Book</h1>
            </div>
            <div className={"col-sm-12"}>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               placeholder={props.book?.name}
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" id="category" className="form-control" onChange={handleChange}
                                defaultValue={props.book?.category}>
                            {props.categories.map((term, index) => {
                                if (props.book.category !== undefined &&
                                    props.book.category === term)
                                    return <option key={index} selected={props.book.category}
                                                   value={term}>{term}</option>
                                else
                                    return <option key={index} value={term}>{term}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" id="author" className="form-control" onChange={handleChange}
                                defaultValue={props.book?.author?.id}>
                            {props.authors.map((term, index) => {
                                if (props.book.author !== undefined &&
                                    props.book.author.id === term.id)
                                    return <option key={index} selected={props.book.author.id}
                                                   value={term.id}>{term.name + ' ' + term.surname}</option>
                                else
                                    return <option key={index} value={term.id}>{term.name + ' ' + term.surname}</option>
                            })}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="availableCopies">Number Available Copies</label>
                        <input type="text"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               value={props.book.availableCopies}
                               onChange={handleChange}
                               disabled
                        />
                    </div>
                    <button id="submit" type="submit" className={"btn btn-primary float-right"}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookEdit;
