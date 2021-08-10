import React, { Component } from 'react';

class OrderForm extends Component {
  constructor(props) {
    super();
    this.props = props;
    this.state = {
      name: '',
      ingredients: [],
      error: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    if (!this.state.name || !this.state.ingredients.length) {
      this.setState({error: "Please fill out name and ingredients!"})
    } else {
      this.props.addNewOrder(this.state.name, this.state.ingredients)
      this.clearInputs();
    }
  }

  clearInputs = () => {
    this.setState({name: '', ingredients: []});
    this.setState({error: ""})
  }

  handleNameChange = (e) => {
    this.setState({name: e.target.value})
  }

  handleIngredientChange = (e) => {
    e.preventDefault()
    this.setState({ingredients: [...this.state.ingredients, e.target.name]})
  }
  render() {
    const possibleIngredients = ['beans', 'steak', 'carnitas', 'sofritas', 'lettuce', 'queso fresco', 'pico de gallo', 'hot sauce', 'guacamole', 'jalapenos', 'cilantro', 'sour cream'];
    const ingredientButtons = possibleIngredients.map(ingredient => {
      return (
        <button className="ing-btn" key={ingredient} name={ingredient} onClick={e => this.handleIngredientChange(e)}>
          {ingredient}
        </button>
      )
    });

    return (
      <form>
        <input
          type='text'
          placeholder='Name'
          name='name'
          value={this.state.name}
          onChange={e => this.handleNameChange(e)}
        />

        { ingredientButtons }

        <p className="empty-msg">Order: { this.state.ingredients.join(', ') || 'Nothing selected' }</p>
        {this.state.error && <p className="err-msg">{this.state.error}</p>}
        <button onClick={e => this.handleSubmit(e)} className="submit-btn">
          Submit Order
        </button>
      </form>
    )
  }
}

export default OrderForm;
