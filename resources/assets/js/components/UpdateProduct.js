import React, {Component} from 'react';

class UpdateProduct extends Component {

    handleUpdate(product) {

        const currentProduct = this.state.currentProduct;
        fetch('api/products/' + currentProduct.id, {
            method: 'put',
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
                /* Updating the state */
                var array = this.state.products.filter(function (item) {
                    return item !== currentProduct
                })
                this.setState((prevState) => ({
                    products: array.concat(product),
                    currentProduct: product
                }))
            })
    }

    /* This method is invoked when submit button is pressed */
    handleSubmit(e) {
        //preventDefault prevents page reload
        e.preventDefault();
        /*A call back to the onAdd props. The current
         *state is passed as a param
         */
        this.props.onAdd(this.state.newProduct);
    }

    render() {
        const divStyle = {
            /*Code omitted for brevity */
        }

        return (
            <div>
                <h2> Update a product </h2>
                <div style={divStyle}>
                    /*when Submit button is pressed, the control is passed to
                     *handleSubmit method
                     */
                    <form onSubmit={this.handleSubmit}>
                        <label> Title:
                            {/*On every keystroke, the handleInput method is invoked */}
                            <input type="text" onChange={(e) => this.handleInput('title', e)}/>
                        </label>

                        <label> Description:
                            <input type="text" onChange={(e) => this.handleInput('description', e)}/>
                        </label>

                        {/* Input fields for Price and availability omitted for brevity */}

                        <input type="submit" value="Submit"/>
                    </form>
                </div>
            </div>)
    }
}

export default UpdateProduct;