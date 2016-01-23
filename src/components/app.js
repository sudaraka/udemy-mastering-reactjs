import React from 'react';
import MainHeader from './main-header';
import Page from './page';
import Orders from './orders';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { 'i': 0 };
  }

  componentDidMount() {
    this.increment();
  }

  componentDidUpdate() {
    setTimeout(this.increment.bind(this), 200);
  }

  increment() {
    // this.setState({ 'i': this.state.i++ });
  }

  render() {
    return <div className='app'>
      <MainHeader />
      <Page>
        {this.props.children}
      </Page>
    </div>;
  }
}

export default App;
