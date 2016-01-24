import alt from '../alt';
import Immutable from 'immutable';
import OrdersActions from '../actions/orders-actions';
import parseOrders from '../utils/parse-orders';

class OrdersStore {
  constructor() {
    this.state = {
      'orders': Immutable.List(),
      'selectedStatus': 'all',
      'amountFilter': null
    };

    this.bindListeners({
      'handleUpdateOrders': OrdersActions.UPDATE_ORDERS,
      'handleUpdateSelectedStatus': OrdersActions.UPDATE_SELECTED_STATUS,
      'handleUpdateAmountFilter': OrdersActions.UPDATE_AMOUNT_FILTER,
    });
  }

  handleUpdateOrders(orders) {
    this.setState({ 'orders': orders });
  }

  handleUpdateAmountFilter(amount) {
    this.setState({ 'amountFilter': amount });
  }

  handleUpdateSelectedStatus(status) {
    this.setState({ 'selectedStatus': status });
  }
}

OrdersStore.config = {
  'onDeserialize': (data) => {
    const
      nextState = Object.assign({}, data, {
        'orders': Immutable.fromJS(parseOrders(data.orders))
      });
  }
};

export default alt.createStore(OrdersStore, 'OrdersStore');
