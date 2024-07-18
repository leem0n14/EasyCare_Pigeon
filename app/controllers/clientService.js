const db = require("../models");
const Result = require("../utils/response");
const Empty = require("../utils/empty");
const RegionTime = require("../utils/time");
const HouseId = require("../utils/getHouseId");
const moment = require("moment-timezone");
const log = require("../models/log");
const { where } = require("sequelize");
// 2024年5月11日
const Jwt = require("jsonwebtoken");
const jwt = require("../config/jwt");
const House = db.house;
const Egg = db.egg;
const Cage = db.cage;
const Put = db.put;
const Cub = db.cub;
const Abnormal = db.abnormal;
const Death = db.death;
const Count = db.count;
const Whipping = db.whipping;
const Stay = db.stay;
const WarnEgg = db.warnEgg;
const User = db.user;
const Log = db.log;
const Out = db.out;
const sequelize = db.Sequelize;
const Op = db.Sequelize.Op;

/**
 * @swagger
 * /app/egg/delEgg:
 *   post:
 *     tags:
 *        - 查蛋接口
 *     summary: 查蛋功能
 *     description: 删除错误记录的信息
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: DelEgg
 *         description: 删除错误的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DelEgg'
 *     responses:
 *       200:
 *         description: 记录成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   DelEgg:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *       - cageStatus
 *       - eggTime
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       cageStatu:
 *         type: string
 *       id:
 *         type: integer
 */
// 删除查蛋页面错误的操作信息，并修改cage表的状态
exports.delEgg = async (req, res) => {
  //   鸽仓id   鸽舍id   鸽笼id   鸽笼状态
  let { siteId, houseId, cageId, cageStatu, id } = req.body;

  try {
    const now = moment.tz("Asia/Shanghai").toDate();
    now.setHours(now.getHours() + 8);

    let canghao = req.get("Canghao");

    if (canghao == siteId || canghao == 0) {
      //分仓操作
      if (id === 0) {
        return Result.JsonResponse(200, 404, "删除失败", res, "warning"); //未找到对应的cage记录
      }

      // 从数据库获取nfc对用的鸽舍号
      houseId = await HouseId.getHouseId(houseId);

      // 将egg表的错误数据删除
      await Egg.destroy({
        where: {
          id: id,
        },
      }).then(() => {
        console.log(`已成功删除id为${id}的信息`);
      });

      // 修改cage表的状态
      await Cage.findOne({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      }).then((cage) => {
        cage.statu = cageStatu;
        cage.save();
        console.log("已修改cage表状态");
      });

      //操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        log_time: now,
        description: "进行了删除抽蛋操作",
      });

      return Result.JsonResponse(200, 200, "删除成功", res, "success"); //未找到对应的cage记录
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.log("删除操作失败", error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

// /**
//  * @swagger
//  * /app/egg/save:
//  *   post:
//  *     tags:
//  *        - 查蛋接口
//  *     summary: 查蛋功能
//  *     description: 记录产蛋和预抽蛋的时间
//  *     consumes:
//  *       - application/json
//  *     parameters:
//  *       - in: body
//  *         name: Egg
//  *         description: 要记录的信息
//  *         required: true
//  *         schema:
//  *           $ref: '#/definitions/Egg'
//  *     responses:
//  *       200:
//  *         description: 记录成功
//  *       400:
//  *         description: 请求体格式不正确或缺少必要的字段
//  */

/**
 * @swagger
 * definitions:
 *   Egg:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *       - cageStatus
 *       - eggTime
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       cageStatu:
 *         type: string
 *       eggTime:
 *         type: string
 *         format: date-time
 */
// // 记录产蛋和与预抽蛋的时间
// exports.addEgg = async (req, res) => {

//   //      鸽仓id   鸽舍id   鸽笼id   鸽笼状态
//   let { siteId, houseId, cageId, cageStatu, eggTime } = req.body

//   try {
//     // 从数据库获取nfc对用的鸽舍号
//     houseId = await HouseId.getHouseId(houseId)

//     // 解决时区问题
//     eggTime = RegionTime.regionTime(eggTime)

//     let insertId = 0

//     // 将清单保存到数据库
//     await Egg.create({
//       site_id: siteId,
//       house_id: houseId,
//       cage_id: cageId,
//       egg_time: eggTime,
//       statu: 1,
//     })
//       .then((result) => {
//         insertId = result.id
//         console.log("已记录egg表")
//       })

//     // 将清单保存到数据库
//     await Whipping.create({
//       site_id: siteId,
//       house_id: houseId,
//       cage_id: cageId,
//       whipping_time: eggTime
//     })
//       .then((result) => {
//         insertId = result.id
//         console.log("已记录whipping表")
//       })

//     // 修改cage表的信息
//     let cage = await Cage.findOne({
//       where: {
//         site_id: siteId,
//         cage_id: cageId,
//         house_id: houseId
//       }
//     }) // 根据cageId查找记录

//     if (!cage) {
//       // 如果记录不存在，则进行新增
//       await Cage.create({
//         site_id: siteId,
//         house_id: houseId,
//         cage_id: cageId,
//         statu: cageStatu
//       })
//     } else {
//       // 如果记录存在，则进行更新
//       cage.statu = cageStatu // 更新statu字段的值

//       await cage.save() // 保存修改后的记录到数据库
//     }

//     return res.status(200).json({
//       code: 200,
//       msg: "查蛋成功",
//       id: insertId,
//       type: "success"
//     }) //成功查找到cage，则返回statu属性值

//   } catch (error) {
//     console.error(error)
//     return Result.JsonResponse(500, 500, "网络连接错误", res, "error")
//   }

// }

// /**
//  * @swagger
//  * /app/egg/houseIdAndCageId:
//  *  get:
//  *   tags:
//  *     - 查蛋接口
//  *   description: 查蛋功能-提醒可操作的下一个鸽舍-鸽笼
//  *   parameters:
//  *     - name: siteId
//  *       in: query
//  *       description: 鸽仓号
//  *       required: false
//  *     - name: houseId
//  *       in: query
//  *       description: 鸽舍号
//  *       required: false
//  *     - name: oneOrAll
//  *       in: query
//  *       description: 1条或多条
//  *       required: false
//  *   responses:
//  *     '200':
//  *       description: successful operation
//  *     '400':
//  *       description: Invalid name value
// */
// // 返回未处理的预抽蛋名单
// exports.houseIdAndCageId = async (req, res) => {

//   //      鸽仓id   鸽舍id   1条或多条
//   let { siteId, houseId, oneOrAll } = req.query

//   try {
//     // 从数据库获取nfc对用的鸽舍号
//     houseId = await HouseId.getHouseId(houseId)

//     const allValuesExist = Empty.checkAllValues(req.query)

//     if (!allValuesExist) {
//       return Result.JsonResponse(200, 404, "存在参数为空", res, "warning")
//     }

//     let egg = []

//     if (oneOrAll == 0) {// 根据houseId, cageId查找没有被抽蛋的记录

//       egg = await Egg.findOne({
//         where: {
//           site_id: siteId,
//           house_id: {
//             [Op.gt]: houseId  //  Op.gt 操作符指定大于当前 house_id 的值
//           },
//           statu: 0
//         },
//         order: [['house_id', 'ASC']],
//         attributes: ["house_id"], // 指定查询 cageId, houseId 字段
//       }) || []

//       // 如果存在未处理的鸽舍，也将返回，直到全部处理完成
//       if (egg.length === 0) {
//         egg = await Egg.findOne({
//           where: {
//             site_id: siteId,
//             statu: 0
//           },
//           order: [['house_id', 'ASC']],
//           attributes: ["house_id"], // 指定查询 cageId, houseId 字段
//         }) || []
//       }

//     } else if (oneOrAll == 1) {

//       egg = await Egg.findAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           statu: 0
//         },
//         attributes: ["cage_id"], // 指定查询 cageId, houseId 字段
//       })
//     }

//     if (egg.length != 0) {

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         eggs: egg,
//         type: "success"
//       })
//     } else {
//       //未找到对应的cage记录
//       return res.status(200).json({
//         code: 200,
//         msg: "已处理完成预抽蛋名单",
//         eggs: {
//           "house_id": 0
//         },
//         type: "success"
//       })
//     }
//   } catch (error) {

//     console.error(error)
//     //出现错误，返回500状态码
//     Result.JsonResponse(500, 500, "网络连接错误", res, "error")
//   }
// }

/**
 * @swagger
 * /app/egg/current:
 *  get:
 *   tags:
 *     - 查蛋接口
 *   description: 显示最近的几次产蛋时间
 *   parameters:
 *     - name: siteId
 *       in: query
 *       description: 鸽仓号
 *       required: false
 *     - name: houseId
 *       in: query
 *       description: 鸽舍号
 *       required: false
 *     - name: twoOrSix
 *       in: query
 *       description: 两个还是六个
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */
exports.eggTimes = async (req, res) => {
  //      鸽仓id   鸽笼id   鸽舍id
  let { siteId, houseId, twoOrSix } = req.query;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    let eggs = [];

    for (let i = 1; i <= 6; i++) {
      let egg = await Egg.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: i,
        },
        order: [["egg_time", "DESC"]],
        attributes: [
          "cage_id",
          // [sequelize.col('egg_time'), 'time'], // 将 egg_time 字段取别名为 time
          "egg_time",
          "statu",
        ],
        limit: +twoOrSix,
      });

      egg = egg.map((eg) => {
        return {
          cage_id: eg.cage_id, // 复制当前对象的所有属性
          statu: eg.statu, // 复制当前对象的所有属性
          time: eg.egg_time, // 添加新的属性 time，并赋值为 egg_time 的值
        };
        // 如果需要删除原始的 egg_time 属性，可以使用下面这行代码
        // delete egg.egg_time;
      });

      // 现在每个对象中应该有 time 属性代替了原来的 egg_time 属性

      let abnormal = await Abnormal.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: i,
          [Op.and]: [
            { refer: { [Op.notLike]: "%死亡%" } },
            { refer: { [Op.ne]: "淘汰" } },
          ],
        },
        order: [["time", "DESC"]],
        attributes: ["cage_id", "time", "refer"],
        limit: +twoOrSix,
      });

      let death = await Death.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: i,
        },
        order: [["time", "DESC"]],
        attributes: ["cage_id", "time", "young_number", "old_number"],
        limit: +twoOrSix,
      });

      if (egg.length <= 0 && abnormal.length <= 0 && death.length <= 0) {
        egg = {
          cage_id: i,
        };
      }

      eggs = eggs.concat(egg);
      eggs = eggs.concat(abnormal);
      eggs = eggs.concat(death);
    }

    // 对查询的数据进行处理
    const processedEggs = [];
    const cageIds = {};
    let statu = "";
    eggs.forEach((egg) => {
      /* if (egg.statu === 0) {
        statu = "none"
      } else  */
      if (egg.statu === 1) {
        statu = "line-through";
      } else if (egg.statu === 2) {
        statu = "line-bottom";
      } else if (egg.refer === "单蛋") {
        statu = "single";
      } else if (egg.refer === "光蛋") {
        statu = "spermatozonia";
      } else if (egg.refer === "破损") {
        statu = "breakage";
      } else if (egg.refer === "弃仔") {
        statu = "abandon";
      } else if (egg.refer === "弃孵") {
        statu = "discard";
      } else if (egg.old_number > 1) {
        statu = "death_old=2";
      } else if (egg.old_number > 0) {
        statu = "death_old=1";
      } else if (egg.young_number > 3) {
        statu = "death_young=4";
      } else if (egg.young_number > 2) {
        statu = "death_young=3";
      } else if (egg.young_number > 1) {
        statu = "death_young=2";
      } else if (egg.young_number > 0) {
        statu = "death_young=1";
      }

      if (egg.cage_id in cageIds) {
        const index = cageIds[egg.cage_id];

        const date = new Date(egg.time);
        date.setHours(date.getHours() - 8);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        processedEggs[index].time.push({
          egg_time: formattedDate,
          statu: statu || null,
        });
      } else {
        const newEgg = {
          cage_id: egg.cage_id,
          time: [],
        };

        if (egg.time && statu) {
          const date = new Date(egg.time);
          date.setHours(date.getHours() - 8);
          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");
          const hours = String(date.getHours()).padStart(2, "0");
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const seconds = String(date.getSeconds()).padStart(2, "0");

          const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
          newEgg.time.push({
            egg_time: formattedDate,
            statu: statu,
          });
        }

        processedEggs.push(newEgg);
        cageIds[egg.cage_id] = processedEggs.length - 1;
      }
    });

    processedEggs.forEach((egg) => {
      // 首先按时间升序排列
      egg.time.sort((a, b) => new Date(a.egg_time) - new Date(b.egg_time));

      // 然后截取每个数组的最后三个元素（最新的三个数据）
      egg.time = egg.time.slice(-3);
    });

    if (eggs.length > 0) {
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        eggs: processedEggs,
        type: "success",
      }); //成功查找到cage，则返回statu属性值
    } else {
      return Result.JsonResponse(200, 404, "该鸽笼最近未查蛋", res, "warning"); //未找到对应的cage记录
    }
  } catch (error) {
    console.error("数据库异常：", error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/whipping/save:
 *   post:
 *     tags:
 *        - 抽蛋接口
 *     summary: 抽蛋功能
 *     description: 记录抽蛋时选择的状态和时间
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: Whipping
 *         description: 要记录的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Whipping'
 *     responses:
 *       200:
 *         description: 记录成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   Whipping:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *       - cageStatu
 *       - whippingTime
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       cageStatu:
 *         type: string
 *       whippingTime:
 *         type: string
 *         format: date-time
 */
exports.addWhipping = async (req, res) => {
  //      鸽仓id   鸽笼id   鸽舍id   鸽笼状态  抽蛋时间
  let { siteId, cageId, houseId, cageStatu, whippingTime } = req.body;
  console.log(req.body);
  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    // 解决时区问题
    whippingTime = RegionTime.regionTime(whippingTime);
    whippingTime = new Date(whippingTime);

    let canghao = req.get("Canghao");

    console.log(canghao, "Canghao");
    console.log(siteId);
    if (canghao == siteId || canghao == 0) {
      //分仓操作
      let cage = await Cage.findOne({
        where: {
          site_id: siteId,
          cage_id: cageId,
          house_id: houseId,
        },
      }); // 根据siteId, houseId, cageId查找记录
      let egg = await Egg.findOne({
        where: {
          site_id: siteId,
          cage_id: cageId,
          house_id: houseId,
          statu: 0,
        },
        order: [["egg_time", "DESC"]],
      }); // 根据siteId, houseId, cageId查找记录

      //查询是否今天已经抽过蛋了
      let whipping = await Whipping.findOne({
        where: {
          site_id: siteId,
          cage_id: cageId,
          house_id: houseId,
        },
        order: [["whipping_time", "DESC"]],
      }); // 根据siteId, houseId, cageId查找记录

      if (whipping) {
        //存在记录
        //已有数据
        let whippingDate = new Date(whipping.whipping_time);
        //解决时区
        whippingDate.setHours(whippingDate.getHours());

        if (
          whippingDate.getFullYear() === whippingTime.getFullYear() &&
          whippingDate.getMonth() === whippingTime.getMonth() &&
          whippingDate.getDate() === whippingTime.getDate()
        ) {
          //存在记录且今天已经有数据了
          return Result.JsonResponse(
            200,
            200,
            "今天已抽过蛋了",
            res,
            "success"
          );
        } else {
          //存在记录且今天没有数据
          if (!cage) {
            // 如果记录不存在，则进行新增
            cage = await Cage.create({
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
              statu: cageStatu,
            });
          } else if (!egg) {
            await Egg.create({
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
              egg_time: whippingTime,
              statu: 1,
            }); // 保存修改后的记录到数据库
          } else if (egg) {
            // 如果存在egg未处理历史记录
            egg.statu = 1;
            await egg.save();
          }

          // 记录抽蛋的时间
          await Whipping.create({
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            whipping_time: whippingTime,
          })
            //  data是参数
            .then(() => {
              console.log("已记录whipping表1");
            });

          // 如果该状态有记录，则更新
          cage.statu = cageStatu; // 更新statu字段的值

          await cage.save(); // 保存修改后的记录到数据库

          //操作日志
          await Log.create({
            user_id: canghao,
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            log_time: whippingTime,
            description: "进行了抽蛋操作",
          }).then(() => {
            console.log("已记录操作日志");
          });
          return Result.JsonResponse(200, 200, "抽蛋成功", res, "success");
        }
      } else {
        //不存在今天的数据
        if (!cage) {
          // 如果记录不存在，则进行新增
          cage = await Cage.create({
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            statu: cageStatu,
          });
        } else if (!egg) {
          await Egg.create({
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            egg_time: whippingTime,
            statu: 1,
          }); // 保存修改后的记录到数据库
        } else if (egg) {
          // 如果存在egg未处理历史记录
          egg.statu = 1;
          await egg.save();
        }

        // 记录抽蛋的时间
        await Whipping.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          whipping_time: whippingTime,
        })
          //  data是参数
          .then(() => {
            console.log("已记录whipping表");
          });

        // 如果该状态有记录，则更新
        cage.statu = cageStatu; // 更新statu字段的值

        await cage.save(); // 保存修改后的记录到数据库

        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: whippingTime,
          description: "进行了抽蛋操作",
        }).then(() => {
          console.log("已记录操作日志");
        });
        return Result.JsonResponse(200, 200, "抽蛋成功", res, "success");
      }
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/eggAndWhipping/eggAndWhippingSum:
 *   get:
 *     tags:
 *       - 鸽子养殖数据比例接口
 *     summary: 获取当天抽蛋和留窝数据的数量以及较昨天的差值
 *     description: 获取egg表和whipping表中的数据总量
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回抽蛋和留窝数据的数量
 *         schema:
 *           type: object
 *           properties:
 *             whippingCount:
 *               type: integer
 *               description: 当天抽蛋的数量
 *             diffWhippingCount:
 *               type: integer
 *               description: 对比昨天抽蛋差值的数量
 *             stayCount:
 *               type: integer
 *               description: 当天留窝的数量
 *             diffStayCount:
 *               type: integer
 *               description: 对比昨天留窝差值的数量
 *       500:
 *         description: 获取失败
 */
