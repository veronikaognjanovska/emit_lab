import React from 'react';
import {Link} from 'react-router-dom';

const BookComponent = (props) => {
    return (
        <tr>
            <td>{props.term.id}</td>
            <td>{props.term.name}</td>
            <td>{props.term.category}</td>
            <td>{props.term.author.name + " " + props.term.author.surname}</td>
            <td>{props.term.availableCopies}</td>
            <td className={"text-right"}>
                <Link className={"btn btn-outline-warning ml-2"}
                      onClick={() => props.onView(props.term.id)}
                      to={`/books/view/${props.term.id}`}>
                    View
                </Link>
                <Link className={"btn btn-outline-info ml-2"}
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/books/edit/${props.term.id}`}>
                    Edit
                </Link>
            </td>
        </tr>
    )
}

export default BookComponent;
