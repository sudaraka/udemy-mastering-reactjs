import express from 'express';
import fs from 'fs';

const
  app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/orders', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/dashboard', (req, res) => {
  res.sendFile(`${__dirname}/public/index.html`);
});

app.get('/orders.json', (req, res) => {
  res.sendFile(`${__dirname}/data/orders.json`);
});


const
  server = app.listen(5000, () => {
    const
      host = server.address().address,
      port = server.address().port;

    console.log(`Storekeeper app listening at http://${host}:${port}/`);
  });