exports.getEggAndWhipping = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(8, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const { site_id } = req.query;
    const yesterdayWhippingCount = await Egg.count({
      where: {
        statu: 1,
        site_id: site_id,
        egg_time: {
          [Op.between]: [yesterday, today],
        },
      },
    });
    const whippingCount = await Egg.count({
      where: {
        statu: 1,
        site_id: site_id,
        egg_time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });

    const yesterdayStayCount = await Egg.count({
      where: {
        statu: 2,
        site_id: site_id,
        egg_time: {
          [Op.between]: [yesterday, today],
        },
      },
    });

    const stayCount = await Egg.count({
      where: {
        statu: 2,
        site_id: site_id,
        egg_time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });

    const diffWhippingCount = whippingCount - yesterdayWhippingCount;
    const diffStayCount = stayCount - yesterdayStayCount;
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      whippingCount: whippingCount,
      diffWhippingCount: diffWhippingCount,
      stayCount: stayCount,
      diffStayCount: diffStayCount,
      type: "success",
    });
  } catch (error) {
    console.log(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/abnormal/typeProportion:
 *   get:
 *     tags:
 *       - 鸽子养殖数据比例接口
 *     summary: 获取当天abnormal表里各异常类型的数量
 *     description: 根据类型名称获取abnormal表中的数据数量
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回各异常类型的数量
 *         schema:
 *           type: object
 *           properties:
 *             光蛋:
 *               type: integer
 *               description: 光蛋的数量
 *             破损:
 *               type: integer
 *               description: 破损的数量
 *             弃仔:
 *               type: integer
 *               description: 弃仔的数量
 *             单蛋:
 *               type: integer
 *               description: 单蛋的数量
 *             弃孵:
 *               type: integer
 *               description: 弃孵的数量
 *             种鸽死亡:
 *               type: integer
 *               description: 种鸽死亡的数量
 *             雏鸽死亡:
 *               type: integer
 *               description: 雏鸽死亡的数量
 *       500:
 *         description: 获取失败
 */
exports.getTypeProportion = async (req, res) => {
  try {
    const { site_id } = req.query;
    const today = new Date();
    today.setHours(8, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const spermatozoniaCount = await Abnormal.count({
      where: {
        refer: {
          [Op.eq]: "光蛋",
        },
        site_id,
        time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });

    const breakageCount = await Abnormal.count({
      where: {
        refer: {
          [Op.eq]: "破损",
        },
        site_id,
        time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });

    const abandonCount = await Abnormal.count({
      where: {
        refer: {
          [Op.eq]: "弃仔",
        },
        site_id,
        time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });

    const singleCount = await Abnormal.count({
      where: {
        refer: {
          // [Op.eq]: '无精'
          [Op.eq]: "单蛋",
        },
        site_id,
        time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });

    const discardCount = await Abnormal.count({
      where: {
        refer: {
          [Op.eq]: "弃孵",
        },
        site_id,
        time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });
    let oldDeathCount = await Death.sum("old_number", {
      where: {
        site_id,
        time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });
    let youngDeathCount = await Death.sum("young_number", {
      where: {
        site_id,
        time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });

    if (!oldDeathCount) {
      oldDeathCount = 0;
    }
    if (!youngDeathCount) {
      youngDeathCount = 0;
    }
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      spermatozoniaCount, //光蛋
      breakageCount, //破损
      abandonCount, //弃仔
      singleCount, //单蛋
      discardCount, //弃孵
      oldDeathCount, //种鸽死亡
      youngDeathCount, //雏鸽死亡
      type: "success",
    });
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};
/**
 * @swagger
 * /app/put/save:
 *   post:
 *     tags:
 *        - 放仔接口
 *     summary: 放仔功能
 *     description: 记录放仔数量和状态以及时间
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: Put
 *         description: 要记录的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Put'
 *     responses:
 *       200:
 *         description: 记录成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   Put:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *       - cageStatu
 *       - putNumber
 *       - putTime
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       cageStatu:
 *         type: string
 *       putNumber:
 *         type: integer
 *       putTime:
 *         type: string
 *         format: date-time
 */

exports.putEgg = async (req, res) => {
  //      鸽仓id   鸽笼id   鸽舍id   放仔数量  鸽笼状态   放仔时间
  let { siteId, cageId, houseId, putNumber, cageStatu, putTime } = req.body;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    // 解决时区问题
    putTime = RegionTime.regionTime(putTime);

    let canghao = req.get("Canghao");
    if (canghao == siteId || canghao == 0) {
      //分仓操作
      // 创建一条清单
      const put = {
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        put_number: putNumber,
        put_time: putTime,
      };

      let stay = await Stay.findAll({
        where: {
          site_id: siteId,
          cage_id: cageId,
          house_id: houseId,
          statu: 0,
        },
      });

      if (putNumber == 0) {
        // 将清单保存到数据库
        await Whipping.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          whipping_time: putTime,
        }).then(() => {
          console.log("已记录whipping表");
        });

        cageStatu = "已抽蛋";
      }

      if (stay.length > 0) {
        // 将清单保存到数据库
        await Put.create(put);

        // console.log(stay)
        // 批量处理已经操作的预放仔名单
        for (let i = 0; i < stay.length; i++) {
          stay[i].statu = 1;
          await stay[i].save();
        }

        console.log("已处理预放仔名单");
      } else {
        // 将清单保存到数据库
        await Put.create(put).then(() => {
          console.log("已记录put表");
        });
      }

      // 修改cage表的信息
      let cage = await Cage.findOne({
        where: {
          site_id: siteId,
          cage_id: cageId,
          house_id: houseId,
        },
      }); // 根据cageId查找记录

      //操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        number: putNumber,
        log_time: putTime,
        description: "进行了放仔操作",
      });

      if (!cage) {
        // 如果记录不存在，则进行新增
        cage = await Cage.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          statu: cageStatu,
          cub_number: putNumber,
        });

        return Result.JsonResponse(200, 200, "已记录", res, "success");
      } else {
        cage.statu = cageStatu; // 更新statu字段的值
        cage.cub_number = putNumber; // 更新cub_number字段的值

        await cage.save().then(() => {
          console.log("已修改cage表的状态");
        }); // 保存修改后的记录到数据库

        return Result.JsonResponse(200, 200, "已记录", res, "success");
      }
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/cub/save:
 *   put:
 *     tags:
 *        - 调仔接口
 *     summary: 调仔功能
 *     description: 记录带仔数量和状态以及时间
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: Cub
 *         description: 要记录的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Cub'
 *     responses:
 *       200:
 *         description: 记录成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   Cub:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *       - cubNumber
 *       - cubTime
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       cubNumber:
 *         type: integer
 *       cubTime:
 *         type: string
 *         format: date-time
 */
exports.cubEgg = async (req, res) => {
  //      鸽仓id   鸽笼id   鸽舍id   带仔数量   调仔时间
  let { siteId, cageId, houseId, cubNumber, cubTime } = req.body;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    // 解决时区问题
    cubTime = RegionTime.regionTime(cubTime);

    let canghao = req.get("Canghao");
    if (canghao == siteId || canghao == 0) {
      //分仓操作
      // 创建一条清单
      const cub = {
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        cub_number: cubNumber,
        cub_time: cubTime,
      };

      // 将清单保存到数据库
      await Cub.create(cub)
        //  data是参数
        .then(() => {
          console.log("已记录cub表");
        });

      // 修改cage表的信息
      let cage = await Cage.findOne({
        where: {
          site_id: siteId,
          cage_id: cageId,
          house_id: houseId,
        },
      }); // 根据cageId查找记录

      if (!cage) {
        // 如果记录不存在，则进行新增
        cage = await Cage.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          cub_number: cubNumber,
          time: cubTime,
        });
      } else {
        // 如果记录存在，则进行更新
        if (cage.cub_number != cubNumber) {
          cage.cub_number = cubNumber; // 更新cub_number字段的值

          if (cubNumber == 0) {
            cage.statu = "初始状态";
          }

          await cage.save(); // 保存修改后的记录到数据库
        }
      }

      //操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        number: cubNumber,
        log_time: cubTime,
        description: "进行了调仔操作",
      });

      return Result.JsonResponse(200, 200, "已修改带仔数量", res, "success");
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/stay/nextHouseId:
 *  get:
 *   tags:
 *     - 放仔接口
 *   description: 放仔功能-提醒可操作的下一个鸽舍-鸽笼
 *   parameters:
 *     - name: siteId
 *       in: query
 *       description: 鸽仓号
 *       required: false
 *     - name: houseId
 *       in: query
 *       description: 鸽舍号
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */
// 给予放仔的提示，根据当前鸽舍显示可以处理的下一个鸽舍
exports.nextHouseId = async (req, res) => {
  //      鸽仓id   鸽舍id
  let { siteId, houseId } = req.query;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    let stay =
      (await Stay.findOne({
        where: {
          site_id: siteId,
          house_id: {
            [Op.gt]: houseId, //  Op.gt 操作符指定大于当前 house_id 的值
          },
          statu: 0,
        },
        order: [["house_id", "ASC"]],
        attributes: ["house_id"], // 指定查询 cageId, houseId 字段
      })) || [];

    // 如果存在未处理的鸽舍，也将返回，直到全部处理完成
    if (stay.length === 0) {
      stay =
        (await Stay.findOne({
          where: {
            site_id: siteId,
            statu: 0,
          },
          order: [["house_id", "ASC"]],
          attributes: ["house_id"], // 指定查询 cageId, houseId 字段
        })) || [];
    }

    if (stay.length != 0) {
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        stay: stay,
        type: "success",
      });
    } else {
      //未找到对应的stay记录
      return res.status(200).json({
        code: 200,
        msg: "已处理完成预抽蛋名单",
        stay: {
          house_id: 0,
        },
        type: "success",
      });
    }
  } catch (error) {
    console.error(error);
    //出现错误，返回500状态码
    Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

// 双击留窝
/**
 * @swagger
 * /app/stay/save:
 *   post:
 *     tags:
 *        - 留窝接口
 *     summary: 留窝功能
 *     description: 记录查蛋时留窝的时间
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: Stay
 *         description: 要记录的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Stay'
 *     responses:
 *       200:
 *         description: 记录成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   Stay:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *       - cageStatu
 *       - stayTime
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       cageStatu:
 *         type: string
 *       stayTime:
 *         type: string
 *         format: date-time
 */
exports.addStay = async (req, res) => {
  //    鸽仓id   鸽笼id   鸽舍id   鸽笼状态  留窝时间
  let { siteId, cageId, houseId, cageStatu, stayTime } = req.body;

  let eggId,
    stayId = 0;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    // 解决时区问题
    stayTime = RegionTime.regionTime(stayTime);
    stayTime = new Date(stayTime); //转换类型

    let canghao = req.get("Canghao");
    if (canghao == siteId || canghao == 0) {
      //分仓操作
      let egg = await Egg.findOne({
        where: {
          site_id: siteId,
          cage_id: cageId,
          house_id: houseId,
          statu: 0,
        },
        order: [["egg_time", "DESC"]],
      }); // 根据houseId, cageId查找没有被抽蛋的记录

      //查询是否今天已经留窝了
      let stay = await Stay.findOne({
        where: {
          site_id: siteId,
          cage_id: cageId,
          house_id: houseId,
        },
        order: [["stay_time", "DESC"]],
      }); // 根据siteId, houseId, cageId查找记录

      if (stay) {
        //存在记录
        //已有数据
        let stayDate = new Date(stay.stay_time);
        //解决时区
        stayDate.setHours(stayDate.getHours());

        if (
          stayDate.getFullYear() === stayTime.getFullYear() &&
          stayDate.getMonth() === stayTime.getMonth() &&
          stayDate.getDate() === stayTime.getDate()
        ) {
          //存在记录且今天已经有数据了
          return Result.JsonResponse(200, 200, "今天已留窝了", res, "success");
        } else {
          //存在记录且今天没有数据
          if (!egg) {
            // 查蛋页面双击留窝增加一条查蛋留窝记录
            await Egg.create({
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
              egg_time: stayTime,
              statu: 2,
            }).then((result) => {
              eggId = result.id;
              console.log("已记录egg表");
            });
          } else if (egg) {
            // 将查到的蛋进行留窝处理
            egg.statu = 2;
            await egg.save();
          }

          // 增加留窝记录
          await Stay.create({
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            stay_time: stayTime,
          }).then((result) => {
            stayId = result.id;
            console.log("已记录stay表");
          });

          const cage = await Cage.findOne({
            where: {
              site_id: siteId,
              cage_id: cageId,
              house_id: houseId,
            },
          }); // 根据houseId, cageId查找记录

          if (!cage) {
            // 如果记录不存在，则进行新增
            await Cage.create({
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
              statu: cageStatu,
            });
          } else {
            // 如果该状态有记录，则更新
            cage.statu = cageStatu; // 更新statu字段的值

            await cage.save(); // 保存修改后的记录到数据库
          }

          //操作日志
          await Log.create({
            user_id: canghao,
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            log_time: stayTime,
            description: "进行了留窝操作",
          });

          // return Result.JsonResponse(200, 200, "留窝成功", res, "success")
          return res.status(200).json({
            code: 200,
            msg: "留窝成功",
            eggId: eggId,
            stayId: stayId,
            type: "success",
          }); //成功查找到cage，则返回statu属性值
        }
      } else {
        //不存在记录
        if (!egg) {
          // 查蛋页面双击留窝增加一条查蛋留窝记录
          await Egg.create({
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            egg_time: stayTime,
            statu: 2,
          }).then((result) => {
            eggId = result.id;
            console.log("已记录egg表");
          });
        } else if (egg) {
          // 将查到的蛋进行留窝处理
          egg.statu = 2;
          await egg.save();
        }

        // 增加留窝记录
        await Stay.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          stay_time: stayTime,
        }).then((result) => {
          stayId = result.id;
          console.log("已记录stay表");
        });

        const cage = await Cage.findOne({
          where: {
            site_id: siteId,
            cage_id: cageId,
            house_id: houseId,
          },
        }); // 根据houseId, cageId查找记录

        if (!cage) {
          // 如果记录不存在，则进行新增
          await Cage.create({
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            statu: cageStatu,
          });
        } else {
          // 如果该状态有记录，则更新
          cage.statu = cageStatu; // 更新statu字段的值

          await cage.save(); // 保存修改后的记录到数据库
        }

        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: stayTime,
          description: "进行了留窝操作",
        });

        // return Result.JsonResponse(200, 200, "留窝成功", res, "success")
        return res.status(200).json({
          code: 200,
          msg: "留窝成功",
          eggId: eggId,
          stayId: stayId,
          type: "success",
        }); //成功查找到cage，则返回statu属性值
      }
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/stay/delstay:
 *   post:
 *     tags:
 *        - 留窝接口
 *     summary: 留窝功能
 *     description: 删除错误记录的信息
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: DelStay
 *         description: 删除错误的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DelStay'
 *     responses:
 *       200:
 *         description: 记录成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   DelStay:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *       - cageStatus
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       cageStatu:
 *         type: string
 *       eggId:
 *         type: integer
 *       stayId:
 *         type: integer
 */
