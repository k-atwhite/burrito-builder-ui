import React, { Component } from 'react';
import './App.css';
import {getOrders, postOrder} from '../../apiCalls';
import Orders from '../../components/Orders/Orders';
import OrderForm from '../../components/OrderForm/OrderForm';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orders: []
    }
  }

  componentDidMount() {
    getOrders().then((data) => this.setState({orders: data.orders}))
      .catch(err => console.error('Error fetching:', err));
  }

  addNewOrder = (name, ingredients) => {
    postOrder(name, ingredients).then(data => this.setState({orders: [data, ...this.state.orders]}))
  }

  render() {
    return (
      <main className="App">
        <header>
          <h1>Burrito Builder</h1>
          <OrderForm addNewOrder={this.addNewOrder}/>
        </header>

        <Orders orders={this.state.orders}/>
      </main>
    );
  }
}


export default App;
