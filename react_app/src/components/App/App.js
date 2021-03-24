import './App.css';
import React, {Component} from "react";
import Header from '../Header/Header';
import {BrowserRouter as Router, Route, Redirect} from 'react-router-dom'
import LibraryService from "../../Service/LibraryService";
import BooksList from "../Books/BooksList";

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            books: [],
            // products: [],
            // categories: [],
            // selectedProduct: {}
        }
    }

    render() {
        return (
            // <Router>
            //     <Header/>
            //     <div>
            //         HELLO
            //     </div>
            // </Router>

            <Router>
                <Header/>
                <main>
                    <div className={"container pt-4"}>
                        <Route path={"/books"} exact render={() =>
                            <BooksList books={this.state.books}/>
                        }/>
                        {/*<Route path={"/categories"} exact render={() =>*/}
                        {/*    <Categories categories={this.state.categories}/>}/>*/}
                        {/*<Route path={"/products/add"} exact render={() =>*/}
                        {/*    <ProductAdd categories={this.state.categories}*/}
                        {/*                manufacturers={this.state.manufacturers}*/}
                        {/*                onAddProduct={this.addProduct}/>}/>*/}
                        {/*<Route path={"/products/edit/:id"} exact render={() =>*/}
                        {/*    <ProductEdit categories={this.state.categories}*/}
                        {/*                 manufacturers={this.state.manufacturers}*/}
                        {/*                 onEditProduct={this.editProduct}*/}
                        {/*                 product={this.state.selectedProduct}/>}/>*/}
                        {/*<Route path={"/products"} exact render={() =>*/}
                        {/*    <Products products={this.state.products}*/}
                        {/*              onDelete={this.deleteProduct}*/}
                        {/*              onEdit={this.getProduct}/>}/>*/}
                        <Redirect to={"/books"}/>
                    </div>
                </main>
            </Router>

        );
    }

    componentDidMount() {
        this.loadBooks();
        // this.loadCategories();
        // this.loadProducts();
    }

    loadBooks = () => {
        LibraryService.fetchBooks()
            .then((data) => {
                console.log('----------------------')
                this.setState({
                    books: data.data
                })
            });
    }
    //
    // loadProducts = () => {
    //     EShopService.fetchProducts()
    //         .then((data) => {
    //             this.setState({
    //                 products: data.data
    //             })
    //         });
    // }
    //
    // loadCategories = () => {
    //     EShopService.fetchCategories()
    //         .then((data) => {
    //             this.setState({
    //                 categories: data.data
    //             })
    //         });
    // }
    //
    // deleteProduct = (id) => {
    //     EShopService.deleteProduct(id)
    //         .then(() => {
    //             this.loadProducts();
    //         });
    // }
    //
    // addProduct = (name, price, quantity, category, manufacturer) => {
    //     EShopService.addProduct(name, price, quantity, category, manufacturer)
    //         .then(() => {
    //             this.loadProducts();
    //         });
    // }
    //
    // getProduct = (id) => {
    //     EShopService.getProduct(id)
    //         .then((data) => {
    //             this.setState({
    //                 selectedProduct: data.data
    //             })
    //         })
    // }
    //
    // editProduct = (id, name, price, quantity, category, manufacturer) => {
    //     EShopService.editProduct(id, name, price, quantity, category, manufacturer)
    //         .then(() => {
    //             this.loadProducts();
    //         });
    // }
}

export default App;