// 删除查蛋页面错误的留窝操作信息，并修改cage表的状态
exports.delStay = async (req, res) => {
  //   鸽仓id   鸽舍id   鸽笼id   鸽笼状态
  let { siteId, houseId, cageId, cageStatu, eggId, stayId } = req.body;

  try {
    const now = moment.tz("Asia/Shanghai").toDate();
    now.setHours(now.getHours() + 8);

    let canghao = req.get("Canghao");
    if (canghao == siteId || canghao == 0) {
      //分仓操作
      // 判断是否需要删除
      if (eggId === 0 || stayId === 0) {
        return Result.JsonResponse(200, 404, "删除失败", res, "warning"); //未找到对应的cage记录
      }

      // 从数据库获取nfc对用的鸽舍号
      houseId = await HouseId.getHouseId(houseId);

      // 将egg表的错误数据删除
      await Egg.destroy({
        where: {
          id: eggId,
        },
      }).then(() => {
        console.log(`已成功删除egg表id为${eggId}的信息`);
      });

      // 将stay表的错误数据删除
      await Stay.destroy({
        where: {
          id: stayId,
        },
      }).then(() => {
        console.log(`已成功删除stay表id为${stayId}的信息`);
      });

      // 修改cage表的状态
      await Cage.findOne({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      }).then((cage) => {
        cage.statu = cageStatu;
        cage.save();
        console.log("已修改cage表状态");
      });

      //操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        log_time: now,
        description: "进行了删除留窝操作",
      });

      return Result.JsonResponse(200, 200, "删除成功", res, "success"); //未找到对应的cage记录
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.log("删除操作失败", error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/abnormal/save:
 *   post:
 *     tags:
 *        - 异常状态接口
 *     summary: 异常信息登记功能
 *     description: 记录异常信息和日期
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: Abnormal
 *         description: 要记录的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Abnormal'
 *     responses:
 *       200:
 *         description: 记录成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   Abnormal:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *       - refer
 *       - abnorTime
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       refer:
 *         type: string
 *       abnorTime:
 *         type: string
 *         format: date-time
 */
exports.addAbnormal = async (req, res) => {
  //    鸽仓id   鸽笼id   鸽舍id  异常信息  abnorTime
  let { siteId, cageId, houseId, refer, abnorTime } = req.body;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    // 解决时区问题
    abnorTime = RegionTime.regionTime(abnorTime);

    // console.log(req.user);
    const userId = req.user.userId;
    let canghao = req.user.canghao;

    console.log("canghao", canghao);
    console.log("userId", userId);
    if (canghao == siteId || canghao == 0) {
      //分仓操作
      if (refer == "弃仔") {
        const cage = await Cage.findOne({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
          },
        });

        // 修改cage表对应的字段
        cage.statu = "初始状态";
        cage.cub_number = 0;
        cage.save();
        console.log("已修改cage表的数据");
      }
      // 将清单保存到数据库
      // 记录的数直接算异常
      await Abnormal.create({
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        refer: refer,
        time: abnorTime,
        statu: 1,
      }).then(() => {
        console.log("已记录abnormal表");
      });

      //操作日志
      await Log.create({
        user_id: userId - 1,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        log_time: abnorTime,
        description: `添加了${refer}的异常`,
      }).then(() => {
        console.log("已记录日志表");
      });

      return Result.JsonResponse(200, 200, "已记录", res, "success");
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/abnormal/info:
 *  get:
 *   tags:
 *     - 异常状态接口
 *   description: 显示异常状态
 *   parameters:
 *     - name: siteId
 *       in: query
 *       description: 鸽仓号
 *       required: false
 *     - name: houseId
 *       in: query
 *       description: 鸽舍号
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */
exports.abnormalInfo = async (req, res) => {
  //      鸽仓id   鸽舍id
  let { siteId, houseId } = req.query;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    let abnormals = [];

    // 查询符合条件的数据
    for (let i = 1; i <= 6; i++) {
      let abnormal = await Abnormal.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: i,
          statu: 0,
        },
        attributes: ["cage_id", "refer"], // 指定查询 refer 和  cage_id字段
        // attributes: { exclude: ["id", "site_id", "house_id", "statu", "time"] } // 排除 id等 字段
      });

      if (abnormal.length <= 0) {
        abnormal = {
          cage_id: i,
        };
      }

      abnormals = abnormals.concat(abnormal);
    }

    // 对查询的数据进行处理
    // 使用 reduce 函数将重复的 cage_id 的 egg_time 提取出来，重新组装成一个新的对象
    const processedData = {};

    abnormals.forEach((abnormal) => {
      if (!processedData[abnormal.cage_id]) {
        processedData[abnormal.cage_id] = [];
      }
      if (abnormal.refer) {
        processedData[abnormal.cage_id].push(abnormal.refer);
      }
    });

    // 转换为数组形式
    const result = Object.values(processedData);

    if (abnormals.length > 0) {
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        abnormal: result,
        type: "success",
      });
    } else {
      return Result.JsonResponse(200, 404, "无异常", res, "warning"); //未找到对应的cage记录
    }
  } catch (error) {
    console.error("数据库异常：", error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/abnormal/statu:
 *   put:
 *     tags:
 *        - 异常状态接口
 *     summary: 修改异常表的statu状态
 *     description: 修改状态
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: AbnorStatu
 *         description: 鸽笼鸽舍json接收体
 *         required: true
 *         schema:
 *           $ref: '#/definitions/AbnorStatu'
 *     responses:
 *       200:
 *         description: 获取成功
 *       400:
 *         description: 获取失败
 */

/**
 * @swagger
 * definitions:
 *   AbnorStatu:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       refer:
 *         type: string
 *       oneOrAll:
 *         type: integer
 *       updateTime:
 *         type: string
 *         format: date-time
 */
exports.updateAbnorStatu = async (req, res) => {
  //      鸽仓id   鸽笼id   鸽舍id  异常名  处理异常时间  1条或多条
  let { siteId, cageId, houseId, refer, updateTime, oneOrAll } = req.body;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);
    let abnormal = [];

    // 解决时区问题
    updateTime = RegionTime.regionTime(updateTime);

    let canghao = req.get("Canghao");
    if (canghao == siteId || canghao == 0) {
      //分仓操作
      // 处理单一的异常
      if (oneOrAll == 0) {
        abnormal =
          (await Abnormal.findOne({
            where: {
              site_id: siteId,
              cage_id: cageId,
              house_id: houseId,
              refer: refer,
              statu: 0, // 没有处理异常的
            },
          })) || [];
        if (abnormal.length != 0) {
          // 存在该条数据则修改
          abnormal.statu = 1;
          abnormal.time = updateTime;
          await abnormal.save();
        }
      } else if (oneOrAll == 1) {
        let flag = 0;
        refer.forEach((re) => {
          if (re === "淘汰") {
            flag = 1;
          }
        });

        if (flag === 0) {
          //死亡淘汰
          // 处理全部异常
          abnormal = await Abnormal.findAll({
            where: {
              site_id: siteId,
              cage_id: cageId,
              house_id: houseId,
              statu: 0, // 没有处理异常的
            },
          });

          let cage = await Cage.findOne({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });

          cage.number = 2;
          cage.statu = "初始状态";
          await cage.save();
          // 批量修改异常状态
          for (let i = 0; i < abnormal.length; i++) {
            abnormal[i].statu = 1;
            abnormal[i].time = updateTime;
            await abnormal[i].save();
          }
          if (abnormal.length == 0) {
            return Result.JsonResponse(200, 404, "记录不存在", res, "warning");
          }
        } else {
          //淘汰异常

          let cage = await Cage.findOne({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });

          if (cage) {
            cage.number = 2;
            cage.statu = "初始状态";
            cage.cub_number = 0;
            await cage.save();
          }

          await Egg.destroy({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });
          await Whipping.destroy({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });
          await Abnormal.destroy({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });
          await Cub.destroy({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });
          await Put.destroy({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });
          await Death.destroy({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });
          await Stay.destroy({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });
          await WarnEgg.destroy({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });

          //操作日志
          await Log.create({
            user_id: canghao,
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            log_time: updateTime,
            description: `添加了淘汰异常`,
          });
        }
      }

      //操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        log_time: updateTime,
        description: "处理了异常",
      });

      return Result.JsonResponse(200, 200, "已修改", res, "success");
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error");
  }
};
/**
 * @swagger
 * /app/death/save:
 *   post:
 *     tags:
 *        - 死亡信息记录接口
 *     summary: 死亡信息登记功能
 *     description: 记录死亡和异常的信息和日期
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: Death
 *         description: 要记录的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Death'
 *     responses:
 *       200:
 *         description: 记录成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   Death:
 *     type: object
 *     required:
 *       - siteId
 *       - houseId
 *       - cageId
 *       - refer
 *       - abnorTime
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       oldNum:
 *         type: integer
 *       youngNum:
 *         type: integer
 *       deathTime:
 *         type: string
 *         format: date-time
 */
//
exports.addDeath = async (req, res) => {
  //    鸽仓号  鸽笼号   鸽舍号   种鸽死亡数 雏鸽死亡数  死亡时间
  let { siteId, cageId, houseId, oldNum, youngNum, deathTime } = req.body;

  const refer = `死亡 种鸽${oldNum}; 雏鸽${youngNum}`;
  const death_sum = oldNum + youngNum;

  // 解决时区问题
  const realDeathTime = RegionTime.regionTime(deathTime);
  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    let canghao = req.get("Canghao");
    if (canghao == siteId || canghao == 0) {
      //分仓操作
      // 判断没有处理的死亡异常时候大于两条
      let conut = await Abnormal.count({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          statu: 0,
          refer: {
            [Op.like]: "%种鸽%",
          },
        },
      });

      if (conut >= 2) {
        return Result.JsonResponse(200, 404, "已记录多次死亡", res, "warning");
      }

      // 创建一条死亡记录
      const death = {
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        old_number: oldNum,
        young_number: youngNum,
        time: realDeathTime,
      };

      let cage = await Cage.findOne({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });

      if (!cage) {
        cage = await Cage.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        });
      }

      if (cage.number - oldNum < 0) {
        return Result.JsonResponse(
          200,
          404,
          "种鸽死亡数超过总数",
          res,
          "warning"
        );
      } else if (cage.cub_number - youngNum < 0) {
        return Result.JsonResponse(
          200,
          404,
          "雏鸽死亡数超过总数",
          res,
          "warning"
        );
      } else {
        cage.number -= oldNum;
        cage.cub_number -= youngNum;
        // if (cage.cub_number == 0) {
        //   cage.statu = "初始状态"

        // }
        await cage.save();
      }
      // 将记录保存到数据库
      await Death.create(death).then(() => {
        console.log("已记录death表");
      });

      if (oldNum > 0) {
        await Abnormal.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          refer: refer,
          time: realDeathTime,
          statu: 0,
        });
      }

      let count = await Count.findOne({
        where: {
          // 查询条件
          site_id: siteId,
          // time: {
          //   [Op.like]: `%${deathTime}%`
          // }
        },
        order: [["death_sum", "DESC"]], // 按照 createdAt 段字降序排列
      }); // 根据houseId, cageId, siteId查找记录

      if (!count) {
        await Count.create({
          site_id: siteId,
          death_sum: death_sum,
          day_death: death_sum,
          time: realDeathTime,
        });
      } else {
        const date = new Date(count.time); // 创建 Date 对象
        const countTime = date.toISOString();

        // 格式化时间
        let newDeathTime = realDeathTime.split(" ")[0]; // 格式化日期

        if (!countTime.includes(newDeathTime)) {
          // 如果不存在当天的数据就创建
          await Count.create({
            site_id: siteId,
            death_sum: count.death_sum + death_sum,
            day_death: death_sum,
            time: realDeathTime,
          });

          console.log("已新建count表新一天的记录");
        } else {
          count.death_sum += death_sum;
          count.day_death += death_sum;
          await count.save();

          console.log("已记录count表");
        }
      }

      //操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        log_time: realDeathTime,
        description: `添加了${refer}的死亡情况`,
      });

      return Result.JsonResponse(200, 200, "已记录", res, "success");
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/cage/statu:
 *  get:
 *   tags:
 *     - cage表接口
 *   description: 动态获取cage表的状态
 *   parameters:
 *     - name: siteId
 *       in: query
 *       description: 鸽仓号
 *       required: false
 *     - name: houseId
 *       in: query
 *       description: 鸽舍号
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */

