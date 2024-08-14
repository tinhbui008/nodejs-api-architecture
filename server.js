const app = require('./src/app');
const {app: {port}} = require('./src/configs/config.mongodb')

// const PORT = process.env.PORT || 3000;

const server = app.listen(port, () => {
    console.log(`server listening on port ${port}`);
}); 

// process.on('SIGINT', () => {
//     server.close(() => {
//         console.log('server close!!!');
//     });
// });