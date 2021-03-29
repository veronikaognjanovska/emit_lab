import React from 'react';
import {useHistory} from 'react-router-dom';

const BookAdd = (props) => {

    const history = useHistory();
    const [formData, updateFormData] = React.useState({
        name: "",
        // category: 1,
        // author: 0,
        // availableCopies: 0
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
        const category = 1;//formData.category;
        const author = 1;//formData.author;
        const availableCopies = 0;//formData.availableCopies;

        props.onAddBook(name, category, author, availableCopies);
        history.push("/books");
    }

    return(
        <div className="row mt-5">
            <div className="col-md-5">
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
                    {/*<div className="form-group">*/}
                    {/*    <label>Category</label>*/}
                    {/*    <select name="category" className="form-control" onChange={handleChange}>*/}
                    {/*        {props.categories.map((term) =>*/}
                    {/*            <option value={term.id}>{term.name}</option>*/}
                    {/*        )}*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    {/*<div className="form-group">*/}
                    {/*    <label>Manufacturer</label>*/}
                    {/*    <select name="manufacturer" className="form-control" onChange={handleChange}>*/}
                    {/*        {props.manufacturers.map((term) =>*/}
                    {/*            <option value={term.id}>{term.name}</option>*/}
                    {/*        )}*/}
                    {/*    </select>*/}
                    {/*</div>*/}
                    <button id="submit" type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default BookAdd;