exports.getCageStatu = async (req, res) => {
  //     鸽仓id   nfc号
  let { siteId, houseId } = req.query;

  try {
    // 从数据库获取nfc对用的鸽舍号
    // houseId = await HouseId.notExist(siteId, houseId);
    houseId = await HouseId.getHouseId(houseId);

    let cage = await Cage.findAll({
      where: {
        site_id: siteId,
        house_id: houseId,
      },
      order: [["cage_id", "ASC"]],
      attributes: ["cage_id", "statu"],
    });

    // 当前鸽舍有不存在的鸽笼，进行创建
    if (cage.length <= 0) {
      for (let i = 1; i <= 6; i++) {
        await Cage.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: i,
        });
      }

      cage = await Cage.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
        },
        order: [["cage_id", "ASC"]],
        attributes: ["cage_id", "statu"],
      });
    }

    if (cage.length > 0) {
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        statu: cage,
        houseId: houseId,
        type: "success",
      }); //成功查找到cage，则返回statu属性值
    } else {
      return Result.JsonResponse(200, 404, "未找到该鸽笼", res, "warning"); //未找到对应的cage记录
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/cage/oneStatu:
 *  get:
 *   tags:
 *     - cage表接口
 *   description: 动态获取一个鸽笼的状态
 *   parameters:
 *     - name: siteId
 *       in: query
 *       description: 鸽仓号
 *       required: false
 *     - name: cageId
 *       in: query
 *       description: 鸽舍号
 *       required: false
 *     - name: houseId
 *       in: query
 *       description: 鸽笼号
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */
// 获取单个鸽笼的状态
/* exports.getOneCageStatu = async (req, res) => {
 
  //      鸽仓id   鸽笼id   鸽舍id
  const { siteId, houseId, cageId } = req.query
 
  try {
 
    await Cage.findOne({
      where: {
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId
      }
    }).then((cage) => {
      if (cage) {
        return res.status(200).json({
          code: 200,
          msg: "查询成功",
          statu: cage.statu,
          type: "success"
        }) //成功查找到cage，则返回statu属性值
      } else {
        return Result.JsonResponse(200, 404, "未找到该鸽笼", res, "warning") //未找到对应的cage记录
      }
    })
  } catch (error) {
 
    console.error(error)
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error") //出现错误，返回500状态码
 
  }
 
} */

/**
 * @swagger
 * /app/cage/number:
 *  get:
 *   tags:
 *     - cage表接口
 *   description: 动态获取cage表的喂养乳鸽数量
 *   parameters:
 *     - name: siteId
 *       in: query
 *       description: 鸽仓号
 *       required: false
 *     - name: houseId
 *       in: query
 *       description: 鸽舍号
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */
exports.getCageNumber = async (req, res) => {
  //      鸽仓id   nfc号
  let { siteId, houseId } = req.query;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    let cages = await Cage.findAll({
      where: {
        site_id: siteId,
        house_id: houseId,
      },
    });

    if (cages.length > 0) {
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        cages: cages.map((cage) => ({
          cage_id: cage.cage_id,
          number: cage.cub_number,
          oldNum: cage.number, //hb
        })),
        type: "success",
      });
    } else {
      return Result.JsonResponse(200, 404, "未找到该鸽笼", res, "warning");
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/warnEgg/save:
 *   post:
 *     tags:
 *        - 预警接口
 *     summary: 插入预警数据
 *     description: 记录长时间不产蛋的预警信息
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: siteId
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 记录成功
 *       500:
 *         description: 请求体格式不正确或缺少必要的字段
 */
exports.addWarnEgg = async (req, res) => {
  try {
    const { siteId } = req.body;

    const today = new Date();
    today.setHours(8, 0, 0, 0); // 设置时间为当天的零点,因为是UTF-8所以要设置成8.00才会变成0点

    //获取每个鸽笼的最新egg记录
    let latestEggs = await Egg.findAll({
      attributes: ["site_id", "house_id", "cage_id", "egg_time", "statu"],
      where: sequelize.literal(`egg_time IN (
        SELECT MAX(egg_time)
        FROM egg
        WHERE site_id = ${siteId}
        GROUP BY site_id, house_id, cage_id
        )`),
      raw: true,
    });

    //hb 选出超过30天未产蛋的鸽笼
    const warnEggs = latestEggs
      .map((egg) => {
        const eggDate = new Date(egg.egg_time);
        const timeDiff = today.getTime() - eggDate.getTime();
        const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        if (diffInDays >= 30) {
          return {
            site_id: egg.site_id,
            house_id: egg.house_id,
            cage_id: egg.cage_id,
            egg_time: egg.egg_time,
            statu: egg.statu,
            diffInDays: diffInDays, //距离现在的天数
          };
        }
        return null;
      })
      .filter((egg) => egg !== null);

    warnEggs.forEach(async (warnEgg) => {
      const site_id = warnEgg.site_id;
      const house_id = warnEgg.house_id;
      const cage_id = warnEgg.cage_id;
      const egg_time = warnEgg.egg_time;
      const statu = warnEgg.statu;
      const diffInDays = warnEgg.diffInDays;

      let wEgg = await WarnEgg.findOne({
        where: {
          site_id,
          house_id,
          cage_id,
        },
      });

      if (!wEgg) {
        await WarnEgg.create({
          site_id: site_id,
          house_id: house_id,
          cage_id: cage_id,
          egg_time: egg_time,
          statu: statu,
          diffInDays: diffInDays,
        });
      } else if (wEgg) {
        wEgg.diffInDays =
          diffInDays > wEgg.diffInDays ? diffInDays : wEgg.diffInDays;
        await wEgg.save();
        console.log(
          site_id + " " + house_id + " " + cage_id + " " + wEgg.diffInDays
        );
      }
    });
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      type: "success",
    });
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/warnEgg/list:
 *   get:
 *     tags:
 *       - 预警接口
 *     summary: 获取预警列表
 *     description: 获取预警列表
 *     parameters:
 *       - in: query
 *         name: site_id
 *         description: 鸽仓号
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: page
 *         description: 当前要查询的页数
 *         required: true
 *         schema:
 *           type: integer
 *       - in: query
 *         name: pageSize
 *         description: 每页返回的页数
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 成功返回预警列表
 *         schema:
 *           type: object
 *           properties:
 *             eggs:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/WarnEgg'
 *       500:
 *         description: 请求体格式不正确或缺少必要的字段
 */
exports.getWarnEggList = async (req, res) => {
  try {
    const { site_id, page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    // 查询符合条件的总记录数
    const totalCount = await WarnEgg.count({
      where: {
        site_id,
      },
    });

    // 查询当天的需要抽蛋的egg记录，并进行分页
    const warnEggs = await WarnEgg.findAll({
      where: {
        site_id,
      },
      order: [["diff_in_days", "DESC"]],
      limit: parseInt(pageSize),
      offset: offset,
    });
    // 返回查询结果和总记录数
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      warnEggs: warnEggs,
      totalCount: totalCount,
      type: "success",
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    console.log(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/warnEgg/delete:
 *   get:
 *     tags:
 *        - 预警接口
 *     summary: 删除预警信息
 *     description: 根据id删除长时间不产蛋的预警信息
 *     parameters:
 *       - in: query
 *         name: id
 *         description: warnEggs的id
 *         required: true
 *         schema:
 *           type: integer
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 删除成功
 *       500:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   WarnEgg:
 *     type: object
 *     required:
 *       - site_id
 *       - house_id
 *       - cage_id
 *       - egg_time
 *       - statu
 *       - diff_in_days
 *     properties:
 *       site_id:
 *         type: integer
 *       house_id:
 *         type: string
 *       cage_id:
 *         type: integer
 *       egg_time:
 *         type: string
 *         format: date-time
 *       statu:
 *         type: string
 *       diff_in_days:
 *         type: integer
 */

exports.delWarnEgg = async (req, res) => {
  try {
    const { id } = req.query;

    const now = moment.tz("Asia/Shanghai").toDate();
    now.setHours(now.getHours() + 8);

    let canghao = req.get("Canghao");
    if (canghao == 0) {
      //分仓操作
      if (id <= 0) {
        return res.status(404).json({
          code: 404,
          msg: "非法id",
        });
      }
      await WarnEgg.destroy({
        where: {
          id,
        },
      });

      //操作日志
      await Log.create({
        user_id: canghao,
        log_time: now,
        description: `删除了id为${id}的预警记录`,
      });

      return res.status(200).json({
        code: 200,
        msg: "长时间不产蛋预警信息删除成功",
        type: "success",
      });
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.log(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/user/login:
 *   get:
 *     tags:
 *       - 登录接口
 *     summary: app端登录
 *     description: 校验密码是否正确以及身份
 *     parameters:
 *       - in: query
 *         name: username
 *         description: 用户名
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: password
 *         description: 密码
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功返回用户信息
 *         schema:
 *           $ref: '#/definitions/User'
 *       500:
 *         description: 登录失败
 */

/**
 * @swagger
 * definitions:
 *   User:
 *     type: object
 *     required:
 *       - role
 *       - username
 *       - password
 *     properties:
 *       role:
 *        type: string
 *       username:
 *        type: string
 *       password:
 *        type: string
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.query;
    // 在数据库中查找用户
    const user = await User.findOne({
      where: {
        username: username,
        password: password,
      },
    });
    // console.log(user);
    if (!user) {
      return Result.JsonResponse(
        200,
        404,
        "用户名或者密码错误",
        res,
        "warning"
      ); //未找到对应的用户信息
    } else {
      let siteId = user.id;
      if (siteId != 1) {
        siteId -= 1;
      }

      // 登录成功
      // 创建一个不包含密码的新用户对象
      const userWithoutPassword = {
        username: username,
        userId: user.id,
        role: user.role,
        realName: user.realName,
        canghao: user.canghao,
      };
      // 创建登录token
      const token = Jwt.sign(userWithoutPassword, jwt.jwtSecretKey, {
        expiresIn: jwt.expiresIn,
      });

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: userWithoutPassword,
        siteId: siteId,
        token: "Bearer " + token,
        type: "success",
      }); //成功查找到user
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/egg/eggCount:
 *   get:
 *     tags:
 *       - app数据展示
 *     summary: 获取当天生蛋数据的数量
 *     description: 获取egg表中的数据量
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 当天成功返回生蛋数据的数量
 *         schema:
 *           type: object
 *           properties:
 *             eggCount:
 *               type: integer
 *               description: 生蛋的数量
 *       500:
 *         description: 获取失败
 */
exports.getEggCount = async (req, res) => {
  try {
    const { site_id } = req.query;
    const today = new Date();
    today.setHours(8, 0, 0, 0); // 设置时间为当天的零点,因为是UTF-8所以要设置成8.00才会变成0点

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // 设置时间为第二天的零点

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const yesterdayEggCount = await Egg.count({
      where: {
        site_id: site_id,
        egg_time: {
          [Op.between]: [yesterday, today],
        },
      },
    });

    const eggCount = await Egg.count({
      where: {
        site_id: site_id,
        egg_time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });

    const diffEggCount = eggCount - yesterdayEggCount;
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      eggCount: eggCount,
      diffEggCount: diffEggCount,
      type: "success",
    });
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/put/putCount:
 *   get:
 *     tags:
 *       - app数据展示
 *     summary: 获取当天放仔数据的数量
 *     description: 获取Put表中的数据量
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 当天成功返回放仔数据的数量
 *         schema:
 *           type: object
 *           properties:
 *             putCount:
 *               type: integer
 *               description: 放仔的数量
 *       500:
 *         description: 获取失败
 */
exports.getPutCount = async (req, res) => {
  try {
    const { site_id } = req.query;
    const today = new Date();
    today.setHours(8, 0, 0, 0); // 设置时间为当天的零点,因为是UTF-8所以要设置成8.00才会变成0点

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // 设置时间为第二天的零点

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const putCount = await Put.count({
      where: {
        site_id: site_id,
        put_time: {
          [Op.between]: [today, tomorrow],
        },
      },
    });

    const yesterdayPutCount = await Put.count({
      where: {
        site_id: site_id,
        put_time: {
          [Op.between]: [yesterday, today],
        },
      },
    });
    const diffPutCount = putCount - yesterdayPutCount;
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      putCount: putCount,
      diffPutCount: diffPutCount,
      type: "success",
    });
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};
/**
 * @swagger
 * /app/cage/nfcSelect:
 *  get:
 *   tags:
 *     - 对单个笼子查看接口
 *   summary: nfc获取单个笼子的历史数据
 *   description: nfc查询单个笼子
 *   parameters:
 *     - name: year
 *       in: query
 *       description: 年份
 *       required: false
 *     - name: month
 *       in: query
 *       description: 月份
 *       required: false
 *     - name: operation
 *       in: query
 *       description: 操作
 *       required: false
 *     - name: siteId
 *       in: query
 *       description: 鸽仓号
 *       required: false
 *     - name: houseId
 *       in: query
 *       description: 鸽舍号
 *       required: false
 *     - name: cageId
 *       in: query
 *       description: 鸽笼号
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */
// 获取单个鸽笼的状态
exports.nfcGetEggList = async (req, res) => {
  //    年    月     操作       鸽仓id   鸽笼id   鸽舍id
  let { year, month, operation, siteId, houseId, cageId } = req.query;

  try {
    const time = new Date(year, month - 1);
    const startOfMonth = new Date(time.getFullYear(), time.getMonth(), 1);
    const endOfMonth = new Date(time.getFullYear(), time.getMonth() + 1, 0);
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    if (operation === "whipping") {
      const whippings = await Whipping.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          whipping_time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });
      if (whippings.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据",
          res,
          "warning"
        );
      }
      const resultWhippings = whippings.map((whipping) => {
        //格式化数据
        const formattedData = {
          id: whipping.id,
          siteId: whipping.site_id,
          houseId: whipping.house_id,
          cageId: whipping.cage_id,
          time: whipping.whipping_time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        whippings: resultWhippings,
        type: "success",
      });
    } else if (operation === "stay") {
      const stays = await Stay.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          stay_time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });
      if (stays.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据",
          res,
          "warning"
        );
      }
      const resultStays = stays.map((stay) => {
        //格式化数据
        const formattedData = {
          id: stay.id,
          siteId: stay.site_id,
          houseId: stay.house_id,
          cageId: stay.cage_id,
          time: stay.stay_time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        stays: resultStays,
        type: "success",
      });
    } else if (operation === "put") {
      const puts = await Put.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          put_time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });
      if (puts.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据",
          res,
          "warning"
        );
      }
      const resultPuts = puts.map((put) => {
        //格式化数据
        const formattedData = {
          id: put.id,
          siteId: put.site_id,
          houseId: put.house_id,
          cageId: put.cage_id,
          time: put.put_time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        puts: resultPuts,
        type: "success",
      });
    } else if (operation === "cub") {
      const cubs = await Cub.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          cub_time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
        },
      });
      if (cubs.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据!",
          res,
          "warning"
        );
      }
      const resultCubs = cubs.map((cub) => {
        //格式化数据
        const formattedData = {
          id: cub.id,
          siteId: cub.site_id,
          houseId: cub.house_id,
          cageId: cub.cage_id,
          time: cub.cub_time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        cubs: resultCubs,
        type: "success",
      });
    } else if (operation === "spermatozonia") {
      //光蛋
      const spermatozonias = await Abnormal.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          refer: {
            [Op.eq]: "光蛋",
          },
        },
      });
      if (spermatozonias.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据!",
          res,
          "warning"
        );
      }
      const resultSpermatozonias = spermatozonias.map((spermatozonia) => {
        //格式化数据
        const formattedData = {
          id: spermatozonia.id,
          siteId: spermatozonia.site_id,
          houseId: spermatozonia.house_id,
          cageId: spermatozonia.cage_id,
          time: spermatozonia.time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        spermatozonias: resultSpermatozonias,
        type: "success",
      });
    } else if (operation === "breakage") {
      //破损
      const breakages = await Abnormal.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          refer: {
            [Op.eq]: "破损",
          },
        },
      });
      if (breakages.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据!",
          res,
          "warning"
        );
      }
      const resultBreakages = breakages.map((breakage) => {
        //格式化数据
        const formattedData = {
          id: breakage.id,
          siteId: breakage.site_id,
          houseId: breakage.house_id,
          cageId: breakage.cage_id,
          time: breakage.time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        breakages: resultBreakages,
        type: "success",
      });
    } else if (operation === "abandon") {
      //弃仔
      const abandons = await Abnormal.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          refer: {
            [Op.eq]: "弃仔",
          },
        },
      });
      if (abandons.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据!",
          res,
          "warning"
        );
      }
      const resultAbandons = abandons.map((abandon) => {
        //格式化数据
        const formattedData = {
          id: abandon.id,
          siteId: abandon.site_id,
          houseId: abandon.house_id,
          cageId: abandon.cage_id,
          time: abandon.time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        abandons: resultAbandons,
        type: "success",
      });
    } else if (operation === "single") {
      //单蛋
      const singles = await Abnormal.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          refer: {
            // [Op.eq]: '无精'
            [Op.eq]: "单蛋",
          },
        },
      });
      if (singles.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据!",
          res,
          "warning"
        );
      }
      const resultSingles = singles.map((single) => {
        //格式化数据
        const formattedData = {
          id: single.id,
          siteId: single.site_id,
          houseId: single.house_id,
          cageId: single.cage_id,
          time: single.time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        singles: resultSingles,
        type: "success",
      });
    } else if (operation === "discard") {
      //弃孵
      const discards = await Abnormal.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          refer: {
            [Op.eq]: "弃孵",
          },
        },
      });
      if (discards.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据!",
          res,
          "warning"
        );
      }
      const resultDiscards = discards.map((discard) => {
        //格式化数据
        const formattedData = {
          id: discard.id,
          siteId: discard.site_id,
          houseId: discard.house_id,
          cageId: discard.cage_id,
          time: discard.time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        discards: resultDiscards,
        type: "success",
      });
    } else if (operation === "death") {
      //死亡
      const deaths = await Abnormal.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          time: {
            [Op.between]: [startOfMonth, endOfMonth],
          },
          refer: {
            [Op.like]: "%死亡%",
          },
        },
      });
      if (deaths.length === 0) {
        return Result.JsonResponse(
          200,
          404,
          "未找到符合的数据!",
          res,
          "warning"
        );
      }
      const resultDeaths = deaths.map((death) => {
        //格式化数据
        const formattedData = {
          id: death.id,
          siteId: death.site_id,
          houseId: death.house_id,
          cageId: death.cage_id,
          time: death.time,
        };
        return formattedData;
      });
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        deaths: resultDeaths,
        type: "success",
      });
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/egg/historyList:
 *  get:
 *   tags:
 *     - 对单个笼子的接口
 *   summary: 根据参数获取单个笼子的历史数据
 *   description: 查询单个笼子
 *   parameters:
 *     - name: year
 *       in: query
 *       description: 年份
 *       required: false
 *     - name: month
 *       in: query
 *       description: 月份
 *       required: false
 *     - name: operation
 *       in: query
 *       description: 操作
 *       required: false
 *     - name: siteId
 *       in: query
 *       description: 鸽仓号
 *       required: false
 *     - name: houseId
 *       in: query
 *       description: 鸽舍号
 *       required: false
 *     - name: cageId
 *       in: query
 *       description: 鸽笼号
 *       required: false
 *     - name: page
 *       in: query
 *       description: 当前页数
 *       required: false
 *     - name: pageSize
 *       in: query
 *       description: 每页返回的页数
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */
// // 获取单个鸽笼的历史信息 旧
// exports.getEggList = async (req, res) => {
//   let { year, month, operation, siteId, houseId, cageId, page, pageSize } =
//     req.query;

