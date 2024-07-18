const dbConfig = require("../config/db.config.js");
require("dotenv").config();
// 导入模块
const Sequelize = require("sequelize");
// 配置数据库连接
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,
    logging: console.log, // 配置日志输出函数

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

// 封装数据库连接和sequelize
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// db.todos = require("./todo.model.js")(sequelize, Sequelize)
db.cage = require("./cage.js")(sequelize, Sequelize);
db.abnormal = require("./abnormal.js")(sequelize, Sequelize);
db.cub = require("./cub.js")(sequelize, Sequelize);
db.death = require("./death.js")(sequelize, Sequelize);
db.egg = require("./egg.js")(sequelize, Sequelize);
db.count = require("./count.js")(sequelize, Sequelize);
db.put = require("./put.js")(sequelize, Sequelize);
db.whipping = require("./whipping.js")(sequelize, Sequelize);
db.stay = require("./stay.js")(sequelize, Sequelize);
db.user = require("./user.js")(sequelize, Sequelize);
db.warnEgg = require("./warnEgg.js")(sequelize, Sequelize);
db.house = require("./house.js")(sequelize, Sequelize);
db.log = require("./log.js")(sequelize, Sequelize);
db.out = require("./out.js")(sequelize, Sequelize);

// 将连接后的数据库共享出去
module.exports = db;
