import alt from '../alt';
import SalesStatsFetcher from '../utils/sales-stats-fetcher';

class DashboardActions {
  updateSalesStats(stats) {
    this.dispatch(stats);
  }

  fetchSalesStats() {
    this.dispatch([]);

    SalesStatsFetcher.fetch()
      .then(this.actions.updateSalesStats.bind(this));
  }
}

export default alt.createActions(DashboardActions);