//   try {
//     // 定义findUser函数，用来查找相应操作的操作员
//     const findUser = async (time) => {
//       const log = await Log.findOne({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           log_time: time,
//         },
//       });
//       let user = parseInt(log.user_id);
//       if (user === 0) {
//         return "管理员";
//       } else if (user === 1) {
//         return "一仓师傅";
//       } else if (user === 2) {
//         return "二仓师傅";
//       } else if (user === 3) {
//         return "三仓师傅";
//       }
//     };

//     const time = new Date(year, month - 1);
//     const startOfMonth = new Date(time.getFullYear(), time.getMonth(), 1);
//     const endOfMonth = new Date(time.getFullYear(), time.getMonth() + 1, 0);

//     // 从数据库获取nfc对用的鸽舍号
//     houseId = await HouseId.getHouseId(houseId);

//     if (operation === "whipping") {
//       const whippings = await Whipping.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           whipping_time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (!whippings.count) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultWhippings = await Promise.all(
//         whippings.rows.map(async (whipping) => {
//           let us = await findUser(whipping.whipping_time); // 等待findUser解析完成
//           console.log(us);
//           const formattedData = {
//             id: whipping.id,
//             siteId: whipping.site_id,
//             houseId: whipping.house_id,
//             cageId: whipping.cage_id,
//             time: whipping.whipping_time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultWhippings,
//         type: "success",
//         total: whippings.count,
//       });
//     } else if (operation === "stay") {
//       const stays = await Stay.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           stay_time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (!stays.count) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultStays = await Promise.all(
//         stays.rows.map(async (stay) => {
//           let us = await findUser(stay.stay_time); // 假设这是需要等待解析的异步操作
//           const formattedData = {
//             id: stay.id,
//             siteId: stay.site_id,
//             houseId: stay.house_id,
//             cageId: stay.cage_id,
//             time: stay.stay_time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultStays,
//         type: "success",
//         total: stays.count,
//       });
//     } else if (operation === "put") {
//       const puts = await Put.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           put_time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (!puts.count) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultPuts = await Promise.all(
//         puts.rows.map(async (put) => {
//           let us = await findUser(put.put_time); // 假设这是需要等待解析的异步操作
//           const formattedData = {
//             id: put.id,
//             siteId: put.site_id,
//             houseId: put.house_id,
//             cageId: put.cage_id,
//             time: put.put_time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultPuts,
//         type: "success",
//         total: puts.count,
//       });
//     } else if (operation === "cub") {
//       const cubs = await Cub.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           cub_time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (!cubs.count) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultCubs = await Promise.all(
//         cubs.rows.map(async (cub) => {
//           let us = await findUser(cub.cub_time); // 假设这是需要等待解析的异步操作
//           const formattedData = {
//             id: cub.id,
//             siteId: cub.site_id,
//             houseId: cub.house_id,
//             cageId: cub.cage_id,
//             time: cub.cub_time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultCubs,
//         type: "success",
//         total: cubs.count,
//       });
//     } else if (operation === "spermatozonia") {
//       //光蛋
//       const spermatozonias = await Abnormal.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//           refer: {
//             [Op.eq]: "光蛋",
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (!spermatozonias.count) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultSpermatozonias = await Promise.all(
//         spermatozonias.rows.map(async (spermatozonia) => {
//           let us = await findUser(spermatozonia.time); // 假设这是需要等待解析的异步操作
//           const formattedData = {
//             id: spermatozonia.id,
//             siteId: spermatozonia.site_id,
//             houseId: spermatozonia.house_id,
//             cageId: spermatozonia.cage_id,
//             time: spermatozonia.time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultSpermatozonias,
//         type: "success",
//         total: spermatozonias.count,
//       });
//     } else if (operation === "breakage") {
//       const breakages = await Abnormal.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//           refer: {
//             [Op.eq]: "破损",
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (!breakages.count) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultBreakages = await Promise.all(
//         breakages.rows.map(async (breakage) => {
//           let us = await findUser(breakage.time); // 假设这是需要等待解析的异步操作
//           const formattedData = {
//             id: breakage.id,
//             siteId: breakage.site_id,
//             houseId: breakage.house_id,
//             cageId: breakage.cage_id,
//             time: breakage.time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultBreakages,
//         type: "success",
//         total: breakages.count,
//       });
//     } else if (operation === "abandon") {
//       //弃仔
//       const abandons = await Abnormal.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//           refer: {
//             [Op.eq]: "弃仔",
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (abandons.count === 0) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultAbandons = await Promise.all(
//         abandons.rows.map(async (abandon) => {
//           let us = await findUser(abandon.time); // 假设这是需要等待解析的异步操作
//           const formattedData = {
//             id: abandon.id,
//             siteId: abandon.site_id,
//             houseId: abandon.house_id,
//             cageId: abandon.cage_id,
//             time: abandon.time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultAbandons,
//         type: "success",
//         total: abandons.count,
//       });
//     } else if (operation === "single") {
//       //单蛋
//       const singles = await Abnormal.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//           refer: {
//             [Op.eq]: "单蛋",
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (singles.count === 0) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultSingles = await Promise.all(
//         singles.rows.map(async (single) => {
//           let us = await findUser(single.time); // 假设这是需要等待解析的异步操作
//           const formattedData = {
//             id: single.id,
//             siteId: single.site_id,
//             houseId: single.house_id,
//             cageId: single.cage_id,
//             time: single.time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultSingles,
//         type: "success",
//         total: singles.count,
//       });
//     } else if (operation === "discard") {
//       //弃孵
//       const discards = await Abnormal.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//           refer: {
//             [Op.eq]: "弃孵",
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (discards.count === 0) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultDiscards = await Promise.all(
//         discards.rows.map(async (discard) => {
//           let us = await findUser(discard.time); // 假设这是需要等待解析的异步操作
//           const formattedData = {
//             id: discard.id,
//             siteId: discard.site_id,
//             houseId: discard.house_id,
//             cageId: discard.cage_id,
//             time: discard.time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultDiscards,
//         type: "success",
//         total: discards.count,
//       });
//     } else if (operation === "death_old") {
//       //种鸽死亡
//       const deaths = await Abnormal.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//           refer: {
//             [Op.like]: "%死亡%",
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (deaths.count === 0) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultDeaths = await Promise.all(
//         deaths.rows.map(async (death) => {
//           let us = await findUser(death.time);
//           //格式化数据
//           const formattedData = {
//             id: death.id,
//             siteId: death.site_id,
//             houseId: death.house_id,
//             cageId: death.cage_id,
//             time: death.time,
//             user: us, // 这里us将会是findUser的返回值，而不是Promise对象
//           };
//           return formattedData;
//         })
//       );
//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultDeaths,
//         type: "success",
//         total: deaths.count,
//       });
//     } else if (operation === "death_young") {
//       //雏鸽死亡
//       //在death表寻找雏鸽死亡记录
//       const deaths = await Death.findAndCountAll({
//         where: {
//           site_id: siteId,
//           house_id: houseId,
//           cage_id: cageId,
//           time: {
//             [Op.between]: [startOfMonth, endOfMonth],
//           },
//           young_number: {
//             [Op.gt]: 0, // 这里添加了 young_number > 0 的条件
//           },
//         },
//         offset: (parseInt(page) - 1) * parseInt(pageSize),
//         limit: parseInt(pageSize),
//       });

//       if (deaths.count === 0) {
//         return Result.JsonResponse(
//           200,
//           200,
//           "未找到符合的数据",
//           res,
//           "warning"
//         );
//       }

//       const resultDeaths = deaths.rows.map((death) => {
//         //格式化数据
//         const formattedData = {
//           id: death.id,
//           siteId: death.site_id,
//           houseId: death.house_id,
//           cageId: death.cage_id,
//           time: death.time,
//         };
//         return formattedData;
//       });

//       return res.status(200).json({
//         code: 200,
//         msg: "查询成功",
//         data: resultDeaths,
//         type: "success",
//         total: deaths.count,
//       });
//     }
//   } catch (error) {
//     console.error(error);
//     return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
//   }
// };

//对单个鸽笼查看--->改为按日期、按操作记录查看六个鸽笼历史记录  2024年5月11日
exports.getEggList = async (req, res) => {
  //   2024    05     09   whipping     1    c55ce678    1      1
  let { year, month, day, operation, siteId, houseId, page, pageSize } =
    req.query;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);
    if (month.length === 1) {
      month = "0" + month;
    }
    if (day.length === 1) {
      day = "0" + day;
    }
    // 指定日期的开始时间
    const startDate = new Date(`${year}-${month}-${day}T00:00:00Z`);
    // 格式为 2024-05-09T00:00:00Z
    // 指定日期的结束时间
    const endDate = new Date(`${year}-${month}-${day}T23:59:59Z`);
    // console.log(startDate, endDate);

    // 定义findUser函数，用来查找相应操作的操作员
    const findUser = async (time, cageId) => {
      const log = await Log.findOne({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
        },
      });
      if (!log) {
        return "无";
      }
      let user = parseInt(log.user_id);
      if (user === 0) {
        return "管理员";
      } else if (user === 1) {
        return "一仓师傅";
      } else if (user === 2) {
        return "二仓师傅";
      } else if (user === 3) {
        return "三仓师傅";
      }
    };

    // 抽蛋
    if (operation === "whipping") {
      const whippings = await Whipping.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          whipping_time: {
            [Op.gte]: startDate, // 大于或等于指定日期
            [Op.lt]: endDate,
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (!whippings.count) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultWhippings = await Promise.all(
        whippings.rows.map(async (whipping) => {
          let us = await findUser(whipping.whipping_time, whipping.cage_id); // 等待findUser解析完成
          console.log(us);
          const formattedData = {
            id: whipping.id,
            siteId: whipping.site_id,
            houseId: whipping.house_id,
            cageId: whipping.cage_id,
            time: whipping.whipping_time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultWhippings,
        type: "success",
        total: resultWhippings.count,
      });
    }
    // 留窝
    else if (operation === "stay") {
      const stays = await Stay.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          stay_time: {
            [Op.between]: [startDate, endDate],
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (!stays.count) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultStays = await Promise.all(
        stays.rows.map(async (stay) => {
          let us = await findUser(stay.stay_time, stay.cage_id); // 假设这是需要等待解析的异步操作
          const formattedData = {
            id: stay.id,
            siteId: stay.site_id,
            houseId: stay.house_id,
            cageId: stay.cage_id,
            time: stay.stay_time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultStays,
        type: "success",
        total: stays.count,
      });
    }
    // 放仔
    else if (operation === "put") {
      const puts = await Put.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          put_time: {
            [Op.between]: [startDate, endDate],
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (!puts.count) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultPuts = await Promise.all(
        puts.rows.map(async (put) => {
          let us = await findUser(put.put_time, put.cage_id); // 假设这是需要等待解析的异步操作
          const formattedData = {
            id: put.id,
            siteId: put.site_id,
            houseId: put.house_id,
            cageId: put.cage_id,
            time: put.put_time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultPuts,
        type: "success",
        total: puts.count,
      });
    }
    // 带仔？
    else if (operation === "cub") {
      const cubs = await Cub.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cub_time: {
            [Op.between]: [startDate, endDate],
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (!cubs.count) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultCubs = await Promise.all(
        cubs.rows.map(async (cub) => {
          let us = await findUser(cub.cub_time, cub.cage_id); // 假设这是需要等待解析的异步操作
          const formattedData = {
            id: cub.id,
            siteId: cub.site_id,
            houseId: cub.house_id,
            cageId: cub.cage_id,
            time: cub.cub_time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultCubs,
        type: "success",
        total: cubs.count,
      });
    }
    //光蛋
    else if (operation === "spermatozonia") {
      const spermatozons = await Abnormal.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          time: {
            [Op.between]: [startDate, endDate],
          },
          refer: {
            [Op.eq]: "光蛋",
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (!spermatozons.count) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultSpermatozons = await Promise.all(
        spermatozons.rows.map(async (spermatozon) => {
          let us = await findUser(spermatozon.time, spermatozon.cage_id); // 假设这是需要等待解析的异步操作
          const formattedData = {
            id: spermatozon.id,
            siteId: spermatozon.site_id,
            houseId: spermatozon.house_id,
            cageId: spermatozon.cage_id,
            time: spermatozon.time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultSpermatozons,
        type: "success",
        total: spermatozons.count,
      });
    }
    //破损
    else if (operation === "breakage") {
      const breakages = await Abnormal.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          time: {
            [Op.between]: [startDate, endDate],
          },
          refer: {
            [Op.eq]: "破损",
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (!breakages.count) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultBreakages = await Promise.all(
        breakages.rows.map(async (breakage) => {
          let us = await findUser(breakage.time, breakage.cage_id); // 假设这是需要等待解析的异步操作
          const formattedData = {
            id: breakage.id,
            siteId: breakage.site_id,
            houseId: breakage.house_id,
            cageId: breakage.cage_id,
            time: breakage.time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultBreakages,
        type: "success",
        total: breakages.count,
      });
    }
    //弃仔
    else if (operation === "abandon") {
      const abandons = await Abnormal.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          time: {
            [Op.between]: [startDate, endDate],
          },
          refer: {
            [Op.eq]: "弃仔",
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),

        limit: parseInt(pageSize),
      });

      if (!abandons.count) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultAbandons = await Promise.all(
        abandons.rows.map(async (abandon) => {
          let us = await findUser(abandon.time, abandon.cage_id); // 假设这是需要等待解析的异步操作
          const formattedData = {
            id: abandon.id,
            siteId: abandon.site_id,
            houseId: abandon.house_id,
            cageId: abandon.cage_id,
            time: abandon.time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultAbandons,
        type: "success",
        total: abandons.count,
      });
    }
    //单蛋
    else if (operation === "single") {
      const singles = await Abnormal.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          time: {
            [Op.between]: [startDate, endDate],
          },
          refer: {
            [Op.eq]: "单蛋",
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (singles.count === 0) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultSingles = await Promise.all(
        singles.rows.map(async (single) => {
          let us = await findUser(single.time, single.cage_id); // 假设这是需要等待解析的异步操作
          const formattedData = {
            id: single.id,
            siteId: single.site_id,
            houseId: single.house_id,
            cageId: single.cage_id,
            time: single.time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultSingles,
        type: "success",
        total: singles.count,
      });
    }
    //弃孵
    else if (operation === "discard") {
      const discards = await Abnormal.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          time: {
            [Op.between]: [startDate, endDate],
          },
          refer: {
            [Op.eq]: "弃孵",
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (!discards.count) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultDiscards = await Promise.all(
        discards.rows.map(async (discard) => {
          let us = await findUser(discard.time, discard.cage_id); // 假设这是需要等待解析的异步操作
          const formattedData = {
            id: discard.id,
            siteId: discard.site_id,
            houseId: discard.house_id,
            cageId: discard.cage_id,
            time: discard.time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultDiscards,
        type: "success",
        total: discards.count,
      });
    }
    //种鸽死亡
    else if (operation === "death_old") {
      const deaths = await Abnormal.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          time: {
            [Op.between]: [startDate, endDate],
          },
          refer: {
            [Op.like]: "%死亡%",
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (deaths.count === 0) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultDeaths = await Promise.all(
        deaths.rows.map(async (death) => {
          let us = await findUser(death.time, death.cage_id);
          //格式化数据
          const formattedData = {
            id: death.id,
            siteId: death.site_id,
            houseId: death.house_id,
            cageId: death.cage_id,
            time: death.time,
            user: us, // 这里us将会是findUser的返回值，而不是Promise对象
          };
          return formattedData;
        })
      );
      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultDeaths,
        type: "success",
        total: deaths.count,
      });
    }
    //雏鸽死亡
    else if (operation === "death_young") {
      //在death表寻找雏鸽死亡记录
      const deaths = await Death.findAndCountAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          time: {
            [Op.between]: [startDate, endDate],
          },
          young_number: {
            [Op.gt]: 0, // 这里添加了 young_number > 0 的条件
          },
        },
        offset: (parseInt(page) - 1) * parseInt(pageSize),
        limit: parseInt(pageSize),
      });

      if (deaths.count === 0) {
        return Result.JsonResponse(
          200,
          200,
          "未找到符合的数据",
          res,
          "warning"
        );
      }

      const resultDeaths = deaths.rows.map((death) => {
        //格式化数据
        const formattedData = {
          id: death.id,
          siteId: death.site_id,
          houseId: death.house_id,
          cageId: death.cage_id,
          time: death.time,
        };
        return formattedData;
      });

      return res.status(200).json({
        code: 200,
        msg: "查询成功",
        data: resultDeaths,
        type: "success",
        total: deaths.count,
      });
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/egg/deleteHistory:
 *  post:
 *    tags:
 *      - 对单个笼子的接口
 *    summary: 根据参数删除单个笼子的历史数据
 *    description: 删除单个笼子的历史数据
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              operation:
 *                type: string
 *                description: 操作
 *              id:
 *                type: integer
 *                format: int64
 *                description: 主键id
 *              siteId:
 *                type: string
 *                description: 鸽仓号
 *              houseId:
 *                type: string
 *                description: 鸽舍号
 *              cageId:
 *                type: string
 *                description: 鸽笼号
 
 *    responses:
 *      '200':
 *        description: successful operation
 *      '400':
 *        description: Invalid name value
 */

/**
 * @swagger
 * /app/egg/deleteHistory:
 *   post:
 *     tags:
 *        - 对单个笼子的接口
 *     summary: 根据参数删除单个笼子的历史数据
 *     description: 删除单个笼子的历史数据
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: DelList
 *         description: app管理员删除信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DelList'
 *     responses:
 *       200:
 *         description: 删除成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   DelList:
 *     type: object
 *     required:
 *       - operation
 *       - id
 *       - siteId
 *       - houseId
 *       - cageId
 *       - time
 *     properties:
 *       operation:
 *         type: string
 *       id:
 *         type: integer
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       time:
 *         type: string
 *         format: date-time
 */
exports.deleteEggList = async (req, res) => {
  //   鸽仓id   鸽舍id   鸽笼id   鸽笼状态
  let { operation, id, siteId, houseId, cageId, time } = req.body;

  try {
    // 定义updateCageStatus函数，用来对鸽笼状态进行修改
    const updateCageStatus = async () => {
      const whippings = await Whipping.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });
      const stays = await Stay.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });
      const puts = await Put.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });
      const cubs = await Cub.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });

      const formatData = [];
      whippings.forEach((whipping) => {
        const whip = {
          time: whipping.whipping_time,
          statu: "抽蛋",
        };
        formatData.push(whip);
      });
      stays.forEach((stay) => {
        const sta = {
          time: stay.stay_time,
          statu: "留窝",
        };
        formatData.push(sta);
      });
      puts.forEach((put) => {
        const pu = {
          time: put.put_time,
          statu: "带仔中",
        };
        formatData.push(pu);
      });
      cubs.forEach((cub) => {
        if (cub.cub_number === 0) {
          const cu = {
            time: cub.cub_time,
            statu: "初始状态",
          };
          formatData.push(cu);
        } else {
          const cu = {
            time: cub.cub_time,
            statu: "带仔中",
          };
          formatData.push(cu);
        }
      });

      if (formatData.length > 1) {
        // 升序排序
        formatData.sort((a, b) => new Date(a.time) - new Date(b.time));

        let flag = 0;
        let time;
        formatData.forEach((data) => {
          if (data.statu === "带仔中") {
            time = new Date(data.time);
            flag = 1;
          } else if (flag === 1) {
            let next = new Date(data.time);
            const timeDiff = next.getTime() - time.getTime();
            const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            if (diffInDays < 25) {
              data.statu = "带仔中";
            } else {
              flag = 0;
            }
          }
        });

        //降序排序
        formatData.sort((a, b) => new Date(b.time) - new Date(a.time));

        return formatData[1].statu;
      } else if (formatData.length === 1) {
        return "初始状态";
      } else {
        return "null";
      }
    };

    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);
    // 解决时区问题
    time = RegionTime.regionTime(time);

    let canghao = req.get("Canghao");
    if (canghao == 0) {
      //分仓操作
      if (operation === "whipping") {
        //找到最新的记录
        const whipping = await Whipping.findOne({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
          },
          order: [["whipping_time", "DESC"]],
        });
        await Egg.destroy({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            egg_time: time,
            statu: 1,
          },
        });
        if (whipping && whipping.id === id) {
          // 删除的是最新数据
          try {
            // 修改cage表的状态
            const cage = await Cage.findOne({
              where: {
                site_id: siteId,
                house_id: houseId,
                cage_id: cageId,
              },
            });
            if (cage) {
              const cageStatu = await updateCageStatus(); // 确保使用await
              if (cageStatu != null) {
                cage.statu = cageStatu;
                await cage.save(); // 确保使用await
                console.log("已修改cage表状态");
              }
            }
          } catch (error) {
            console.error("更新Cage状态时出错:", error);
            // 这里应该处理错误，可能是通过回滚事务或记录错误日志
          }
        }
        await Whipping.destroy({
          where: {
            id: id,
          },
        });

        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的抽蛋记录`,
        });

        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "stay") {
        const stay = await Stay.findOne({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
          },
          order: [["stay_time", "DESC"]],
        });
        await Egg.destroy({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            egg_time: time,
            statu: 2,
          },
        });
        if (stay && stay.id === id) {
          // 删除的是最新数据
          try {
            // 修改cage表的状态
            const cage = await Cage.findOne({
              where: {
                site_id: siteId,
                house_id: houseId,
                cage_id: cageId,
              },
            });
            if (cage) {
              const cageStatu = await updateCageStatus(); // 确保使用await
              if (cageStatu != null) {
                cage.statu = cageStatu;
                await cage.save(); // 确保使用await
                console.log("已修改cage表状态");
              }
            }
          } catch (error) {
            console.error("更新Cage状态时出错:", error);
            // 这里应该处理错误，可能是通过回滚事务或记录错误日志
          }
        }
        await Stay.destroy({
          where: {
            id: id,
          },
        });

        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的留窝记录`,
        });

        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "put") {
        const put = await Put.findOne({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
          },
          order: [["put_time", "DESC"]],
        });

        if (put && put.id === id) {
          // 删除的是最新数据
          try {
            // 修改cage表的状态
            const cage = await Cage.findOne({
              where: {
                site_id: siteId,
                house_id: houseId,
                cage_id: cageId,
              },
            });
            if (cage) {
              const cageStatu = await updateCageStatus(); // 确保使用await
              if (cageStatu != null) {
                cage.statu = cageStatu;
                await cage.save(); // 确保使用await
                console.log("已修改cage表状态");
              }
            }
          } catch (error) {
            console.error("更新Cage状态时出错:", error);
            // 这里应该处理错误，可能是通过回滚事务或记录错误日志
          }
        }
        await Put.destroy({
          where: {
            id: id,
          },
        });

        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的放仔记录`,
        });

        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "cub") {
        const cub = await Cub.findOne({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
          },
          order: [["cub_time", "DESC"]],
        });

        if (cub && cub.id === id) {
          // 删除的是最新数据
          try {
            // 修改cage表的状态
            const cage = await Cage.findOne({
              where: {
                site_id: siteId,
                house_id: houseId,
                cage_id: cageId,
              },
            });
            if (cage) {
              const cageStatu = await updateCageStatus(); // 确保使用await
              if (cageStatu != null) {
                cage.statu = cageStatu;
                await cage.save(); // 确保使用await
                console.log("已修改cage表状态");
              }
            }
          } catch (error) {
            console.error("更新Cage状态时出错:", error);
            // 这里应该处理错误，可能是通过回滚事务或记录错误日志
          }
        }
        await Cub.destroy({
          where: {
            id: id,
          },
        });
        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的调仔记录`,
        });
        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "spermatozonia") {
        //光蛋
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的光蛋记录`,
        });
        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "breakage") {
        //破损
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的破损记录`,
        });
        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "abandon") {
        //弃仔
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的弃仔记录`,
        });
        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "single") {
        //单蛋
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的单蛋记录`,
        });
        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "discard") {
        //弃孵
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的弃孵记录`,
        });
        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "death_old") {
        //种鸽死亡
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });

        // 删除种鸽死亡记录
        let death = await Death.findOne({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            time: time,
          },
        });
        let oldNum = death.old_number;

        death.old_number = 0;
        //当雏鸽也不含数据的时候，那条数据便可删除
        if (death.young_number === 0) {
          await death.destroy();
        } else {
          await death.save();
        }

        // 删除统计死亡记录
        let co = await Count.findOne({
          where: {
            site_id: siteId,
            time: time,
          },
        });

        co.death_sum -= oldNum;
        co.day_death -= oldNum;
        await co.save();

        //对统计数据进行删减数据量，复原
        let count = await Count.findAll({
          where: {
            // 查询条件
            site_id: siteId,
            // time: {
            //   [Op.like]: `%${deathTime}%`
            // }
          },
          order: [["time", "ASC"]], // 按照 createdAt 段字降序排列
        }); // 根据houseId, cageId, siteId查找记录

        let flag = 0;
        let timeDate = new Date(time);
        // 格式化要更改成的时间
        // let newTime = time.split(' ')[0] // 格式化日期
        for (let i = 0; i < count.length - 1; i++) {
          // 注意这里的循环条件是length - 1，因为我们要访问next元素
          const current = count[i];
          const next = count[i + 1];

          // 将字符串时间转换为Date对象以便比较
          const currentTime = new Date(current.time);
          const nextTime = new Date(next.time);

          // 检查modifiedTime是否在current.time和next.time之间
          if (timeDate > currentTime && timeDate < nextTime) {
            // 如果modifiedTime位于两个相邻时间之间
            next.death_sum = next.death_sum - oldNum;
            await next.save();
            flag = 1;
            continue;
          }
          //创建之后
          if (flag === 1) {
            next.death_sum = next.death_sum - oldNum;
            await next.save();
          }
        }

        //删除那些天死亡数为0的数据
        let cou = await Count.findOne({
          where: {
            site_id: siteId,
            day_death: 0, // 这里添加了 day_death 等于 0 的条件
          },
        });
        if (cou) {
          await cou.destroy();
        }

        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的种鸽死亡记录`,
        });
        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      } else if (operation === "death_young") {
        //雏鸽死亡
        // 删除雏鸽死亡记录
        let death = await Death.findOne({
          where: {
            id: id,
          },
        });
        let youngNum = death.young_number;

        death.young_number = 0;
        //当雏鸽也不含数据的时候，那条数据便可删除
        if (death.old_number === 0) {
          await death.destroy();
        } else {
          await death.save();
        }

        // 删除统计死亡记录
        let co = await Count.findOne({
          where: {
            site_id: siteId,
            time: time,
          },
        });

        co.death_sum -= youngNum;
        co.day_death -= youngNum;
        await co.save();

        //对统计数据进行删减数据量，复原
        let count = await Count.findAll({
          where: {
            // 查询条件
            site_id: siteId,
            // time: {
            //   [Op.like]: `%${deathTime}%`
            // }
          },
          order: [["time", "ASC"]], // 按照 createdAt 段字降序排列
        }); // 根据houseId, cageId, siteId查找记录

        let flag = 0;
        let timeDate = new Date(time);
        // 格式化要更改成的时间
        // let newTime = time.split(' ')[0] // 格式化日期
        for (let i = 0; i < count.length - 1; i++) {
          // 注意这里的循环条件是length - 1，因为我们要访问next元素
          const current = count[i];
          const next = count[i + 1];

          // 将字符串时间转换为Date对象以便比较
          const currentTime = new Date(current.time);
          const nextTime = new Date(next.time);

          // 检查modifiedTime是否在current.time和next.time之间
          if (timeDate > currentTime && timeDate < nextTime) {
            // 如果modifiedTime位于两个相邻时间之间
            next.death_sum = next.death_sum - youngNum;
            await next.save();
            flag = 1;
            continue;
          }
          //创建之后
          if (flag === 1) {
            next.death_sum = next.death_sum - youngNum;
            await next.save();
          }
        }

        //删除那些天死亡数为0的数据
        let cou = await Count.findOne({
          where: {
            site_id: siteId,
            day_death: 0, // 这里添加了 day_death 等于 0 的条件
          },
        });
        if (cou) {
          await cou.destroy();
        }

        //操作日志
        await Log.create({
          user_id: canghao,
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          log_time: time,
          description: `删除了id为${id}的雏鸽死亡记录`,
        });
        return Result.JsonResponse(200, 200, "删除成功", res, "success");
      }
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.log("删除操作失败", error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/egg/updateHistory:
 *   put:
 *     tags:
 *        - 对单个笼子的接口
 *     summary: 根据参数修改单个笼子的历史数据
 *     description: 修改单个笼子的历史数据
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: UpdList
 *         description: app管理员修改的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/UpdList'
 *     responses:
 *       200:
 *         description: 删除成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   UpdList:
 *     type: object
 *     required:
 *       - operation
 *       - modifiedOperation
 *       - id
 *       - siteId
 *       - houseId
 *       - cageId
 *       - time
 *       - modifiedTime
 *       - number
 *     properties:
 *       operation:
 *         type: string
 *       modifiedOperation:
 *         type: string
 *       id:
 *         type: integer
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       time:
 *         type: string
 *         format: date-time
 *       modifiedTime:
 *         type: string
 *         format: date-time
 *       number:
 *         type: integer
 */
// 删除查蛋页面错误的留窝操作信息，并修改cage表的状态
exports.updateEggList = async (req, res) => {
  //   鸽仓id   鸽舍id   鸽笼id   鸽笼状态
  let {
    operation,
    modifiedOperation,
    id,
    siteId,
    houseId,
    cageId,
    time,
    modifiedTime,
    number,
  } = req.body;

  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    // 定义updateCageStatus函数，用来对鸽笼状态进行修改
    const updateCageStatus = async () => {
      const whippings = await Whipping.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });
      const stays = await Stay.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });
      const puts = await Put.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });
      const cubs = await Cub.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });

      const formatData = [];
      whippings.forEach((whipping) => {
        const whip = {
          time: whipping.whipping_time,
          statu: "抽蛋",
        };
        formatData.push(whip);
      });
      stays.forEach((stay) => {
        const sta = {
          time: stay.stay_time,
          statu: "留窝",
        };
        formatData.push(sta);
      });
      puts.forEach((put) => {
        const pu = {
          time: put.put_time,
          statu: "带仔中",
        };
        formatData.push(pu);
      });
      cubs.forEach((cub) => {
        if (cub.cub_number === 0) {
          const cu = {
            time: cub.cub_time,
            statu: "初始状态",
          };
          formatData.push(cu);
        } else {
          const cu = {
            time: cub.cub_time,
            statu: "带仔中",
          };
          formatData.push(cu);
        }
      });

      if (formatData.length > 0) {
        // 升序排序
        formatData.sort((a, b) => new Date(a.time) - new Date(b.time));

        let flag = 0;
        let time;
        formatData.forEach((data) => {
          if (data.statu === "带仔中") {
            time = new Date(data.time);
            flag = 1;
          } else if (flag === 1) {
            let next = new Date(data.time);
            const timeDiff = next.getTime() - time.getTime();
            const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            if (diffInDays < 25) {
              data.statu = "带仔中";
            } else {
              flag = 0;
            }
          }
        });

        //降序排序
        formatData.sort((a, b) => new Date(b.time) - new Date(a.time));

        return formatData[0].statu;
      } else if (formatData.length === 0) {
        return "初始状态";
      }
    };

    // 解决时区问题
    time = RegionTime.regionTime(time);
    modifiedTime = RegionTime.regionTime(modifiedTime);

    let canghao = req.get("Canghao");
    if (canghao == 0) {
      //分仓操作
      //先进行删除，把原来的删掉
      if (operation === "whipping") {
        await Egg.destroy({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            egg_time: time,
            statu: 1,
          },
        });
        await Whipping.destroy({
          where: {
            id: id,
          },
        });
      } else if (operation === "stay") {
        await Egg.destroy({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            egg_time: time,
            statu: 2,
          },
        });
        await Stay.destroy({
          where: {
            id: id,
          },
        });
      } else if (operation === "put") {
        await Put.destroy({
          where: {
            id: id,
          },
        });
      } else if (operation === "cub") {
        await Cub.destroy({
          where: {
            id: id,
          },
        });
      } else if (operation === "spermatozonia") {
        //光蛋
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
      } else if (operation === "breakage") {
        //破损
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
      } else if (operation === "abandon") {
        //弃仔
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
      } else if (operation === "single") {
        //单蛋
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
      } else if (operation === "discard") {
        //弃孵
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });
      } else if (operation === "death_old") {
        //种鸽死亡
        await Abnormal.destroy({
          where: {
            id: id,
          },
        });

        // 删除种鸽死亡记录
        let death = await Death.findOne({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            time: time,
          },
        });
        let oldNum = death.old_number;

        death.old_number = 0;
        //当雏鸽也不含数据的时候，那条数据便可删除
        if (death.young_number === 0) {
          await death.destroy();
        } else {
          await death.save();
        }

        // 删除统计死亡记录
        let co = await Count.findOne({
          where: {
            site_id: siteId,
            time: time,
          },
        });

        co.death_sum -= oldNum;
        co.day_death -= oldNum;
        await co.save();

        //对统计数据进行删减数据量，复原
        let count = await Count.findAll({
          where: {
            // 查询条件
            site_id: siteId,
            // time: {
            //   [Op.like]: `%${deathTime}%`
            // }
          },
          order: [["time", "ASC"]], // 按照 createdAt 段字降序排列
        }); // 根据houseId, cageId, siteId查找记录

        let flag = 0;
        let timeDate = new Date(time);
        // 格式化要更改成的时间
        // let newTime = time.split(' ')[0] // 格式化日期
        for (let i = 0; i < count.length - 1; i++) {
          // 注意这里的循环条件是length - 1，因为我们要访问next元素
          const current = count[i];
          const next = count[i + 1];

          // 将字符串时间转换为Date对象以便比较
          const currentTime = new Date(current.time);
          const nextTime = new Date(next.time);

          // 检查modifiedTime是否在current.time和next.time之间
          if (timeDate > currentTime && timeDate < nextTime) {
            // 如果modifiedTime位于两个相邻时间之间
            next.death_sum = next.death_sum - oldNum;
            await next.save();
            flag = 1;
            continue;
          }
          //创建之后
          if (flag === 1) {
            next.death_sum = next.death_sum - oldNum;
            await next.save();
          }
        }

        //删除那些天死亡数为0的数据
        let cou = await Count.findOne({
          where: {
            site_id: siteId,
            day_death: 0, // 这里添加了 day_death 等于 0 的条件
          },
        });
        if (cou) {
          await cou.destroy();
        }
      } else if (operation === "death_young") {
        //雏鸽死亡
        // 删除雏鸽死亡记录
        let death = await Death.findOne({
          where: {
            id: id,
          },
        });
        let youngNum = death.young_number;

        death.young_number = 0;
        //当雏鸽也不含数据的时候，那条数据便可删除
        if (death.old_number === 0) {
          await death.destroy();
        } else {
          await death.save();
        }

        // 删除统计死亡记录
        let co = await Count.findOne({
          where: {
            site_id: siteId,
            time: time,
          },
        });

        co.death_sum -= youngNum;
        co.day_death -= youngNum;
        await co.save();

        //对统计数据进行删减数据量，复原
        let count = await Count.findAll({
          where: {
            // 查询条件
            site_id: siteId,
            // time: {
            //   [Op.like]: `%${deathTime}%`
            // }
          },
          order: [["time", "ASC"]], // 按照 createdAt 段字降序排列
        }); // 根据houseId, cageId, siteId查找记录

        let flag = 0;
        let timeDate = new Date(time);
        // 格式化要更改成的时间
        // let newTime = time.split(' ')[0] // 格式化日期
        for (let i = 0; i < count.length - 1; i++) {
          // 注意这里的循环条件是length - 1，因为我们要访问next元素
          const current = count[i];
          const next = count[i + 1];

          // 将字符串时间转换为Date对象以便比较
          const currentTime = new Date(current.time);
          const nextTime = new Date(next.time);

          // 检查modifiedTime是否在current.time和next.time之间
          if (timeDate > currentTime && timeDate < nextTime) {
            // 如果modifiedTime位于两个相邻时间之间
            next.death_sum = next.death_sum - youngNum;
            await next.save();
            flag = 1;
            continue;
          }
          //创建之后
          if (flag === 1) {
            next.death_sum = next.death_sum - youngNum;
            await next.save();
          }
        }

        //删除那些天死亡数为0的数据
        let cou = await Count.findOne({
          where: {
            site_id: siteId,
            day_death: 0, // 这里添加了 day_death 等于 0 的条件
          },
        });
        if (cou) {
          await cou.destroy();
        }
      }

      //再进行插入数据，把要修改的插入
      if (modifiedOperation === "whipping") {
        await Egg.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          egg_time: modifiedTime,
          statu: 1,
        });
        await Whipping.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          whipping_time: modifiedTime,
        });
      } else if (modifiedOperation === "stay") {
        await Egg.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          egg_time: modifiedTime,
          statu: 2,
        });
        await Stay.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          stay_time: modifiedTime,
          statu: 0,
        });
      } else if (modifiedOperation === "put") {
        await Put.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          stay_time: modifiedTime,
          statu: 0,
        });
      } else if (modifiedOperation === "cub") {
        await Cub.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          cub_time: modifiedTime,
          cub_number: number,
        });
      } else if (modifiedOperation === "spermatozonia") {
        //光蛋
        await Abnormal.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          refer: "光蛋",
          time: modifiedTime,
          statu: 1,
        });
      } else if (modifiedOperation === "breakage") {
        //破损
        await Abnormal.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          refer: "破损",
          time: modifiedTime,
          statu: 1,
        });
      } else if (modifiedOperation === "abandon") {
        //弃仔
        await Abnormal.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          refer: "弃仔",
          time: modifiedTime,
          statu: 1,
        });
      } else if (modifiedOperation === "single") {
        //单蛋
        await Abnormal.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          refer: "单蛋",
          time: modifiedTime,
          statu: 1,
        });
      } else if (modifiedOperation === "discard") {
        //弃孵
        await Abnormal.create({
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          refer: "弃孵",
          time: modifiedTime,
          statu: 1,
        });
      } else if (modifiedOperation === "death_old") {
        //种鸽死亡
        //当存在死亡数量时，才需要进行记录
        if (number > 0) {
          await Abnormal.create({
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
            refer: `死亡 种鸽${number}`,
            time: modifiedTime,
            statu: 1,
          });

          //寻找记录
          let death = await Death.findOne({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
              time: modifiedTime,
            },
          });

          //当雏鸽也不含数据的时候，新增
          if (!death) {
            // 创建一条死亡记录
            const death = {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
              old_number: number,
              young_number: 0,
              time: modifiedTime,
            };
            // 将记录保存到数据库
            await Death.create(death);
          } else {
            death.old_number += number;
            await death.save();
          }

          let count = await Count.findAll({
            where: {
              // 查询条件
              site_id: siteId,
              // time: {
              //   [Op.like]: `%${deathTime}%`
              // }
            },
            order: [["time", "ASC"]], // 按照 createdAt 段字降序排列
          }); // 根据houseId, cageId, siteId查找记录

          let modifiedTimeDate = new Date(modifiedTime);
          // 格式化要更改成的时间
          let newDeathTime = modifiedTime.split(" ")[0]; // 格式化日期
          //标记变量
          let flag = 0;
          // 假设 count 是一个数组，我们将使用 for...of 来遍历它
          for (const c of count) {
            //存在当天的数据
            if (c.time.includes(newDeathTime)) {
              c.death_sum += number;
              c.day_death += number;
              await c.save(); // 现在可以在这里使用 await，因为我们处于异步上下文中
              flag = 1;
              break;
            }
          }
          //不存在当天数据
          if (flag === 0) {
            for (let i = 0; i < count.length - 1; i++) {
              // 注意这里的循环条件是length - 1，因为我们要访问next元素
              const current = count[i];
              const next = count[i + 1];
              const last = count[count.length - 1];

              // 将字符串时间转换为Date对象以便比较
              const currentTime = new Date(current.time);
              const nextTime = new Date(next.time);
              const lastTime = new Date(last.time);

              //当时间是最新的时候
              //直接新增
              if (modifiedTimeDate > lastTime) {
                await Count.create({
                  site_id: siteId,
                  death_sum: last.death_sum + number,
                  day_death: number,
                  time: modifiedTime,
                });
                break;
              }

              // 检查modifiedTime是否在current.time和next.time之间
              if (
                modifiedTimeDate > currentTime &&
                modifiedTimeDate < nextTime
              ) {
                // 如果modifiedTime位于两个相邻时间之间
                await Count.create({
                  site_id: siteId,
                  death_sum: current.death_sum + number,
                  day_death: number,
                  time: modifiedTime,
                });
                flag = 2;
              }
              //创建之后
              if (flag === 2) {
                next.death_sum = next.death_sum + number;
                await next.save();
              }
            }
          }
        }
      } else if (modifiedOperation === "death_young") {
        //雏鸽死亡
        //当存在死亡数量时，才需要进行记录
        if (number > 0) {
          //寻找记录
          let death = await Death.findOne({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
              time: modifiedTime,
            },
          });

          //当雏鸽也不含数据的时候，新增
          if (!death) {
            // 创建一条死亡记录
            const death = {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
              old_number: 0,
              young_number: number,
              time: modifiedTime,
            };
            // 将记录保存到数据库
            await Death.create(death);
          } else {
            death.young_number += number;
            await death.save();
          }

          let count = await Count.findAll({
            where: {
              // 查询条件
              site_id: siteId,
              // time: {
              //   [Op.like]: `%${deathTime}%`
              // }
            },
            order: [["time", "ASC"]], // 按照 createdAt 段字降序排列
          }); // 根据houseId, cageId, siteId查找记录

          let modifiedTimeDate = new Date(modifiedTime);
          // 格式化要更改成的时间
          let newDeathTime = modifiedTime.split(" ")[0]; // 格式化日期
          //标记变量
          let flag = 0;
          // 假设 count 是一个数组，我们将使用 for...of 来遍历它
          for (const c of count) {
            //存在当天的数据
            if (c.time.includes(newDeathTime)) {
              c.death_sum += number;
              c.day_death += number;
              await c.save(); // 现在可以在这里使用 await，因为我们处于异步上下文中
              flag = 1;
              break;
            }
          }
          //不存在当天数据
          if (flag === 0) {
            for (let i = 0; i < count.length - 1; i++) {
              // 注意这里的循环条件是length - 1，因为我们要访问next元素
              const current = count[i];
              const next = count[i + 1];
              const last = count[count.length - 1];

              // 将字符串时间转换为Date对象以便比较
              const currentTime = new Date(current.time);
              const nextTime = new Date(next.time);
              const lastTime = new Date(last.time);

              //当时间是最新的时候
              //直接新增
              if (modifiedTimeDate > lastTime) {
                await Count.create({
                  site_id: siteId,
                  death_sum: last.death_sum + number,
                  day_death: number,
                  time: modifiedTime,
                });
                break;
              }

              // 检查modifiedTime是否在current.time和next.time之间
              if (
                modifiedTimeDate > currentTime &&
                modifiedTimeDate < nextTime
              ) {
                // 如果modifiedTime位于两个相邻时间之间
                await Count.create({
                  site_id: siteId,
                  death_sum: current.death_sum + number,
                  day_death: number,
                  time: modifiedTime,
                });
                flag = 2;
              }
              //创建之后
              if (flag === 2) {
                next.death_sum = next.death_sum + number;
                await next.save();
              }
            }
          }
        }
      }

      try {
        // 修改cage表的状态
        const cage = await Cage.findOne({
          where: {
            site_id: siteId,
            house_id: houseId,
            cage_id: cageId,
          },
        });
        if (cage) {
          const cageStatu = await updateCageStatus(); // 确保使用await
          if (cageStatu != null) {
            cage.statu = cageStatu;
            await cage.save(); // 确保使用await
            console.log("已修改cage表状态");
          }
        }
      } catch (error) {
        console.error("更新Cage状态时出错:", error);
        // 这里应该处理错误，可能是通过回滚事务或记录错误日志
      }

      //操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        log_time: modifiedTime,
        description: `进行了${modifiedOperation}操作`,
      });

      return Result.JsonResponse(200, 200, "修改成功", res, "success");
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.log("删除操作失败", error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/egg/delete:
 *   post:
 *     tags:
 *        - 撤销操作接口
 *     summary: 根据参数删除单个笼子的历史数据
 *     description: 删除单个笼子的历史数据
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: DeleteEgg
 *         description: 删除信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/DeleteEgg'
 *     responses:
 *       200:
 *         description: 删除成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   DeleteEgg:
 *     type: object
 *     required:
 *       - operation
 *       - siteId
 *       - houseId
 *       - cageId
 *       - time
 *     properties:
 *       operation:
 *         type: string
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       time:
 *         type: string
 *         format: date-time
 */
exports.deleteEgg = async (req, res) => {
  //   鸽仓id   鸽舍id   鸽笼id   鸽笼状态
  let { operation, siteId, houseId, cageId, time } = req.body;

  try {
    // 定义updateCageStatus函数，用来对鸽笼状态进行修改
    const updateCageStatus = async () => {
      const whippings = await Whipping.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });
      const stays = await Stay.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });
      const puts = await Put.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });
      const cubs = await Cub.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });

      const formatData = [];
      whippings.forEach((whipping) => {
        const whip = {
          time: whipping.whipping_time,
          statu: "抽蛋",
        };
        formatData.push(whip);
      });
      stays.forEach((stay) => {
        const sta = {
          time: stay.stay_time,
          statu: "留窝",
        };
        formatData.push(sta);
      });
      puts.forEach((put) => {
        const pu = {
          time: put.put_time,
          statu: "带仔中",
        };
        formatData.push(pu);
      });
      cubs.forEach((cub) => {
        if (cub.cub_number === 0) {
          const cu = {
            time: cub.cub_time,
            statu: "初始状态",
          };
          formatData.push(cu);
        } else {
          const cu = {
            time: cub.cub_time,
            statu: "带仔中",
          };
          formatData.push(cu);
        }
      });

      if (formatData.length > 1) {
        // 升序排序
        formatData.sort((a, b) => new Date(a.time) - new Date(b.time));

        let flag = 0;
        let time;
        formatData.forEach((data) => {
          if (data.statu === "带仔中") {
            time = new Date(data.time);
            flag = 1;
          } else if (flag === 1) {
            let next = new Date(data.time);
            const timeDiff = next.getTime() - time.getTime();
            const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            if (diffInDays < 25) {
              data.statu = "带仔中";
            } else {
              flag = 0;
            }
          }
        });

        //降序排序
        formatData.sort((a, b) => new Date(b.time) - new Date(a.time));

        return formatData[1].statu;
      } else if (formatData.length === 1) {
        return "初始状态";
      } else {
        return "null";
      }
    };

    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);
    // 解决时区问题
    time = RegionTime.regionTime(time);

    let canghao = req.get("Canghao");
    // if (canghao == 0) {
    //分仓操作
    if (operation === "whipping") {
      //找到最新的记录
      const latestWhipping = await Whipping.findOne({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
        order: [["whipping_time", "DESC"]],
      });

      const whipping = await Whipping.findOne({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          whipping_time: time,
        },
      });
      await Egg.destroy({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          egg_time: time,
          statu: 1,
        },
      });
      if (latestWhipping && latestWhipping.id === whipping.id) {
        // 删除的是最新数据
        try {
          // 修改cage表的状态
          const cage = await Cage.findOne({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });
          if (cage) {
            const cageStatu = await updateCageStatus(); // 确保使用await
            if (cageStatu != null) {
              cage.statu = cageStatu;
              await cage.save(); // 确保使用await
              console.log("已修改cage表状态");
            }
          }
        } catch (error) {
          console.error("更新Cage状态时出错:", error);
          // 这里应该处理错误，可能是通过回滚事务或记录错误日志
        }
      }
      await Whipping.destroy({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          whipping_time: time,
        },
      });

      //操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        log_time: RegionTime.regionTime(new Date().toISOString()),
        description: `删除了id为${whipping.id}的抽蛋记录`,
      });

      return Result.JsonResponse(200, 200, "删除成功", res, "success");
    } else if (operation === "stay") {
      //获取最新的数据
      const latestStay = await Stay.findOne({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
        order: [["stay_time", "DESC"]],
      });
      //获取需要删除的数据
      const stay = await Stay.findOne({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          stay_time: time,
        },
      });

      await Egg.destroy({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          egg_time: time,
          statu: 2,
        },
      });
      if (latestStay && latestStay.id === stay.id) {
        // 删除的是最新数据
        try {
          // 修改cage表的状态
          const cage = await Cage.findOne({
            where: {
              site_id: siteId,
              house_id: houseId,
              cage_id: cageId,
            },
          });
          if (cage) {
            const cageStatu = await updateCageStatus(); // 确保使用await
            if (cageStatu != null) {
              cage.statu = cageStatu;
              await cage.save(); // 确保使用await
              console.log("已修改cage表状态");
            }
          }
        } catch (error) {
          console.error("更新Cage状态时出错:", error);
          // 这里应该处理错误，可能是通过回滚事务或记录错误日志
        }
      }
      await Stay.destroy({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          stay_time: time,
        },
      });

      //操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        log_time: RegionTime.regionTime(new Date().toISOString()),
        description: `删除了id为${stay.id}的留窝记录`,
      });

      return Result.JsonResponse(200, 200, "删除成功", res, "success");
    }
    // } else {
    //   return Result.JsonResponse(
    //     404,
    //     404,
    //     "操作失败，鸽仓号不匹配！",
    //     res,
    //     "error"
    //   );
    // }
  } catch (error) {
    console.log("删除操作失败", error);
    return Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/put/list:
 *   get:
 *     tags:
 *        - 放仔接口
 *     summary: 预放仔名单
 *     description: 返回超过18天的留窝数据
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - name: siteId
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: page
 *         in: query
 *         description: 当前页数
 *         required: true
 *         schema:
 *           type: integer
 *       - name: pageSize
 *         in: query
 *         description: 每页返回的页数
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 返回成功
 *       500:
 *         description: 请求体格式不正确或缺少必要的字段
 */
exports.putList = async (req, res) => {
  try {
    let { siteId, page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    let canghao = req.get("Canghao");
    if (canghao == 0 || canghao == siteId) {
      const now = new Date();
      now.setHours(now.getHours() + 8); // 当前时间

      let eggs = await Egg.findAll({
        attributes: ["site_id", "house_id", "cage_id", "egg_time", "statu"],
        where: {
          [sequelize.Op.and]: [
            sequelize.literal(`egg_time IN (
        SELECT MAX(egg_time)
        FROM egg
        WHERE statu = 2 and site_id = ${siteId}
        GROUP BY site_id, house_id, cage_id
      )`),
            { site_id: siteId }, // 添加额外的条件 site_id = siteId
          ],
        },
        raw: true,
        // limit: parseInt(pageSize),
        // offset: offset
      });

      const nfcIds = await Promise.all(
        eggs.map(async (egg) => {
          return await HouseId.getNFCId(egg.site_Id, egg.house_id);
        })
      );

      const flags = await Promise.all(
        eggs.map(async (egg) => {
          const site_id = egg.site_id;
          const house_id = egg.house_id;
          const cage_id = egg.cage_id;
          let put = await Put.findOne({
            where: {
              site_id: site_id,
              house_id: house_id,
              cage_id: cage_id,
            },
            order: [["put_time", "DESC"]],
          });
          if (put) {
            const putDate = new Date(put.put_time);
            const timeDiff = now.getTime() - putDate.getTime();
            const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
            return diffInDays;
          } else {
            return null;
          }
        })
      );

      let puts = eggs
        .map((egg, index) => {
          const eggDate = new Date(egg.egg_time);
          const timeDiff = now.getTime() - eggDate.getTime();
          const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
          // if (diffInDays >= 18) {
          if (
            diffInDays >= 1 &&
            (diffInDays < flags[index] || flags[index] === null)
          ) {
            console.log(eggDate);
            return {
              site_id: egg.site_id,
              nfc_id: nfcIds[index],
              house_id: egg.house_id,
              cage_id: egg.cage_id,
              choosed: false,
              isSelected: false,
              put_number: 4,
              put_time: now,
            };
          }
          return null;
        })
        .filter((egg) => egg !== null);

      // 分页处理
      const paginatedPuts = puts.slice(offset, offset + parseInt(pageSize));

      if (puts.length > 0) {
        return res.status(200).json({
          code: 200,
          msg: "查询成功",
          data: paginatedPuts,
          totalCount: puts.length,
          type: "success",
        });
      } else {
        return res.status(200).json({
          code: 200,
          msg: "查询成功",
          data: [],
          type: "success",
        });
      }
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/out/save:
 *   post:
 *     tags:
 *        - 淘汰信息记录接口
 *     summary: 淘汰信息登记功能
 *     description: 记录淘汰和异常的信息和日期
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: header
 *         name: userId
 *         description: 用户ID
 *         required: true
 *         type: integer
 *       - in: body
 *         name: Out
 *         description: 要记录的信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Out'
 *     responses:
 *       200:
 *         description: 记录成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

/**
 * @swagger
 * definitions:
 *   Out:
 *     type: object
 *     required:
 *       - siteId
 *       - houseId
 *       - cageId
 *       - outTime
 *     properties:
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: string
 *       cageId:
 *         type: integer
 *       outTime:
 *         type: string
 *         format: date-time
 */
//
exports.addOut = async (req, res) => {
  //    鸽仓号  鸽笼号   鸽舍号   淘汰时间
  let { siteId, cageId, houseId, outTime } = req.body;

  // 解决时区问题
  const realOutTime = RegionTime.regionTime(outTime);
  try {
    // 从数据库获取nfc对用的鸽舍号
    houseId = await HouseId.getHouseId(houseId);

    let canghao = req.get("Canghao");
    if (canghao == siteId || canghao == 0) {
      //分仓操作

      // 判断没有处理的死亡异常时候大于两条
      let count = await Abnormal.count({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
          statu: 0,
          refer: {
            [Op.like]: "%淘汰%",
          },
        },
      });

      if (count >= 2) {
        return Result.JsonResponse(200, 404, "已记录多次死亡", res, "warning");
      }

      // 创建一条淘汰记录
      const out = {
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        out_time: realOutTime,
      };

      // 将记录保存到数据库
      await Out.create(out).then(() => {
        console.log("已记录death表");
      });

      await Abnormal.create({
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        refer: "淘汰",
        time: realOutTime,
        statu: 0,
      });

      // 操作日志
      await Log.create({
        user_id: canghao,
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        log_time: realOutTime,
        description: `新增了id为${out.id}的淘汰记录`,
      });

      return Result.JsonResponse(200, 200, "已记录", res, "success");
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    Result.JsonResponse(500, 500, "网络连接错误", res, "error");
  }
};

/**
 * @swagger
 * /app/cage/statuAndAbnormal:
 *  get:
 *   tags:
 *     - 鸽笼状态和异常接口
 *   description: 获取cage表的状态以及异常情况
 *   parameters:
 *     - name: siteId
 *       in: query
 *       description: 鸽仓号
 *       required: false
 *     - name: houseId
 *       in: query
 *       description: 鸽舍号
 *       required: false
 *     - name: cageId
 *       in: query
 *       description: 鸽笼号
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */

exports.getStatuAndAbnormal = async (req, res) => {
  //      鸽仓id   鸽舍id, 鸽笼id
  let { siteId, houseId, cageId } = req.query;
  const canghao = req.get("Canghao");
  console.log("canghao:", canghao);
  try {
    if (!canghao) {
      return Result.JsonResponse(401, 401, "请先登录", res, "error");
    }

    if (canghao == siteId || canghao == 0) {
      // 从数据库获取nfc对用的鸽舍号
      houseId = await HouseId.getHouseId(houseId);

      let cage = await Cage.findOne({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
      });

      let abnormals = await Abnormal.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
        order: [["time", "DESC"]],
      });

      let deaths = await Death.findAll({
        where: {
          site_id: siteId,
          house_id: houseId,
          cage_id: cageId,
        },
        order: [["time", "DESC"]],
      });

      let newAbnormals = [];

      abnormals.forEach((abnormal) => {
        if (abnormal.refer === "单蛋") {
          newAbnormals.push("single");
        } else if (abnormal.refer === "光蛋") {
          newAbnormals.push("spermatozonia");
        } else if (abnormal.refer === "破损") {
          newAbnormals.push("breakage");
        } else if (abnormal.refer === "弃仔") {
          newAbnormals.push("abandon");
        } else if (abnormal.refer === "弃孵") {
          newAbnormals.push("discard");
        }
      });

      deaths.forEach((death) => {
        if (death.old_number > 0) {
          newAbnormals.push("death_old" + death.old_number);
        }
        if (death.young_number > 0) {
          newAbnormals.push("death_young" + death.young_number);
        }
      });
      if (cage) {
        return res.status(200).json({
          code: 200,
          msg: "查询成功",
          statu: cage.statu,
          abnormals: newAbnormals,
          type: "success",
        }); //成功查找到cage，则返回statu属性值
      } else {
        return Result.JsonResponse(200, 404, "未找到该鸽笼", res, "warning"); //未找到对应的cage记录
      }
    } else {
      return Result.JsonResponse(
        404,
        404,
        "操作失败，鸽仓号不匹配！",
        res,
        "error"
      );
    }
  } catch (error) {
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /app/cage/cageDetail:
 *   get:
 *     tags:
 *       - 鸽笼信息接口
 *     summary: 获取各鸽舍里所有鸽笼的数据
 *     description: 获取cage表中相同鸽舍的全部数据
 *     parameters:
 *       - name: siteId
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: houseId
 *         in: query
 *         description: 鸽舍ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回cage表里相同鸽舍的全部数据
 *         schema:
 *           type: object
 *           properties:
 *             cages:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Cage'
 *       500:
 *         description: 获取失败
 */

exports.getCageDetail = async (req, res) => {
  try {
    let { siteId, houseId } = req.query;
    // 从数据库获取nfc对用的鸽舍号
    // houseId = await HouseId.notExist(siteId, houseId);
    houseId = await HouseId.getHouseId(houseId);

    // 根据 site_id 和 house_id 查询符合条件的数据
    const cages = await Cage.findAll({
      where: {
        site_id: siteId,
        house_id: houseId,
        statu: {
          [Op.in]: ["预抽蛋", "抽蛋", "带仔中", "留窝", "初始状态"],
        },
      },
      order: [["cage_id", "ASC"]],
    });

    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      cages: cages,
      type: "success",
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error");
  }
};

/**
 * @swagger
 * /app/user/save:
 *   post:
 *     tags:
 *       - 用户操作接口
 *     summary: 新增用户功能
 *     description: 新增用户User
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: User
 *         description: 要新增的用户信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: 用户新增成功
 *       409:
 *         description: 用户已存在
 *       500:
 *         description: 用户添加失败
 */
exports.addUser = async (req, res) => {
  const { role, username, password } = req.body;
  const userId = req.get("userId");
  try {
    //如果是超级管理员
    if (userId === 1) {
      // 检查user是否已经存在
      const existingUser = await User.findOne({
        where: {
          username: username,
        },
      });

      if (existingUser) {
        res.status(409).json({
          error: "用户已存在",
        });
      } else {
        // 创建新的user
        const user = await User.create({
          role: role,
          username: username,
          password: password,
        });
        res.status(200).json({
          user,
        });
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "用户添加失败",
    });
  }
};
/**
 * @swagger
 * /app/user/update:
 *   put:
 *     tags:
 *       - 用户操作接口
 *     summary: 修改用户功能
 *     description: 根据用户名username修改用户信息
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: 需要修改的用户信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/User'
 *     responses:
 *       200:
 *         description: 用户修改成功
 *       500:
 *         description: 用户修改失败
 *       404:
 *         description: 没有找到对应的用户
 */

exports.updateUser = async (req, res) => {
  try {
    // 从请求体中获取需要修改的用户信息
    const modifiedUser = req.body;
    const userId = req.get("userId");
    //如果是管理员
    if (userId === 0) {
      // 根据id参数找到对应的用户记录
      const user = await User.findOne({
        where: {
          username: modifiedUser.username,
        },
      });

      if (!user) {
        // 如果查询结果为空，返回404状态码
        return res.status(404).json({
          error: "没有找到对应的用户",
        });
      }

      // 更新user信息
      Object.assign(user, modifiedUser);

      // 保存修改后的user记录
      await user.save();

      // 返回修改后的cage信息
      res.status(200).json({
        user,
      });
    } else {
      return res.status(404).json({
        error: "无权限",
      });
    }
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "用户修改失败",
    });
  }
};

/**
 * @swagger
 * /app/houseId/update:
 *   post:
 *     summary: 修改卡号
 *     description: 输入仓号、舍号和卡号，修改对应仓号的卡号信息
 *     tags:
 *       - Card
 *     parameters:
 *       - in: body
 *         name: cardInfo
 *         description: 仓号、舍号和卡号信息
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             siteId:
 *               type: integer
 *             houseId:
 *               type: integer
 *             nfcId:
 *               type: string
 *     responses:
 *       200:
 *         description: 成功修改卡号
 *         schema:
 *           type: object
 *           properties:
 *             msg:
 *               type: string
 *             data:
 *               $ref: '#/definitions/House'
 *       404:
 *         description: 没有找到对应的卡号
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 *       500:
 *         description: 修改卡号失败
 *         schema:
 *           type: object
 *           properties:
 *             error:
 *               type: string
 */

// 修改卡号 2024年5月11日 hb
exports.updateCard = async (req, res) => {
  // 输入仓号 舍号 卡号
  let { siteId, houseId, nfcId } = req.body;
  try {
    // console.log(req.body);

    //  判断是否已存在卡号
    const nfc = await House.findOne({
      where: {
        nfc_id: nfcId,
      },
    });
    if (nfc) {
      // 已存在卡号
      return res.status(404).json({
        error: "已存在卡号，请勿重复添加",
      });
    }

    const house = await House.findOne({
      where: {
        // site_id: siteId,
        house_id: houseId,
      },
    });
    if (!house) {
      // 如果查询结果为空，返回404状态码
      return res.status(404).json({
        error: "没有找到对应的鸽舍",
      });
    }
    const newHouse = await house.update({ house_id: houseId, nfc_id: nfcId });
    res.status(200).json({
      msg: "修改卡号成功",
      data: newHouse,
    });
  } catch (error) {
    console.log(error);
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "修改卡号失败",
    });
  }
};

// 新增鸽舍
exports.addHouse = async (req, res) => {
  const { siteId, nfcId } = req.body;
  try {
    // console.log("siteId:" + siteId + " houseId:" + houseId);
    let house = await House.findOne({
      where: {
        nfc_id: nfcId,
      },
    });
    console.log(house);
    // 如果不存在，就新增一个nfcid，使用新增的这个对象
    if (!house) {
      // 找到site_id=siteId的houseId最大的那个值
      let { maxHouseId } = await House.findOne({
        attributes: [
          [sequelize.fn("max", sequelize.col("house_id")), "maxHouseId"],
        ],
        // where: {
        //   site_id: siteId,
        // },
        raw: true,
      });

      console.log(maxHouseId);
      //如果是新仓，从1开始
      maxHouseId = maxHouseId ? maxHouseId + 1 : 1;
      console.log(maxHouseId);
      await House.create({
        site_id: siteId,
        nfc_id: nfcId,
        house_id: maxHouseId,
      }).then(() => {
        console.log("已记录house表");
      });

      house = await House.findOne({
        where: {
          nfc_id: nfcId,
        },
      });
    }
    // console.log(house.house_id)
    return res.status(200).json({ code: 200, msg: "新增鸽舍成功", house });
  } catch (error) {
    console.error(error);
    console.log("nfcId映射错误");
    return res.status(500).json({ code: 500, msg: "新增鸽舍失败" });
  }
};
