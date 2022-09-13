const express = require('express');
const methodOverride = require('method-override');
const cors = require('cors');
const app = express();
const router = require('./routes/index');

//maybe remove the process.env.PORT
app.set('port', process.env.PORT || 3001);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(
  cors({
    origin: '*',
  })
);

app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.use('/', router);

app.listen(app.get('port'), () => {
  console.log(`Server running at http://localhost:${app.get('port')}`);
});
