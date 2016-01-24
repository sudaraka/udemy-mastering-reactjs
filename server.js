import express from 'express';
import fs from 'fs';
import { match, RouterContext } from 'react-router';
import routes from './src/routes';
import { renderToString } from 'react-dom/server';
import React from 'react';

const
  app = express();

app.use(express.static('public'));

// Data endpoints
app.get('/orders.json', (req, res) => {
  res.sendFile(`${__dirname}/data/orders.json`);
});

app.get('/sales-stats.json', (req, res) => {
  res.sendFile(`${__dirname}/data/sales-stats.json`);
});

// Render UI
app.use((req, res, next) => {
  match({ 'routes': routes, 'location': req.url }, (err, location, props) => {
    const
      content = renderToString(<RouterContext { ...props } />);

    res.render('index.ejs', { 'html': content });
  });
});

const
  server = app.listen(5000, () => {
    const
      host = server.address().address,
      port = server.address().port;

    console.log(`Storekeeper app listening at http://${host}:${port}/`);
  });
