import expect from 'expect.js';
import sinon from 'sinon';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import Orders from '../../src/components/orders';
import OrdersTable from '../../src/components/orders/orders-table';
import { setupFakeDOM } from '../test-helper';

setupFakeDOM();

describe('components/orders', () => {
  let
    subject;

  beforeEach(() => {
    subject = TestUtils.renderIntoDocument(<Orders />);
  });

  describe('#render', () => {

    describe('when selectedStatus is "all"', () => {
      beforeEach(() => {
        subject.setState({ 'selectedStatus': 'all' });
      });

      it('render all orders', () => {
        const
          table = TestUtils.findRenderedComponentWithType(subject, OrdersTable),
          statuses = table.props.orders.map(o => o.orderStatus);

          expect(statuses).to.eql([ 'open', 'open', 'open', 'shipped' ]);
      });
    });

    describe('when selectedStatus is "open"', () => {
      beforeEach(() => {
        subject.setState({ 'selectedStatus': 'open' });
      });

      it('render open orders', () => {
        const
          table = TestUtils.findRenderedComponentWithType(subject, OrdersTable),
          statuses = table.props.orders.map(o => o.orderStatus);

          expect(statuses).to.eql([ 'open', 'open', 'open' ]);
      });
    });

    describe('when selectedStatus is "shipped"', () => {
      beforeEach(() => {
        subject.setState({ 'selectedStatus': 'shipped' });
      });

      it('render shipped orders', () => {
        const
          table = TestUtils.findRenderedComponentWithType(subject, OrdersTable),
          statuses = table.props.orders.map(o => o.orderStatus);

          expect(statuses).to.eql([ 'shipped' ]);
      });
    });

  });

  describe('#handleStatusClick', () => {
    it('calls setState with the new selectedStatus', () => {
      sinon.spy(subject, 'setState');

      subject.handleStatusClick('foo');

      expect(subject.setState.calledWith({ 'selectedStatus': 'foo' })).to.be(true);
    });
  });
});
