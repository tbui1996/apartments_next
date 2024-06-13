const express = require('express');
const next = require('next');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Swagger setup
  const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'Next.js Express API with Swagger',
        version: '1.0.0',
        description: 'API documentation',
      },
      servers: [
        {
          url: 'http://localhost:3000',
        },
      ],
    },
    apis: ['./server.js'], // Files containing annotations as above
  };

  const swaggerDocs = swaggerJsdoc(swaggerOptions);
  server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

  // Express routes
  server.get('/api/hello', (req, res) => {
    res.json({ message: 'Hello World' });
  });

  // Next.js request handler
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Ready on http://localhost:3000');
  });
}).catch((err) => {
  console.error(err.stack);
  process.exit(1);
});
