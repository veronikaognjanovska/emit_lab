import React from 'react';

const Categories = (props) => {
    return (
        <div className={"row"}>
            <div className={"col-sm-12 m-4"}>
                <h1>List of Categories</h1>
            </div>
            <div className={"col-sm-12"}>
                <div className={"row"}>
                    <div className={"table-responsive mt"}>
                        <table className={"table table-striped"}>
                            <thead>
                            <tr>
                                <th scope={"col"}>Categories</th>
                            </tr>
                            </thead>
                            <tbody>
                            {props.categories.map((term, index) =>
                                <tr key={index}>
                                    <td>{term}</td>
                                </tr>
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Categories;
