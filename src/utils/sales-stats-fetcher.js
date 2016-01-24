import Immutable from 'immutable';

const SalesStatsFetcher = {
  fetch() {
    return fetch('/sales-stats.json')
      .then(res => res.json())
      .then(json => json.map(parseFloat))
      .then(salesStats => Immutable.fromJS(salesStats));
  }
}

export default SalesStatsFetcher;
