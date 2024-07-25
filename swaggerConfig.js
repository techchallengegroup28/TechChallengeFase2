const swaggerJSDoc = require("swagger-jsdoc");

// Configuração do Swagger para a criação automatica da documentação da API
const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Documentação da API do Blog",
      description: "Esta documentação cobre as APIs do projeto de posts do blog, detalhando como criar, ler, atualizar, deletar e buscar posts.",
      version: '1.0.0'
    },
    servers: [
      {
        url: 'http://localhost:3000/api/'
      }
    ]
  },
  apis: ["./routes/*.js"]
}

const specs = swaggerJSDoc(options);

module.exports = specs;