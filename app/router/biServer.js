const express = require("express")
// 获取express-websocket
const expressWs = require("express-ws")
// 创建路由对象
const router = express.Router()
expressWs(router)
//web服务端
const biServerServiceHandler = require("../controllers/biService")
//websocket实体
const websocket = require("../websocket/timeDataWS");

//今日产蛋,抽蛋,留窝,放仔的鸽笼数量
router.get("/today/count", biServerServiceHandler.getTodayCount)

//整体趋势
//产蛋趋势
router.get("/egg/eggTrend", biServerServiceHandler.getEggTrend)
//抽蛋趋势
router.get("/whipping/whippingTrend", biServerServiceHandler.getWhippingTrend)
//放仔趋势
router.get("/put/putTrend", biServerServiceHandler.getPutTrend)
//调仔趋势
// router.get("/cub/cubTrend", biServerServiceHandler.getCubTrend)
//留窝趋势
router.get("/stay/stayTrend", biServerServiceHandler.getStayTrend)


//实时
//实时关键数值
router.get("/time/data", biServerServiceHandler.getTimeData)
// websocket.initWebSocket(router, biServerServiceHandler)


//实时趋势
//抽蛋趋势
router.get("/time/whippingTrend", biServerServiceHandler.getTimeWhippingTrend)
//留窝趋势
router.get("/time/stayTrend", biServerServiceHandler.getTimeStayTrend)
//放仔趋势
router.get("/time/putTrend", biServerServiceHandler.getTimePutTrend)
//调仔趋势
router.get("/time/cubTrend", biServerServiceHandler.getTimeCubTrend)

// //抽蛋趋势
// router.get("/time/cubTrend", biServerServiceHandler.getTimeCubTrend)

router.get("/test", biServerServiceHandler.test)

// 将路由对象共享出去
module.exports = router