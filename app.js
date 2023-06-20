const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('running');
  });

// Mengimpor file route
const productRoutes = require('./routes/productRoutes');

// Menggunakan route
app.use('/products', productRoutes);

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
