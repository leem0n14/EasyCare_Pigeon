// 导入 express body-parser cors
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const expressWs = require("express-ws");
const houseId = require("./app/middle/houseIdMiddleWare");
const schedule = require("node-schedule");
const backupDatabase = require("./app/utils/backupDatabase");
require("dotenv").config();
// 2024年5月11日
const jwt = require("./app/config/jwt");
const expressJWT = require("express-jwt");
// 创建服务器的实例对象
const app = express();

// WebSocket
// expressWs(app)

// 配置跨域
var corsOptions = {
  origin: "*",
};

//swagger imports
//这里填你的swagger文件所在路径
const swaggerInit = require("./app/swagger/swagger");
swaggerInit(app);

app.use(cors(corsOptions));

// content-type：application/json
// app.use(express.json())
app.use(bodyParser.json());

// 配置解析表达那数据的中间件，注意：这个中间件，解析 application/x-www-form-urlencoded 格式的表单数据
// content-type：application/x-www-form-urlencoded
// app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.urlencoded({ extended: true }));

// 使用日志中间件
app.use(morgan("dev"));

// 使用鸽舍号映射中间件
app.use(houseId.houseIdMiddleWare);
// 2024年5月11日
// 使用 .unless({path: [/^\/user\/register\//], 指定接口不需要进行Token身份认证
// app.use(
//   expressJWT({ secret: jwt.jwtSecretKey }).unless({
//     path: [/^\/app\//, /^\/sys\//, /^\/bi\//],
//   })
// );

// 只有当请求的路径是 /app/abnormal/save 时，才使用 expressJWT 中间件
app.post(
  "/app/abnormal/save",
  expressJWT({ secret: jwt.jwtSecretKey }),
  (req, res, next) => {
    next();
  }
);

// 导入并使用路由模块
/* const clientRouter = require("./app/router/client")
app.use("/app", clientRouter) */
const serverRouter = require("./app/router/server");
app.use("/sys", serverRouter);
const biServerRouter = require("./app/router/biServer");
app.use("/bi", biServerRouter);
const clientRouter = require("./app/router/client");
app.use("/app", houseId.houseIdMiddleWare, clientRouter);

//数据库备份
// 每天凌晨23:59执行
schedule.scheduleJob("59 23 * * *", function () {
  console.log("开始执行数据库备份任务...");
  backupDatabase()
    .then(() => {
      console.log("数据库备份任务完成。");
    })
    .catch((error) => {
      console.error("数据库备份任务失败：", error);
    });
});

// 设置监听端口
// 调用 app.listen 方法，指定端口号并启动web服务器
// const PORT = process.env.PORT || 8080;
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`服务器运行端口： ${PORT}.`);
});

// .sync()的作用很简单--它将所有定义的模型同步到数据库中去:
const db = require("./app/models");
const { where } = require("sequelize");
// 数据库有相应表时无需调用;
// db.sequelize.sync();

// 2024年5月12日
const House = db.house;
db.house.sync({ alter: true });
// async function updateSiteId() {
//   try {
//     await House.update({ site_id: 1 }, { where: { site_id: 0 } });
//     console.log(1);
//   } catch (error) {
//     console.error("Error updating site_id:", error);
//   }
// }
// updateSiteId();
