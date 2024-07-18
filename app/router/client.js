const express = require("express");
// 创建路由对象
const router = express.Router();

// 导入用户路由处理函数模块
const serviceHandler = require("../controllers/clientService");
const severHandler = require("../controllers/serverService");

// 动态获取cage表的状态
router.get("/cage/sta tu", serviceHandler.getCageStatu);
// 动态获取cage表的状态
// router.get("/cage/oneStatu", serviceHandler.getOneCageStatu)
// 返回cage的喂养乳鸽数
router.get("/cage/number", serviceHandler.getCageNumber);

// 删除查蛋页面预抽蛋错误的信息
router.post("/egg/delEgg", serviceHandler.delEgg);
// 记录产蛋和预抽蛋的时间
// router.post("/egg/save", serviceHandler.addEgg)
// 给予生产提示，显示没有抽过蛋的预抽蛋信息（查蛋记录的鸽舍和笼号）
// router.get("/egg/houseIdAndCageId", serviceHandler.houseIdAndCageId)
// 抽蛋页面的最近几次次产蛋时间、异常时间、死亡数（上次产蛋时间和进行操作时的产蛋时间）
router.get("/egg/current", serviceHandler.eggTimes);

// 记录抽蛋时选择的状态和时间
router.post("/whipping/save", serviceHandler.addWhipping);
//抽蛋和留窝总数
router.get(
  "/eggAndWhipping/eggAndWhippingSum",
  serviceHandler.getEggAndWhipping
);
//当天异常数量
router.get("/abnormal/typeProportion", serviceHandler.getTypeProportion);

// 记录放仔数量和状态以及时间
router.post("/put/save", serviceHandler.putEgg);
// 修改带仔数量和状态以及时间
router.put("/cub/save", serviceHandler.cubEgg);

// 给予放仔的提示，根据当前鸽舍显示可以处理的下一个鸽舍
router.get("/stay/nextHouseId", serviceHandler.nextHouseId);
// 双击留窝
router.post("/stay/save", serviceHandler.addStay);
// 删除查蛋页面留窝错误的信息
router.post("/stay/delstay", serviceHandler.delStay);

// 记录异常信息和日期
router.post("/abnormal/save", serviceHandler.addAbnormal);
// 返回鸽笼异常状态
router.get("/abnormal/info", serviceHandler.abnormalInfo);
// 修改异常表的statu状态
router.put("/abnormal/statu", serviceHandler.updateAbnorStatu);
// 记录死亡异常信息
router.post("/death/save", serviceHandler.addDeath);
//记录淘汰异常信息
router.post("/out/save", serviceHandler.addOut);

//记录长时间不产蛋预警信息
router.post("/warnEgg/save", serviceHandler.addWarnEgg);
//获取长时间不产蛋预警列表
router.get("/warnEgg/list", serviceHandler.getWarnEggList);
//删除长时间不产蛋预警信息
router.get("/warnEgg/delete", serviceHandler.delWarnEgg);

//登录
router.get("/user/login", serviceHandler.login);

//当天产蛋数量
router.get("/egg/eggCount", serviceHandler.getEggCount);
//当天放仔数量
router.get("/put/putCount", serviceHandler.getPutCount);

//NFC对单个鸽笼查看
router.get("/cage/nfcSelect", serviceHandler.nfcGetEggList);
// //对单个鸽笼查看
// router.get("/egg/historyList", serviceHandler.getEggList);
//对单个鸽笼查看--->改为按日期、按操作记录查看六个鸽笼历史记录  2024年5月11日
router.get("/egg/historyList", serviceHandler.getEggList);

//对单个鸽笼的操作记录的删除
router.post("/egg/deleteHistory", serviceHandler.deleteEggList);
//对单个鸽笼的操作记录的修改
router.put("/egg/updateHistory", serviceHandler.updateEggList);

//撤销抽蛋或留窝操作
router.post("/egg/delete", serviceHandler.deleteEgg);

//放仔名单
router.get("/put/list", serviceHandler.putList);
//目前鸽笼状态（显示状态和异常）
router.get("/cage/statuAndAbnormal", serviceHandler.getStatuAndAbnormal);

//各鸽舍里所有鸽笼的数据
router.get("/cage/cageDetail", serviceHandler.getCageDetail);

//新增用户/新增账号/开仓号
router.post("/user/save", serviceHandler.addUser);
//修改用户信息
router.put("/user/update", serviceHandler.updateUser);

// 修改卡号 2024年5月11日 hb
router.post("/houseId/update", serviceHandler.updateCard);

// 新增鸽舍
router.post("/houseId/save", serviceHandler.addHouse);
// 删除鸽舍

//带仔数量
// router.get("/cage/")
// 将路由对象共享出去
module.exports = router;
