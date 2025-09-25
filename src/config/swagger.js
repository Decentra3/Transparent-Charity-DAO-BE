import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger options
const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Web3 Project API",
      version: "1.0.0",
      description: "API documentation for Web3 Project",
    },
    servers: [
      {
        url: "http://localhost:4000/api", // base url API
      },
    ],
  },
  apis: ["./src/routes/*.js"], // đường dẫn đến file routes
};

const specs = swaggerJSDoc(options);

export const swaggerDocs = (app) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(specs));
  console.log("Swagger docs available at http://localhost:4000/api/docs");
};
