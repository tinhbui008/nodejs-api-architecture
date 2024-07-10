require('dotenv').config()
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet'); 
var compression = require('compression')
const { countCounnect, checkOverload } = require('./helpers/check.connect');
const bodyParser = require('body-parser');


const app = express();

//mniddlewares
// app.use(morgan('dev'));
// app.use(morgan('combined'));
// app.use(morgan('common'));
// app.use(morgan('dev'));
// app.use(morgan('short'));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//db
require('./dbs/mongodb.proc')
// checkOverload()

//routes
// app.get('/', (req, res, next) => {
//     const strCompress = 'HELLO'

//     return res.status(200).json({
//         message: 'HELLO WORLD :)))',
//         // metadata: strCompress.repeat(1000000)
//     });
// });

// app.get('/home', (req, res, next) => {
//     return res.status(200).json({
//         message: 'HOME :)))'
//     });
// });


//handle error

app.use('/', require('./routes/index'))

module.exports = app;