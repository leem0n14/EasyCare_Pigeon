const express = require("express");
// 获取express-websocket
const expressWs = require("express-ws");
// 创建路由对象
const router = express.Router();
expressWs(router);
//web服务端
const serverServiceHandler = require("../controllers/serverService");
const serviceHandler = require("../controllers/clientService");
// const weatherHandler = require("../controllers/weather")

// 处理 WebSocket 连接
// 然而，在这段代码中，你没有等待异步操作完成，就直接返回结果。
// 为了解决这个问题，你需要将 getcubNumberSum 函数改为异步函数，并且在异步操作完成后返回结果。以下是修改后的代码示例：
// router.ws('/cage/cubNumberSum', (ws, req) => {
//   console.log('WebSocket connected')

//   // 监听 WebSocket 消息事件，处理客户端发来的请求
//   ws.on('message', async message => {
//     try {
//       const result = await serverServiceHandler.getcubNumberSum();
//       const response = {
//         type: 'cubNumberSum',
//         data: result
//       };
//       ws.send(JSON.stringify(response));
//     } catch (error) {
//       console.error(error);
//       // 处理错误，例如发送错误响应给客户端
//     }
//   })

//   // 监听关闭事件
//   ws.on('close', () => {
//     console.log('WebSocket disconnected')
//   })

// })

//新增鸽笼场地
router.post("/cage/save", serverServiceHandler.addCage);
//鸽笼场地列表
router.get("/cage/list", serverServiceHandler.getCageList);
//具体鸽笼场地
router.get("/cage/info/:id", serverServiceHandler.getCageInfoById);
//修改鸽笼场地
router.put("/cage/update", serverServiceHandler.updateCage);
//删除鸽笼场地
router.delete("/cage/delete/:id", serverServiceHandler.deleteCageById);

//所有蛋列表获取
router.get("/eggList/list", serverServiceHandler.getEggList);
//所有放仔列表获取
router.get("/stayList/list", serverServiceHandler.getStayList);

//当天鸽笼异常列表获取
router.get("/abnormalList/list", serverServiceHandler.getTodayAbnormalList);

//鸽舍异常情况列表
router.get("/abnormal/list", serverServiceHandler.getAbnormalList);
//鸽舍异常情况各类型列表
router.get("/abnormal/type", serverServiceHandler.getAbnormalNum);
//具体鸽舍异常情况
router.get("/abnormal/info", serverServiceHandler.getAbnormalInfo);
//修改鸽舍异常情况
router.put("/abnormal/update", serverServiceHandler.updateAbnormal);
//删除鸽舍异常情况
router.delete("/abnormal/delete/:id", serverServiceHandler.deleteAbnormalById);

//鸽舍死亡列表
router.get("/death/list", serverServiceHandler.getDeathList);
//具体鸽舍死亡情况
router.get("/death/info/:id", serverServiceHandler.getDeathInfo);

//鸽舍数据统计列表
router.get("/count/list", serverServiceHandler.getCountList);
//具体鸽舍数据统计
router.get("/count/info/:id", serverServiceHandler.getCountInfo);

//鸽笼总数
router.get("/cage/cageSum", serverServiceHandler.getcageSum);
//种鸽总数
router.get("/cage/numberSum", serverServiceHandler.getnumberSum);
//雏鸽总数
router.get("/cage/cubNumberSum", serverServiceHandler.getcubNumberSum);

//死亡总数
router.get("/count/deathSum", serverServiceHandler.getDeathSum);
//抽蛋和留窝总数
router.get(
  "/eggAndWhipping/eggAndWhippingSum",
  serverServiceHandler.getEggAndWhipping
);

//异常种类分布比例
router.get("/abnormal/typeProportion", serverServiceHandler.getTypeProportion);
//鸽笼状态分布比例
router.get("/cage/statuProportion", serverServiceHandler.getStatuProportion);
//各鸽舍种鸽和雏鸽总数
router.get(
  "/cage/numberAndCubNumberSum",
  serverServiceHandler.getNumberAndCubNumberSum
);

//各鸽舍里所有鸽笼的数据
router.get("/cage/cageDetail", serverServiceHandler.getCageDetail);

//每个鸽笼所经历的状态
router.get("/cage/cageStatus", serverServiceHandler.getCageStatus);
//修改鸽笼的状态
router.put("/cage/updateCageStatus", serverServiceHandler.updateCageStatus);
//增加鸽笼状态
router.post("/cage/addCageStatus", serverServiceHandler.addCageStatus);
//删除鸽笼状态
router.post("/cage/deleteCageStatus", serverServiceHandler.deleteCageStatus);

//后台趋势
//产蛋趋势
router.get("/egg/eggTrend", serverServiceHandler.getEggTrend);
//抽蛋趋势
router.get("/whipping/whippingTrend", serverServiceHandler.getWhippingTrend);
//放仔趋势
router.get("/put/putTrend", serverServiceHandler.getPutTrend);
//调仔趋势
router.get("/cub/cubTrend", serverServiceHandler.getCubTrend);
//留窝趋势
router.get("/stay/stayTrend", serverServiceHandler.getStayTrend);

// //周期
// router.get("/mature/period", serverServiceHandler.getBreedPeriod)

//抽蛋留窝决策
router.get("/egg/decision", serverServiceHandler.getDecision);

//雏鸽死亡和出栏总数列表
router.get("/sum/sumList", serverServiceHandler.getSumList);
//总数记录添加数据
router.post("/sum/addSum", serverServiceHandler.addSum);
//修改数据总量
router.put("/sum/updateSum", serverServiceHandler.updateSum);
//删除数据总量
router.post("/sum/deleteSum", serverServiceHandler.deleteSum);

//产蛋周期
router.get("/egg/period", serverServiceHandler.getEggPeriod);
//长时间不产蛋预警
router.get("/egg/eggWarn", serverServiceHandler.getEggWarn);

//数据备份
router.get("/database/backup", serverServiceHandler.backupDatabase);

//登录界面，生成token
router.post("/user/login", serverServiceHandler.login);
//解析token
router.post("/user/verifyToken", serverServiceHandler.verifyToken);

//新增账号
router.post("/user/save", serverServiceHandler.addUser);
//修改账号用户信息  24/4/7
router.put("/user/update", serverServiceHandler.updateUser);
//删除账号 24/4/8
router.delete("/user/delete", serverServiceHandler.deleteUser);
//获取所有账号信息 24/4/7
router.get("/user/info", serverServiceHandler.userInfo);

//对所有操作数据查看    2024年5月8日
router.get("/egg/LogList", serverServiceHandler.getLogList);

// 修改卡号 2024年5月11日 hb
router.post("/houseId/update", serviceHandler.updateCard);

// 将路由对象共享出去
module.exports = router;
