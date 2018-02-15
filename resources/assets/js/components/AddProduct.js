import React, {Component} from 'react';

class AddProduct extends Component {

    constructor(props) {
        super(props);
        /* Initialize the state. */
        this.state = {
            newProduct: {
                title: '',
                description: '',
                price: 0,
                availability: 0
            }
        }

        //Boilerplate code for binding methods with `this`
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }

    /* This method dynamically accepts inputs and stores it in the state */
    handleInput(key, e) {

        /*Duplicating and updating the state */
        var state = Object.assign({}, this.state.newProduct);
        state[key] = e.target.value;
        this.setState({newProduct: state });
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
            /*Code omitted for brevity */ }

        return(
            <div>
                <h2> Add new product </h2>
                <div style={divStyle}>
                    /*when Submit button is pressed, the control is passed to
                     *handleSubmit method
                     */
                    <form onSubmit={this.handleSubmit}>
                        <label> Title:
                            { /*On every keystroke, the handleInput method is invoked */ }
                            <input type="text" onChange={(e)=>this.handleInput('title',e)} />
                        </label>

                        <label> Description:
                            <input type="text" onChange={(e)=>this.handleInput('description',e)} />
                        </label>

                        { /* Input fields for Price and availability omitted for brevity */}

                        <input type="submit" value="Submit" />
                    </form>
                </div>
            </div>)
    }
}

export default AddProduct;