import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Product from './Product';
import AddProduct from './AddProduct';

/* Main Component */
class Main extends Component {

    constructor() {

        super();

        /* currentProduct keeps track of the product currently
         * displayed */
        this.state = {
            products: [],
            currentProduct: null
        }
        this.handleAddProduct = this.handleAddProduct.bind(this);
    }

    componentDidMount() {
        fetch('/api/products')
            .then(response => {
                return response.json();
            })
            .then(products => {
                //Fetched product is stored in the state
                this.setState({products});
            })
    }

    renderProducts() {
        return this.state.products.map(product => {
            return (
                //this.handleClick() method is invoked onClick.
                <li onClick={
                    () => this.handleClick(product)} key={product.id}>
                    {product.title}
                </li>
            );
        })
    }

    handleClick(product) {
        //handleClick is used to set the state
        this.setState({currentProduct: product});

    }

    handleAddProduct(product) {

        product.price = Number(product.price);
        /*Fetch API for post request */
        fetch('api/products/', {
            method: 'post',
            /* headers are important*/
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(product)
        })
            .then(response => {
                return response.json();
            })
            .then(data => {
                //update the state of products and currentProduct
                this.setState((prevState) => ({
                    products: prevState.products.concat(data),
                    currentProduct: data
                }))
            })

    }



    handleUpdate(product) {

        const currentProduct = this.state.currentProduct;
        fetch( 'api/products/' + currentProduct.id, {
            method:'put',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(response => {
                return response.json();
            })
            .then( data => {
                /* Updating the state */
                var array = this.state.products.filter(function(item) {
                    return item !== currentProduct
                })
                this.setState((prevState)=> ({
                    products: array.concat(product),
                    currentProduct : product
                }))
            })
    }

    render() {
        return (
            /* The extra divs are for the css styles */
            <div>
                <div>
                    <h3> All products </h3>
                    <ul>
                        {this.renderProducts()}
                    </ul>
                </div>

                <Product product={this.state.currentProduct}/>
                <AddProduct onAdd={this.handleAddProduct}/>
            </div>
        );
    }
}

export default Main;

if (document.getElementById('root')) {
    ReactDOM.render(<Main/>, document.getElementById('root'));
}