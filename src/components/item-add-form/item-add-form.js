import React, {Component} from "react";
import './item-add-form.css';

export default class ItemAddForm extends Component {
    state = {
        label: ""
    }

    onLabelChange = (event) => {
        this.setState(() => {
            return {
                label: event.target.value
            };
        });
    };

    onSubmit = (event) => {
        event.preventDefault();
        this.props.addItem(this.state.label);
        this.setState({
                label: "",
        });
    };

        render() {

         return (
             <form className='item-add-form'
             onSubmit={this.onSubmit}>
                 <input type="text"
                        className='form-control d-flex'
                        onChange={this.onLabelChange}
                        value={this.state.label}
                 />
                 <button className='btn btn-outline-secondary'>
                     Add item
                 </button>
             </form>
         )
    }
};