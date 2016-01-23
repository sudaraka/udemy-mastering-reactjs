import React from 'react';
import PageHeader from './page-header';
import OrdersTable from './orders/orders-table.js';
import { toTitleCase } from '../lib/formatters';
import OrderStore from '../stores/orders-stores';
import OrderActions from '../actions/orders-actions';

const STATUSES = ['all', 'open', 'shipped'];

class TopCustomer extends React.Component {
  render() {
    let { topOrder } = this.props;

    if(!topOrder) {
      return null;
    }

    topOrder = topOrder.set('customer', topOrder.get('customer').split(/\s/)[0]);

    return <div>Top customer: {topOrder.get('customer')}</div>;
  }
}

class Orders extends React.Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
    this.state = OrderStore.getState();
  }

  componentDidMount() {
    OrderStore.listen(this.onChange);
    OrderActions.fetchOrders();
  }

  componentWillUnmount() {
    OrderStore.unlisten(this.onChange);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextState !== this.state;
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    const
      { selectedStatus, amountFilter } = this.state,

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
        return order.get('orderStatus') === selectedStatus;
      });
    }

    if(amountFilter) {
      orders = orders.filter(o => o.get('amount') === parseFloat(amountFilter));
    }

    const topOrder = orders.size ? orders.get(0) : null;

    return <div className='orders'>
      <PageHeader>
        <h1>Orders</h1>
        <nav className='status-nav'>{statuses}</nav>
        <form className='amount-filter'>
          <input type='text' placeholder='Filter by amount' value={amountFilter}
            onChange={this.handleAmountFilterChange.bind(this)} />
        </form>
      </PageHeader>
      <TopCustomer topOrder={topOrder} />
      <OrdersTable orders={orders} />
    </div>;
  }

  handleStatusClick(status) {
    OrderActions.updateSelectedStatus(status);
  }

  handleAmountFilterChange(e) {
    OrderActions.updateAmountFilter(e.currentTarget.value || null);
  }
}

export default Orders;
