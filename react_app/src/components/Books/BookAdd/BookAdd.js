import React from 'react';
import {Link, useHistory} from 'react-router-dom';

const BookAdd = (props) => {

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
        })
    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        const name = formData.name;
        const category = formData.category;
        const author = formData.author;
        const availableCopies = formData.availableCopies;
        props.addBookPrint(name, category, author, availableCopies);
        history.push("/books");
    }

    return (
        <div className="row">
            <div className={"col-sm-12 m-4"}>
                <h1>Add Book</h1>
            </div>
            <div className={"col-sm-12"}>
                <form onSubmit={onFormSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Book name</label>
                        <input type="text"
                               className="form-control"
                               id="name"
                               name="name"
                               required
                               placeholder="Enter book name"
                               onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Category</label>
                        <select name="category" className="form-control" onChange={handleChange}
                            // defaultValue={props.categories[3]}
                                required>
                            <option value="" selected disabled hidden>Choose here</option>
                            {props.categories.map((term, index) =>
                                <option key={index} value={term}>{term}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Author</label>
                        <select name="author" className="form-control" onChange={handleChange}
                            // defaultValue={props.authors[0]}
                                required>
                            <option value="" selected disabled hidden>Choose here</option>
                            {props.authors.map((term, index) =>
                                <option key={index} value={term.id}>{term.name + ' ' + term.surname}</option>
                            )}
                        </select>
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Available Copies</label>
                        <input type="number"
                               className="form-control"
                               id="availableCopies"
                               name="availableCopies"
                               required
                               placeholder="Enter number available copies"
                               onChange={handleChange}
                        />
                    </div>
                    <Link className={"btn btn-outline-primary float-left"} to={"/books"}>Back</Link>
                    <button id="submit" type="submit" className={"btn btn-primary float-right"}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookAdd;
