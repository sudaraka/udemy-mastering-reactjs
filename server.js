import express from 'express';
import fs from 'fs';
import { match, RouterContext } from 'react-router';
import routes from './src/routes';
import { renderToString } from 'react-dom/server';
import React from 'react';
import Iso from 'iso';
import alt from './src/alt';

const
  app = express();

app.use(express.static('public'));

// Data endpoints
app.get('/orders.json', (req, res) => {
  setTimeout(() => {
  res.sendFile(`${__dirname}/data/orders.json`);
  }, 2000);
});

app.get('/sales-stats.json', (req, res) => {
  res.sendFile(`${__dirname}/data/sales-stats.json`);
});

app.get('/orders', (req, res, next) => {
  const
    orders = JSON.parse(fs.readFileSync(`${__dirname}/data/orders.json`));

  res.locals.data = {
    'OrderStore': {
      'orders': orders,
      'selectedState': 'all',
      'amountFilter': null
    }
  };

  next();
});

// Render UI
app.use((req, res, next) => {
  const
    iso = new Iso();

  alt.bootstrap(JSON.stringify(res.locals.data || {}));

  match({ 'routes': routes, 'location': req.url }, (err, location, props) => {
    const
      content = renderToString(<RouterContext { ...props } />);

    iso.add(content, alt.flush());

    res.render('index.ejs', { 'html': iso.render() });
  });
});

const
  server = app.listen(5000, () => {
    const
      host = server.address().address,
      port = server.address().port;

    console.log(`Storekeeper app listening at http://${host}:${port}/`);
  });
