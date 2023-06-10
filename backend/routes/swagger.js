const swaggerJsdoc = require('swagger-jsdoc');
const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Exercise REST API Docs",
        version:'1.0.0',
        description:
          "This is an API endpoint built with Express.js. It's main purpose is to showcase an understanding of creating RESTful APIs",
      },
      servers: [
        { url: process.env.baseurl, description: "Development server" },
      ],
    },
    apis: ["./*.js"],
  };
  
  const swaggerSpec = swaggerJsdoc(options);

// router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
router.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = router;