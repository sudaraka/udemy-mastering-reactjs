import React from 'react';
import { Link } from 'react-router';

class MainNav extends React.Component {
  render() {
    return <nav className='main-nav'>
      <Link to='/dashboard' activeClassName='active'>Dashboard</Link>
      <Link to='/orders' activeClassName='active'>Orders</Link>
      <Link to='/catalog' activeClassName='active'>Catalog</Link>
    </nav>;
  }
}

export default MainNav;
