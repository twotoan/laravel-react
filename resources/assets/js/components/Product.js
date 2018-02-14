import React, {Component} from 'react';

/* Stateless component or pure component
 * { product } syntax is the object destructing
 */
const Product = ({product}) => {

    const divStyle = {

    }

    //if the props product is null, return Product doesn't exist
    if (!product) {
        return (<div style={divStyle}> Product Doesn't exist </div>);
    }

    //Else, display the product data
    return (
        <div style={divStyle}>
            <h2> {product.title} </h2>
            <p> {product.description} </p>
            <h3> Status {product.availability ? 'Available' : 'Out of stock'} </h3>
            <h3> Price : {product.price} </h3>
        </div>
    )
}

export default Product;


/*
handleDelete() {

    const currentProduct = this.state.currentProduct;
    fetch( 'api/products/' + this.state.currentProduct.id,
        { method: 'delete' })
        .then(response => {

            var array = this.state.products.filter(function(item) {
                return item !== currentProduct
            });

            this.setState({ products: array, currentProduct: null});

        });
}*/