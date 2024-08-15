const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Threelab API Documentation',
      version: '1.0.0',
      description: 'API documentation for Threelab',
    },
  },
  apis: ['./routes/*.js'],
};
const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;