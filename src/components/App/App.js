import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: [],
      error: ""
    }
  }

  componentDidMount() {
    getOrders().then((data) => this.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  addNewOrder = (name, ingredients) => {
    postOrder(name, ingredients)
    .then(data => this.setState({orders: [...this.state.orders, data]}))
  }

  serverErrorCheck(response) {
    if (response.status === 500) {
      this.setState({error: "Sorry, our servers are down"})
    }
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          {this.state.error && <h2 className="err-msg">{this.state.error}</h2>}
          <OrderForm className="order-form" addNewOrder={this.addNewOrder}/>
        </header>
        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
