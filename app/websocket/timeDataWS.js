// const express = require("express");
// // 获取express-websocket
// const expressWs = require("express-ws");
// const moment = require("moment-timezone")
// const db = require("../models")
// const Op = db.Sequelize.Op
// const Egg = db.egg
// const Cub = db.cub
// const Put = db.put
// //web服务端
// const biServerServiceHandler = require("../controllers/biService")
// // 创建路由对象
// const router = express.Router();
// expressWs(router);

// let wsClient = null;
// let connections = [];

// var siteId = null;

// const initWebSocket = (router, biServerServiceHandler) => {
//     router.ws('/time/data', (ws, req) => {
//         console.log('WebSocket connected');

//         wsClient = ws;
//         connections.push(ws);

//         ws.on('message', async message => {
//             try {
//                 const { site_id } = JSON.parse(message);
//                 siteId = site_id;
//                 // 解析收到的消息，提取site_id
//                 const data = await getLatestData(1); // 调用getLatestData函数获取最新数据
//                 if (Object.keys(data).length > 0) { // 判断data不为空
//                     connections.forEach(conn => conn.send(JSON.stringify(data))); // 将更新的数据发送给所有WebSocket连接的客户端
//                 }
//             } catch (error) {
//                 console.error('获取数据失败:', error); // 打印错误信息到控制台，以便调试和排查问题
//             }
//         });

//         ws.on('close', () => {
//             console.log('WebSocket disconnected');
//             wsClient = null;
//             connections = connections.filter(conn => conn !== ws);
//         });
//     });

//     const sendLatestData = async (siteId) => { // 将使用的message变量改为site_id参数
//         try {
//             if (wsClient !== null) {
//                 const data = await getLatestData(1); // 调用getLatestData函数获取最新数据
//                 if (Object.keys(data).length > 0) { // 判断data不为空
//                     connections.forEach(conn => conn.send(JSON.stringify(data))); // 将更新的数据发送给所有WebSocket连接的客户端
//                 }
//             }
//         } catch (error) {
//             console.error(error);
//             // 处理错误，例如发送错误响应给客户端
//         }
//     };

//     setInterval(() => sendLatestData('1'), 3000); // 每隔2秒调用sendLatestData函数，传入站点ID
// };

// const getLatestData = async (site_id) => {
//     const now = moment.tz('Asia/Shanghai').toDate();
//     now.setHours(now.getHours() + 8); //获取当前时间，同时解决时区问题
//     const data = {};

//     // 获取最新的鸡蛋数据
//     const latestEggs = await Egg.findOne({
//         where: {
//             site_id,
//             egg_time: { [Op.gte]: now }
//         },
//         order: [['egg_time', 'ASC']]
//     });
//     if (latestEggs) {
//         data.latestEggs = latestEggs;
//     }

//     // 获取最新的放置数据
//     const latestPuts = await Put.findOne({
//         where: {
//             site_id,
//             put_time: { [Op.gte]: now }
//         },
//         order: [['put_time', 'ASC']]
//     });
//     if (latestPuts) {
//         data.latestPuts = latestPuts;
//     }

//     // 获取最新的幼崽数据
//     const latestCubs = await Cub.findOne({
//         where: {
//             site_id,
//             cub_time: { [Op.gte]: now }
//         },
//         order: [['cub_time', 'ASC']]
//     });
//     if (latestCubs) {
//         data.latestCubs = latestCubs;
//     }

//     return data;
// };

// module.exports = {
//     initWebSocket,
// };


// const express = require("express")
// // 获取express-websocket
// const expressWs = require("express-ws")
// //web服务端
// const biServerServiceHandler = require("../controllers/biService")
// // 创建路由对象
// const router = express.Router()
// expressWs(router)


// let wsClient = null;
// const initWebSocket = (router, biServerServiceHandler) => {
//     router.ws('/time/data', (ws, req) => {
//         console.log('WebSocket connected');

//         wsClient = ws;
//         ws.on('message', async message => {
//             try {
//                 const latestData = await biServerServiceHandler.getTimeData();
//                 ws.send(JSON.stringify(latestData));
//             } catch (error) {
//                 console.error(error);
//                 // 处理错误，例如发送错误响应给客户端
//             }
//         });

//         ws.on('close', () => {
//             console.log('WebSocket disconnected');
//             wsClient = null;
//         });
//     });

//     const sendLatestData = async () => {
//         try {
//             if (wsClient !== null) {
//                 const latestData = await biServerServiceHandler.getTimeData();
//                 wsClient.send(JSON.stringify(latestData));
//             }
//         } catch (error) {
//             console.error(error);
//             // 处理错误，例如发送错误响应给客户端
//         }
//     };

//     setInterval(sendLatestData, 3000);
// };

// module.exports = {
//     initWebSocket,
// };