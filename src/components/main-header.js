import React from 'react';
import MainNav from './main-nav';

class MainHeader extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    return false;
  }

  render() {
    return <div className='main-header'>
      <div className='logo'>Storekeeper</div>
      <MainNav />
    </div>;
  }
}

export default MainHeader;
