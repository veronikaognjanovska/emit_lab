import React from 'react';
import {Link} from 'react-router-dom';

const BookComponent = (props) => {
    return (
        <tr>
            <td>{props.term.id}</td>
            <td>{props.term.name}</td>
            <td>{props.term.category}</td>
            <td>{props.term.author}</td>
            <td>{props.term.availableCopies}</td>
            <td className={"text-right"}>
                <a title={"Delete"} className={"btn btn-danger"}
                   onClick={() => props.onDelete(props.term.id)}>
                    Delete
                </a>
                <Link className={"btn btn-info ml-2"}
                      onClick={() => props.onEdit(props.term.id)}
                      to={`/products/edit/${props.term.id}`}>
                    Edit
                </Link>
            </td>
        </tr>
    )
}

export default BookComponent;
