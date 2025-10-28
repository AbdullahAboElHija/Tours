const fs = require('fs');
const express = require('express');
const app = express();

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours.json`, 'utf-8');
const toursData = JSON.parse(tours);


app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    data : {
      tours: toursData
    }
  });

});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

