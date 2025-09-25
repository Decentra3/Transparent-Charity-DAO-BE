import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Web3 DAO API", version: "1.0.0" },
  },
  apis: ["./src/routes/*.js"], // read JSDoc in routes
};

const spec = swaggerJsdoc(options);

export const setupSwagger = (app) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(spec));
};
