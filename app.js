const fs = require('fs');
const express = require('express');
const { get } = require('http');
const app = express();

const tours = fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`, 'utf-8');
const toursData = JSON.parse(tours);
app.use(express.json());

const deleteTour = (req, res) => {
  const id = req.params.id * 1;
  const tourIndex = toursData.findIndex(el => el.id === id);
      res.status(204).json({
        status: 'success',
        data: null
      });
};

const getAllTours = (req, res) => {
  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: {
      tours: toursData
    }
  });
};


const getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  const tour = toursData.find(el => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID'
    });
  }


  res.status(200).json({
    status: 'success',
    results: toursData.length,
    data: {
      tour
    }
  });
}

const createTour = (req, res) => {
  // console.log(req.body);
  const newId = toursData[toursData.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);
  toursData.push(newTour);
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(toursData),
    err => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour
        }
      });
    });
};

// app.get('/api/v1/tours', getAllTours);
// app.get('/api/v1/tours/:id', getTour);
// app.post('/api/v1/tours',createTour);
// app.delete('/api/v1/tours/:id', deleteTour);

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour);

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .delete(deleteTour);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

