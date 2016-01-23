import alt from '../alt';
import OrdersActions from '../actions/orders-actions';

class OrdersStore {
  constructor() {
    this.orders = [];

    this.bindListeners({
      'handleUpdateOrders': OrdersActions.UPDATE_ORDERS,
      'handleFetchOrders': OrdersActions.FETCH_ORDERS
    });
  }

  handleUpdateOrders(orders) {
    this.orders = orders;
  }

  handleFetchOrders(orders) {
    this.orders = [];
  }
}

export default alt.createStore(OrdersStore);
