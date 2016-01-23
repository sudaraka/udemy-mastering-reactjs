import React from 'react';
import PageHeader from './page-header';
import OrdersTable from './orders/orders-table.js';
import { toTitleCase } from '../lib/formatters';
import OrderStore from '../stores/orders-stores';
import OrderActions from '../actions/orders-actions';

const STATUSES = ['all', 'open', 'shipped'];

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = OrderStore.getState();
    this.state.selectedStatus = 'all';
  }

  componentDidMount() {
    OrderStore.listen(this.onChange);
    OrderActions.fetchOrders();
  }

  componentWillUnmount() {
    OrderStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const
      { selectedStatus } = this.state,

      statuses = STATUSES.map((status, i) => {
        const className = status === selectedStatus ? 'selected status' : 'status';

        return <a key={i} className={className} onClick={this.handleStatusClick.bind(this, status)}>
          {toTitleCase(status)}
        </a>;
      });

    let
      orders = this.state.orders;

    if('all' !== selectedStatus) {
      orders = orders.filter((order) => {
        return order.orderStatus === selectedStatus;
      });
    }

    return <div className='orders'>
      <PageHeader>
        <h1>Orders</h1>
        <nav className='status-nav'>{statuses}</nav>
      </PageHeader>
      <OrdersTable orders={orders} />
    </div>;
  }

  handleStatusClick(status) {
    this.setState({ 'selectedStatus': status });
  }
}

export default Orders;
