// swagger在线网站：https://editor.swagger.io/#
const path = require("path");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerJSDoc = require("swagger-jsdoc");

const swaggerInit = (app, baseUrl) => {
  //options是swaggerJSDoc的配置项
  const options = {
    swagger: "2.0",
    //definition是swagger的配置项
    definition: {
      info: {
        title: "Node Swagger API",
        version: "1.0.0",
        description: "Swagger 接口文档",
      },
    },
    // 重点，指定 swagger-jsdoc 去哪个路由下收集 swagger 注释
    // apis: [path.join(process.cwd(), '/routes/*.js')],
    // apis: [path.join(process.cwd(), '../router/*.js')],
    // apis: ['../router/*.js']
    apis: [path.join(__dirname, "../controllers/*.js")],
  };
  const swaggerSpec = swaggerJSDoc(options);

  // 可以访问 xxx/swagger.json 看到生成的swaggerJSDoc
  app.get("/swagger.json", function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  // 可以访问 xxx/api-docs 看到生成的swagger接口文档
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};

module.exports = swaggerInit;
