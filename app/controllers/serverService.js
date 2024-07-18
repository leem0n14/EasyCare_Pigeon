const db = require("../models");
const moment = require("moment-timezone");
const path = require("path");
const fs = require("fs");
const { exec } = require("child_process");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Result = require("../utils/response");
const { log } = require("console");
const Egg = db.egg;
const Cage = db.cage;
const Put = db.put;
const Whipping = db.whipping;
const House = db.house;
const Count = db.count;
const Cub = db.cub;
const Death = db.death;
const Abnormal = db.abnormal;
const Stay = db.stay;
const Sum = db.sum;
const User = db.user;
const Log = db.log;
const Op = db.Sequelize.Op;
const sequelize = db.Sequelize;
//const Mature = db.mature

//abnormal
/**
 * @swagger
 * definitions:
 *   sAbnormal:
 *     type: object
 *     required:
 *       - siteId
 *       - houseId
 *       - cageId
 *       - refer
 *       - time
 *       - statu
 *     properties:
 *       id:
 *         type: integer
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: integer
 *       cageId:
 *         type: integer
 *       refer:
 *         type: string
 *       time:
 *         type: date_time
 *       statu:
 *         type: integer
 */

//sum
/**
 * @swagger
 * definitions:
 *   Sum:
 *     type: object
 *     required:
 *       - cubDeathSum
 *       - matureSum
 *       - time
 *     properties:
 *       siteId:
 *         type: integer
 *       cubDeathSum:
 *         type: integer
 *       matureSum:
 *         type: integer
 *       time:
 *         type: date-time
 */

//stay
/**
 * @swagger
 * definitions:
 *   Stay:
 *     type: object
 *     required:
 *       - houseId
 *       - cageId
 *       - stayTime
 *     properties:
 *       id:
 *         type: integer
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: integer
 *       cageId:
 *         type: integer
 *       stayTime:
 *         type: string
 *         format: date-time
 */

//Cage
/**
 * @swagger
 * definitions:
 *   Cage:
 *     type: object
 *     required:
 *       - siteId
 *       - houseId
 *       - cageId
 *       - number
 *       - statu
 *     properties:
 *       id:
 *         type: integer
 *       siteId:
 *         type: integer
 *       houseId:
 *         type: integer
 *       cageId:
 *         type: integer
 *       number:
 *         type: integer
 *       statu:
 *         type: string
 *       cubNumber:
 *         type: integer
 */

//Count
/**
 * @swagger
 * definitions:
 *   Count:
 *     type: object
 *     required:
 *       - siteId
 *       - deathSum
 *       - time
 *     properties:
 *       id:
 *        type: integer
 *       siteId:
 *        type: integer
 *       deathSum:
 *        type: integer
 *       time:
 *        type: string
 *        format: date-time
 */

//User
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

/**
 * @swagger
 * /sys/count/info/{id}:
 *   get:
 *     tags:
 *       - 鸽舍数据统计接口
 *     summary: 根据id获取鸽舍数据统计详情
 *     description: 根据id查询count表中对应的数据记录
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 数据统计的id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功返回鸽舍数据统计详情
 *         schema:
 *           $ref: '#/definitions/Count'
 *       404:
 *         description: 未找到对应id的数据统计
 *       500:
 *         description: 获取失败
 */

exports.getCountInfo = async (req, res) => {
  const { id } = req.params;
  try {
    // 根据id查询death记录
    const count = await Count.findOne({
      where: {
        id,
      },
    });
    if (count) {
      // 返回查询结果
      res.status(200).json(count);
    } else {
      // 没有找到对应id的死亡记录
      res.status(404).json({
        error: "未找到对应id的数据统计",
      });
    }
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "获取数据统计失败",
    });
  }
};

/**
 * @swagger
 * /sys/count/list:
 *   get:
 *     tags:
 *       - 鸽舍数据统计接口
 *     summary: 获取鸽舍数据统计列表
 *     description: 获取count表的数据
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
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
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回鸽舍数据统计列表
 *         schema:
 *           type: object
 *           properties:
 *             count:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Count'
 *       500:
 *         description: 获取失败
 */

exports.getCountList = async (req, res) => {
  try {
    const { page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    // 查询符合条件的总记录数
    const totalCount = await Count.count();
    // 查询所有count记录
    const { site_id } = req.query;

    // 根据 site_id查询符合条件的数据
    const count = await Count.findAll({
      where: {
        site_id,
      },
      order: [["time", "DESC"]],
      limit: parseInt(pageSize),
      offset: offset,
    });
    // 返回查询结果和总记录数
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      count: count,
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
 * /sys/death/info/{id}:
 *   get:
 *     tags:
 *       - 鸽舍死亡接口
 *     summary: 根据id获取鸽舍死亡详情
 *     description: 根据id查询death表中对应的数据记录
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         description: 死亡记录的id
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: 成功返回鸽舍死亡详情
 *         schema:
 *           $ref: '#/definitions/Death'
 *       404:
 *         description: 未找到对应id的死亡记录
 *       500:
 *         description: 获取失败
 */

exports.getDeathInfo = async (req, res) => {
  const { id } = req.params;
  try {
    // 根据id查询death记录
    const death = await Death.findOne({
      where: {
        id,
      },
    });
    if (death) {
      // 返回查询结果
      res.status(200).json(death);
    } else {
      // 没有找到对应id的死亡记录
      res.status(404).json({
        error: "未找到对应id的死亡记录",
      });
    }
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "获取死亡记录失败",
    });
  }
};

/**
 * @swagger
 * /sys/death/list:
 *   get:
 *     tags:
 *       - 鸽舍死亡接口
 *     summary: 获取鸽舍死亡列表
 *     description: 获取death表的数据
 *     parameters:
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
 *         description: 成功返回鸽舍死亡列表
 *         schema:
 *           type: object
 *           properties:
 *             death:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Death'
 *       500:
 *         description: 获取失败
 */

exports.getDeathList = async (req, res) => {
  try {
    const { page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    // 查询符合条件的总记录数
    const totalCount = await Death.count();
    // 查询所有death记录
    const death = await Death.findAll({
      order: [["house_id", "ASC"]],
      limit: parseInt(pageSize),
      offset: offset,
    });
    // 返回查询结果和总记录数
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      death: death,
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
 * /sys/abnormal/typeProportion:
 *   get:
 *     tags:
 *       - 鸽子养殖数据比例接口
 *     summary: 获取abnormal表里各异常类型的数量
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
 *             死亡:
 *               type: integer
 *               description: 种鸽死亡的数量
 *       500:
 *         description: 获取失败
 */
exports.getTypeProportion = async (req, res) => {
  try {
    const { site_id } = req.query;
    const spermatozoniaCount = await Abnormal.count({
      where: {
        refer: {
          [Op.eq]: "光蛋",
        },
        site_id,
      },
    });

    const breakageCount = await Abnormal.count({
      where: {
        refer: {
          [Op.eq]: "破损",
        },
        site_id,
      },
    });

    const abandonCount = await Abnormal.count({
      where: {
        refer: {
          [Op.eq]: "弃仔",
        },
        site_id,
      },
    });

    const singleCount = await Abnormal.count({
      where: {
        refer: {
          // [Op.eq]: '无精'
          [Op.eq]: "单蛋",
        },
        site_id,
      },
    });

    const discardCount = await Abnormal.count({
      where: {
        refer: {
          [Op.eq]: "弃孵",
        },
        site_id,
      },
    });
    const deathCount = await Abnormal.count({
      where: {
        refer: {
          [Op.like]: "%死亡%",
        },
        site_id,
      },
    });

    res.status(200).json({
      spermatozoniaCount, //光蛋
      breakageCount, //破损
      abandonCount, //弃仔
      singleCount, //单蛋
      discardCount, //弃孵
      deathCount, //死亡
    });
  } catch (error) {
    res.status(500).json({
      error: "获取数据数量失败",
    });
  }
};

/**
 * @swagger
 * /sys/abnormal/delete/{id}:
 *   delete:
 *     tags:
 *       - 鸽舍异常接口
 *     summary: PC删除指定id的鸽舍异常情况记录
 *     description: 根据id删除abnormal表中的数据
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 鸽舍异常情况ID
 *         schema:
 *           type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功删除该id对应的鸽舍异常情况记录
 *         schema:
 *           $ref: '#/definitions/Abnormal'
 *       404:
 *         description: 没有找到待删除的鸽舍异常情况记录
 *       500:
 *         description: 删除失败
 */
/**
 * @swagger
 * /app/abnormal/delete/{id}:
 *   delete:
 *     tags:
 *       - 鸽舍异常接口
 *     summary: APP删除指定id的鸽舍异常情况记录
 *     description: 根据id删除abnormal表中的数据
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 鸽舍异常情况ID
 *         schema:
 *           type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功删除该id对应的鸽舍异常情况记录
 *         schema:
 *           $ref: '#/definitions/sAbnormal'
 *       404:
 *         description: 没有找到待删除的鸽舍异常情况记录
 *       500:
 *         description: 删除失败
 */
exports.deleteAbnormalById = async (req, res) => {
  try {
    // 从请求路径中获取id参数
    const { id } = req.params;
    // 查询对应id的abnormal记录
    const abnormal = await Abnormal.findByPk(id);
    if (!abnormal) {
      // 如果查询结果为空，返回404状态码
      res.status(404).json({
        error: "没有找到待删除的鸽舍异常情况记录",
      });
    } else {
      // 如果查询结果不为空，删除该条记录
      await abnormal.destroy();
      res.status(200).json({
        message: `ID为 ${id} 的鸽舍异常情况记录已成功删除`,
      });
    }
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "删除鸽舍异常情况记录失败",
    });
  }
};

/**
 * @swagger
 * /sys/abnormal/update:
 *   put:
 *     tags:
 *       - 鸽舍异常接口
 *     summary: PC修改鸽舍异常情况功能
 *     description: 根据id修改鸽舍异常情况记录
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: abnormal
 *         description: 需要修改的鸽舍异常情况信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Abnormal'
 *     responses:
 *       200:
 *         description: 修改成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 *       404:
 *         description: 没有找到对应的鸽舍异常情况记录
 */

/**
 * @swagger
 * /app/abnormal/update:
 *   put:
 *     tags:
 *       - 鸽舍异常接口
 *     summary: App修改鸽舍异常情况功能(需要传递abnormal的完整字段包括id)
 *     description: 根据id修改鸽舍异常情况记录
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: abnormal
 *         description: 需要修改的鸽舍异常情况信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/sAbnormal'
 *     responses:
 *       200:
 *         description: 修改成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 *       404:
 *         description: 没有找到对应的鸽舍异常情况记录
 */
exports.updateAbnormal = async (req, res) => {
  try {
    // 从请求体中获取需要修改的鸽舍异常情况信息
    const modifiedAbnormal = req.body;

    // 根据id参数找到对应的鸽舍异常情况记录
    const abnormal = await Abnormal.findByPk(modifiedAbnormal.id);

    if (!abnormal) {
      // 如果查询结果为空，返回404状态码
      return res.status(404).json({
        error: "没有找到对应的鸽舍异常情况记录",
      });
    }

    // 更新abnormal信息
    Object.assign(abnormal, modifiedAbnormal);

    // 保存修改后的abnormal记录
    await abnormal.save();

    // 返回修改后的abnormal信息
    return res.status(200).json({
      code: 200,
      msg: "修改成功",
      abnormal,
      type: "success",
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    console.error(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};

/**
 * @swagger
 * /sys/abnormal/info:
 *   get:
 *     tags:
 *       - 鸽舍异常接口
 *     summary: 根据id获取鸽舍异常情况详情
 *     description: 根据id查询abnormal表中对应的数据记录
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: house_id
 *         in: query
 *         description: 鸽舍ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: cage_id
 *         in: query
 *         description: 鸽笼ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 成功返回鸽舍异常情况详情
 *         schema:
 *           $ref: '#/definitions/sAbnormal'
 *       404:
 *         description: 未找到对应id的异常记录
 *       500:
 *         description: 获取失败
 */

exports.getAbnormalInfo = async (req, res) => {
  const { site_id, house_id, cage_id } = req.query;
  try {
    // 根据id查询abnormal记录
    const abnormal = await Abnormal.findOne({
      where: {
        site_id,
        house_id,
        cage_id,
      },
    });
    if (abnormal) {
      // 返回查询结果
      res.status(200).json(abnormal);
    } else {
      // 没有找到对应id的异常记录
      res.status(404).json({
        error: "未找到对应id的异常记录",
      });
    }
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "获取异常记录失败",
    });
  }
};

/**
 * @swagger
 * /sys/abnormal/list:
 *   get:
 *     tags:
 *       - 鸽舍异常接口
 *     summary: PC获取鸽舍异常情况列表
 *     description: 获取abnormal表中当天的数据记录
 *     parameters:
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
 *         description: 成功返回鸽舍异常情况列表
 *         schema:
 *           type: object
 *           properties:
 *             abnormal:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Abnormal'
 *       500:
 *         description: 获取失败
 */

/**
 * @swagger
 * /app/abnormal/list:
 *   get:
 *     tags:
 *       - 鸽舍异常接口
 *     summary: App获取鸽舍异常情况列表
 *     description: 获取abnormal表中当天的数据记录
 *     parameters:
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
 *         description: 成功返回鸽舍异常情况列表
 *         schema:
 *           type: object
 *           properties:
 *             abnormal:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/sAbnormal'
 *       500:
 *         description: 获取失败
 */
exports.getAbnormalList = async (req, res) => {
  try {
    // 查询所有abnormal记录
    const { page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    // 查询符合条件的总记录数
    const totalCount = await Abnormal.count();

    // 查询当天的需要抽蛋的egg记录，并进行分页
    const abnormal = await Abnormal.findAll({
      order: [["time", "DESC"]],
      limit: parseInt(pageSize),
      offset: offset,
    });
    // 返回查询结果和总记录数
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      abnormal: abnormal,
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
 * /sys/abnormal/type:
 *  get:
 *   tags:
 *     - 鸽舍异常接口
 *   description: 获取abnormal表中异常各种数量
 *   parameters:
 *     - name: name
 *       in: query
 *       description: 鸽舍种类名
 *       required: false
 *   responses:
 *     '200':
 *       description: successful operation
 *     '400':
 *       description: Invalid name value
 */
exports.getAbnormalNum = async (req, res) => {
  const abnormalName = req.query.name;

  // 查询鸽舍异常各种数量
  await Abnormal.count({
    where: {
      refer: {
        [Op.like]: `%${abnormalName}%`,
      },
    },
  })
    .then((count) => {
      // 返回查询结果
      res.status(200).json({
        count,
      });
    })
    .catch((error) => {
      // 捕获异常，返回错误信息
      res.status(500).json({
        error: `获取鸽舍异常种类数失败, ${error}`,
      });
    });
};

/**
 * @swagger
 * /sys/stayList/list:
 *   get:
 *     tags:
 *       - 打印接口
 *     summary: 获取鸽子预放仔列表
 *     description: 获取stay表中的数据记录
 *     parameters:
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
 *         description: 成功返回的鸽子预放仔列表
 *         schema:
 *           type: object
 *           properties:
 *             whippings:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Stay'
 *       500:
 *         description: 获取失败
 */
exports.getStayList = async (req, res) => {
  try {
    const { page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    const today = new Date();
    today.setHours(8, 0, 0, 0); // 设置时间为当天的零点,因为是UTF-8所以要设置成8.00才会变成0点

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // 设置时间为第二天的零点

    //查询总记录数
    const totalCount = await Stay.count();

    // 查询当天的预放仔记录
    const stays = await Stay.findAll({
      /* where: {
        stay_time: {
          [Op.between]: [today, tomorrow],
        },
      }, */
      order: [["stay_time", "DESC"]],
      limit: parseInt(pageSize),
      offset: offset,
    });
    // 返回查询结果和总记录数
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      totalCount: totalCount,
      stays: stays,
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
 * /sys/abnormalList/list:
 *   get:
 *     tags:
 *       - 当天数据接口
 *     summary: 获取当天鸽笼异常列表
 *     description: 获取abnormal表中当天的数据记录
 *     parameters:
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
 *         description: 成功返回当天的鸽笼异常列表
 *         schema:
 *           type: object
 *           properties:
 *             whippings:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Abnormal'
 *       500:
 *         description: 获取失败
 */

exports.getTodayAbnormalList = async (req, res) => {
  try {
    // 查询所有abnormal记录
    const { page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    // 查询符合条件的总记录数
    const totalCount = await Abnormal.count();

    const today = new Date();
    today.setHours(8, 0, 0, 0); // 设置时间为当天的零点,因为是UTF-8所以要设置成8.00才会变成0点

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // 设置时间为第二天的零点
    // 查询当天的预放仔记录
    const abnormals = await Abnormal.findAll({
      where: {
        time: {
          [Op.between]: [today, tomorrow],
        },
      },
      order: [["time", "DESC"]],
      limit: parseInt(pageSize),
      offset: offset,
    });
    // 返回查询结果和总记录数
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      abnormals: abnormals,
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
 * /sys/egg/eggTrend:
 *   get:
 *     tags:
 *       - 操作趋势
 *     summary: 获取产蛋操作的趋势
 *     description: 根据site_id获取egg表的数据记录
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
 *         description: 成功返回产蛋列表
 *         schema:
 *           type: object
 *           properties:
 *             eggs:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getEggTrend = async (req, res) => {
  try {
    const { site_id } = req.query;

    const eggs = await Egg.findAll({
      attributes: [
        "site_id",
        [sequelize.fn("date", sequelize.col("egg_time")), "date"],
        [sequelize.fn("count", "*"), "count"],
      ],
      where: {
        site_id,
      },
      group: ["site_id", "date"],
      order: [[sequelize.literal("date ASC")]],
    });

    let sum = 0;
    // 格式化数据，包括site_id和每天的数据条数
    const eggsTrend = eggs.map((egg) => ({
      site_id: egg.site_id,
      date: egg.get("date"),
      count: egg.get("count"),
      sum: (sum = sum + egg.get("count")),
    }));

    //修改排序规则
    eggsTrend.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      eggsTrend,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "获取产蛋表列表失败",
    });
  }
};

/**
 * @swagger
 * /sys/stay/stayTrend:
 *   get:
 *     tags:
 *       - 操作趋势
 *     summary: 获取留窝操作的趋势
 *     description: 根据site_id获取stay表的数据记录
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
 *         description: 成功返回留窝列表
 *         schema:
 *           type: object
 *           properties:
 *             stays:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */

exports.getStayTrend = async (req, res) => {
  try {
    const { site_id } = req.query;

    const stays = await Stay.findAll({
      attributes: [
        "site_id",
        [sequelize.fn("date", sequelize.col("stay_time")), "date"],
        [sequelize.fn("count", "*"), "count"],
      ],
      where: {
        site_id,
      },
      group: ["site_id", "date"],
      order: [[sequelize.literal("date ASC")]],
    });

    let sum = 0;
    // 格式化数据，包括site_id和每天的数据条数
    const staysTrend = stays.map((stay) => ({
      site_id: stay.site_id,
      date: stay.get("date"),
      count: stay.get("count"),
      sum: (sum = sum + stay.get("count")),
    }));

    //修改排序规则
    staysTrend.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      staysTrend,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "获取调仔表列表失败",
    });
  }
};

/**
 * @swagger
 * /sys/cub/cubTrend:
 *   get:
 *     tags:
 *       - 操作趋势
 *     summary: 获取调仔操作的趋势
 *     description: 根据site_id获取cub表的数据记录
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
 *         description: 成功返回调仔列表
 *         schema:
 *           type: object
 *           properties:
 *             cubs:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getCubTrend = async (req, res) => {
  try {
    const { site_id } = req.query;

    const cubs = await Cub.findAll({
      attributes: [
        "site_id",
        [sequelize.fn("date", sequelize.col("cub_time")), "date"],
        [sequelize.fn("count", "*"), "count"],
      ],
      where: {
        site_id,
      },
      group: ["site_id", "date"],
      order: [[sequelize.literal("date ASC")]],
    });

    let sum = 0;
    // 格式化数据，包括site_id和每天的数据条数
    const cubsTrend = cubs.map((cub) => ({
      site_id: cub.site_id,
      date: cub.get("date"),
      count: cub.get("count"),
      sum: (sum = sum + cub.get("count")),
    }));

    //修改排序规则
    cubsTrend.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      cubsTrend,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "获取调仔表列表失败",
    });
  }
};

/**
 * @swagger
 * /sys/put/putTrend:
 *   get:
 *     tags:
 *       - 操作趋势
 *     summary: 获取放仔操作的趋势
 *     description: 根据site_id获取put表的数据记录
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
 *         description: 成功返回放仔列表
 *         schema:
 *           type: object
 *           properties:
 *             puts:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getPutTrend = async (req, res) => {
  try {
    const { site_id } = req.query;

    const puts = await Put.findAll({
      attributes: [
        "site_id",
        [sequelize.fn("date", sequelize.col("put_time")), "date"],
        [sequelize.fn("count", "*"), "count"],
      ],
      where: {
        site_id,
      },
      group: ["site_id", "date"],
      order: [[sequelize.literal("date ASC")]],
    });

    let sum = 0;
    // 格式化数据，包括site_id和每天的数据条数
    const putsTrend = puts.map((put) => ({
      site_id: put.site_id,
      date: put.get("date"),
      count: put.get("count"),
      sum: (sum = sum + put.get("count")),
    }));

    //修改排序规则
    putsTrend.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      putsTrend,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "获取放仔表列表失败",
    });
  }
};

/**
 * @swagger
 * /sys/whipping/whippingTrend:
 *   get:
 *     tags:
 *       - 操作趋势
 *     summary: 获取抽蛋操作的趋势
 *     description: 根据site_id获取whipping表的数据记录
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
 *         description: 成功返回抽蛋列表
 *         schema:
 *           type: object
 *           properties:
 *             whippings:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getWhippingTrend = async (req, res) => {
  try {
    const { site_id } = req.query;

    const whippings = await Whipping.findAll({
      attributes: [
        "site_id",
        [sequelize.fn("date", sequelize.col("whipping_time")), "date"],
        [sequelize.fn("count", "*"), "count"],
      ],
      where: {
        site_id,
      },
      group: ["site_id", "date"],
      order: [[sequelize.literal("date ASC")]],
    });

    let sum = 0;
    // 格式化数据，包括site_id和每天的数据条数
    const whippingsTrend = whippings.map((egg) => ({
      site_id: egg.site_id,
      date: egg.get("date"),
      count: egg.get("count"),
      sum: (sum = sum + egg.get("count")),
    }));

    //修改排序规则
    whippingsTrend.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      whippingsTrend,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "获取抽蛋表列表失败",
    });
  }
};

/**
 * @swagger
 * /sys/sum/sumList:
 *   get:
 *     tags:
 *       - 数据总量操作接口
 *     summary: 获取雏鸽死亡和出栏总数的列表
 *     description: 获取sum表的数据
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回雏鸽死亡和出栏总数列表
 *         schema:
 *           type: object
 *           properties:
 *             death:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Sum'
 *       500:
 *         description: 获取失败
 */
exports.getSumList = async (req, res) => {
  try {
    const sums = await Sum.findAll({
      order: [[sequelize.literal("time DESC")]],
    });

    res.status(200).json({
      sums,
    });
  } catch (error) {
    res.status(500).json({
      error: "获取雏鸽死亡和出栏总数列表失败",
    });
  }
};

/**
 * @swagger
 * /sys/sum/addSum:
 *   post:
 *     tags:
 *       - 数据总量操作接口
 *     summary: 往sum表插入数据
 *     description: 插入当天的雏鸽死亡总数和出栏总数
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: cub_death_sum
 *         in: query
 *         description: 雏鸽死亡总数
 *         required: false
 *         schema:
 *           type: string
 *       - name: mature_sum
 *         in: query
 *         description: 出栏总数
 *         required: false
 *         schema:
 *           type: string
 *       - name: time
 *         in: query
 *         description: 时间
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 新增成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */
exports.addSum = async (req, res) => {
  try {
    // 从请求体中解构赋值
    const { site_id, cub_death_sum, mature_sum, time } = req.body;

    // 确保所有必要的字段都被提供了
    if (
      typeof site_id === "undefined" ||
      typeof cub_death_sum === "undefined" ||
      typeof mature_sum === "undefined" ||
      typeof time === "undefined"
    ) {
      return res.status(400).json({
        error: "需要将数据填写完整",
      });
    }

    const insertSum = await Sum.create({
      site_id,
      cub_death_sum,
      mature_sum,
      time,
    });

    res.status(200).json({
      insertSum,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "新增数据总量失败",
    });
  }
};

/**
 * @swagger
 * /sys/sum/updateSum:
 *   put:
 *     tags:
 *       - 数据总量操作接口
 *     summary: 修改数据总量功能
 *     description: 根据时间修改数据总量记录
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: sum
 *         description: 需要修改的数据总量信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Sum'
 *     responses:
 *       200:
 *         description: 修改成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 *       404:
 *         description: 没有找到对应的数据总量
 */

exports.updateSum = async (req, res) => {
  try {
    // 从请求体中获取需要修改的数据总量
    const modifiedSum = req.body;

    // 根据id参数找到对应的数据总量
    const sum = await Sum.findOne({
      where: {
        time: modifiedSum.time,
      },
    });

    if (!sum) {
      // 如果查询结果为空，返回404状态码
      return res.status(404).json({
        error: "没有找到对应的数据总量",
      });
    }

    // 更新sum信息
    Object.assign(sum, modifiedSum);

    // 保存修改后的sum记录
    await sum.save();

    // 返回修改后的sum信息
    res.status(200).json({
      sum,
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "数据总量修改失败",
    });
  }
};

/**
 * @swagger
 * /sys/sum/deleteSum:
 *   post:
 *     tags:
 *       - 数据总量操作接口
 *     summary: 删除数据总量
 *     description: 根据ID删除数据总量
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         description: SumID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 数据总量删除成功
 *       500:
 *         description: 数据总量删除失败
 *       404:
 *         description: 没有找到对应ID的记录
 */
exports.deleteSum = async (req, res) => {
  try {
    const { id } = req.query;

    const sum = await Sum.findByPk(id);

    if (!sum) {
      res.status(404).json({
        error: "没有找到对应ID的记录",
      });
    } else {
      await sum.destroy();
      res.status(200).json({
        message: "数据总量删除成功",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "数据总量删除失败",
    });
  }
};

/**
 * @swagger
 * /sys/egg/period:
 *   get:
 *     tags:
 *       - 产蛋周期
 *     summary: 获取从鸽蛋孵化到肉鸽出栏所需的时间
 *     description: 根据site_id获取mature表的数据记录
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回养殖周期
 *         schema:
 *           type: object
 *           properties:
 *             period:
 *               type: array
 *       500:
 *         description: 获取数据失败
 */
exports.getEggPeriod = async (req, res) => {
  try {
    // 查询所有蛋并按照时间升序排列
    const eggs = await Egg.findAll({
      order: [["egg_time", "ASC"]],
    });

    // 将蛋按照鸽仓号、鸽舍号和鸽笼号分组
    const groupedEggs = eggs.reduce((acc, curr) => {
      const key = `${curr.site_id}_${curr.house_id}_${curr.cage_id}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});

    const processedGroups = {};

    // 遍历每个分组，计算平均养殖周期
    for (const groupKey in groupedEggs) {
      const eggDataArray = groupedEggs[groupKey];
      let totalDiffDays = { statu1: 0, statu2: 0 };
      let count = { statu1: 0, statu2: 0 };

      // 准备一个数组来进行并行处理
      const promises = [];

      // 遍历每个蛋并计算差异天数
      for (let i = 0; i < eggDataArray.length - 1; i++) {
        const currentEgg = eggDataArray[i];
        const nextEgg = eggDataArray[i + 1];

        // 计算抽蛋后的
        if (currentEgg.statu === 1 || currentEgg.statu === 2) {
          promises.push(calculateDiffDays(currentEgg, nextEgg));
          if (currentEgg.statu === 1) {
            count.statu1++;
          } else if (currentEgg.statu === 2) {
            count.statu2++;
          }
        }
      }

      // 等待所有 Promise 完成
      const results = await Promise.all(promises);

      // 计算总差异天数和平均值
      results.forEach((diffDays, index) => {
        const currentEgg = eggDataArray[index];
        if (currentEgg.statu === 1) {
          totalDiffDays.statu1 += diffDays;
        } else if (currentEgg.statu === 2) {
          totalDiffDays.statu2 += diffDays;
        }
      });

      const whippingAverageDiffDays =
        count.statu1 > 0 ? Math.round(totalDiffDays.statu1 / count.statu1) : 0;
      const StayAverageDiffDays =
        count.statu2 > 0 ? Math.round(totalDiffDays.statu2 / count.statu2) : 0;
      processedGroups[groupKey] = {
        eggDataArray,
        whippingAverageDiffDays,
        StayAverageDiffDays,
      };
    }

    res.status(200).json({
      processedGroups: processedGroups,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "获取养殖周期失败",
    });
  }
};

// 辅助函数，用于计算差异天数
function calculateDiffDays(currentEgg, nextEgg) {
  return new Promise((resolve, reject) => {
    const diffTime = nextEgg.egg_time.getTime() - currentEgg.egg_time.getTime();
    const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    resolve(diffDays);
  });
}

/**
 * @swagger
 * /sys/egg/eggWarn:
 *   get:
 *     tags:
 *       - 预警接口
 *     summary: 长时间不产蛋预警功能
 *     description: 根据指定时间找到长时间未产蛋的鸽笼并预警
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
 *         description: 预警列表获取成功
 *       500:
 *         description: 预警列表获取失败
 */
//长时间不产蛋预警
exports.getEggWarn = async (req, res) => {
  try {
    const { site_id } = req.query;

    const today = moment.tz("Asia/Shanghai").toDate();
    today.setHours(today.getHours() + 8);

    //获取每个鸽笼的最新egg记录
    let latestEggs = await Egg.findAll({
      attributes: ["site_id", "house_id", "cage_id", "egg_time", "statu"],
      where: sequelize.literal(`egg_time IN (
        SELECT MAX(egg_time)
        FROM egg
        WHERE site_id = ${site_id}
        GROUP BY site_id, house_id, cage_id
        )`),
      raw: true,
    });

    // const whippingWarnEggs = latestEggs.filter((egg) => {
    //   const eggDate = new Date(egg.egg_time);
    //   const timeDiff = today.getTime() - eggDate.getTime();
    //   const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    //   return egg.statu === 1 && diffInDays >= 10;
    // })

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

    res.status(200).json({
      // whippingWarnEggs: whippingWarnEggs,
      warnEggs: warnEggs,
    });
  } catch (error) {
    res.status(500).json({
      error: "预警列表获取失败",
    });
    console.log(error);
  }
};

/**
 * @swagger
 * /sys/egg/decision:
 *   get:
 *     tags:
 *       - 数据决策
 *     summary: 获取抽蛋或留窝的数据决策
 *     description: 根据whipping表和stay表的数据记录来进行决策
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回预测列表
 *         schema:
 *           type: object
 *           properties:
 *             whippings:
 *               type: array
 *               items:
 *                 $ref: '#/definition/Whipping'
 *       500:
 *         description: 获取数据失败
 */
exports.getDecision = async (req, res) => {
  try {
    const today = moment.tz("Asia/Shanghai").toDate();
    today.setHours(today.getHours() + 8);

    //获取每个鸽笼的最新egg记录
    let latestEggs = await Egg.findAll({
      attributes: ["site_id", "house_id", "cage_id", "egg_time", "statu"],
      where: sequelize.literal(`egg_time IN (
        SELECT MAX(egg_time)
        FROM egg
        GROUP BY site_id, house_id, cage_id
        )`),
      raw: true,
    });

    const whippingWarnEggs = latestEggs
      .filter((egg) => {
        const eggDate = new Date(egg.egg_time);
        const timeDiff = today.getTime() - eggDate.getTime();
        const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        return egg.statu === 1 && diffInDays >= 30;
      })
      .map((egg) => {
        return {
          id: egg.id,
          site_id: egg.site_id,
          house_id: egg.house_id,
          cage_id: egg.cage_id,
          diffInDays: Math.floor(
            (today.getTime() - new Date(egg.egg_time).getTime()) /
              (1000 * 60 * 60 * 24)
          ),
          statu: egg.statu,
        };
      });

    const stayWarnEggs = latestEggs
      .filter((egg) => {
        const eggDate = new Date(egg.egg_time);
        const timeDiff = today.getTime() - eggDate.getTime();
        const diffInDays = Math.floor(timeDiff / (1000 * 60 * 60 * 24));

        return egg.statu === 2 && diffInDays >= 50;
      })
      .map((egg) => {
        return {
          id: egg.id,
          site_id: egg.site_id,
          house_id: egg.house_id,
          cage_id: egg.cage_id,
          diffInDays: Math.floor(
            (today.getTime() - new Date(egg.egg_time).getTime()) /
              (1000 * 60 * 60 * 24)
          ),
          statu: egg.statu,
        };
      });

    res.status(200).json({
      whippingWarnEggs: whippingWarnEggs,
      stayWarnEggs: stayWarnEggs,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "获取抽蛋或者留窝决策失败",
    });
  }
};

/**
 * @swagger
 * /sys/database/backup:
 *   get:
 *     tags:
 *       - 数据备份
 *     summary: 对数据库进行备份
 *     description: 将数据库结构和数据转储为sql文件
 *     responses:
 *       200:
 *         description: 数据库备份成功
 *       500:
 *         description: 数据库备份失败
 */
exports.backupDatabase = async (req, res) => {
  try {
    // 数据库信息
    const dbName = process.env.DB_NAME;
    const dbUser = process.env.DB_USER;
    const dbPass = process.env.DB_PASS;
    const backupDir = path.resolve(__dirname, "../../sql");

    // 备份数据库
    const date = moment().tz("Asia/Shanghai").format("YYYYMMDD_HHmmss"); // 修改日期格式
    const backupPath = path.join(backupDir, `${dbName}_${date}.sql`);
    const dumpCommand = `mysqldump -u ${dbUser} --password=${dbPass} ${dbName} > "${backupPath}"`;

    exec(dumpCommand, (error, stdout, stderr) => {
      if (error) {
        console.error("备份操作出错:", error);
        return res.status(500).json({
          error: "数据备份失败",
        });
      }

      console.log(`数据库备份成功: ${backupPath}`);

      // 删除7天前的备份文件
      const now = Date.now();
      fs.readdir(backupDir, (err, files) => {
        if (err) {
          console.error("读取备份目录失败:", err);
          return res.status(500).json({
            error: "读取备份目录失败",
          });
        }

        files.forEach((file) => {
          const filePath = path.join(backupDir, file);
          fs.stat(filePath, (err, stats) => {
            if (err) {
              console.error("获取文件状态失败:", err);
              return;
            }

            const sevenDaysAgo = now - 7 * 24 * 60 * 60 * 1000;
            if (stats.mtime.getTime() < sevenDaysAgo) {
              fs.unlink(filePath, (err) => {
                if (err) {
                  console.error("删除文件失败:", err);
                  return;
                }
                console.log(`已删除文件: ${filePath}`);
              });
            }
          });
        });

        // 响应客户端
        res.status(200).json({
          message: "数据库备份和清理旧文件操作成功",
        });
      });
    });
  } catch (error) {
    console.error("备份操作出错:", error);
    res.status(500).json({
      error: "数据备份失败",
    });
  }
};

// /**
//  * @swagger
//  * /sys/user/login:
//  *   post:
//  *     tags:
//  *       - 用户登录
//  *     summary: 用户进行登录
//  *     description: 用户使用用户名和密码进行登录
//  *     consumes:
//  *       - application/json
//  *     parameters:
//  *       - name: userCredentials
//  *         in: body
//  *         description: 用户名和密码
//  *         required: true
//  *         schema:
//  *           type: object
//  *           properties:
//  *             username:
//  *               type: string
//  *             password:
//  *               type: string
//  *     responses:
//  *       200:
//  *         description: 登录成功
//  *         schema:
//  *           type: object
//  *           properties:
//  *             token: string
//  *       401:
//  *         description: 用户名或密码错误
//  */

exports.login = async (req, res) => {
  const { username, password } = req.body;
  // 在数据库中查找用户
  const user = await User.findOne({
    where: {
      username: username,
    },
  });

  // 如果用户不存在，则返回错误响应
  if (!user) {
    return res.status(402).send("用户名或密码错误");
  }

  // 使用bcrypt模块对用户输入的密码进行哈希加密，并与数据库中的密码进行比较
  const hashPassword = await bcrypt.hash(user.password, 10);
  const passwordMatch = await bcrypt.compare(password, hashPassword);

  // 如果密码不匹配，则返回错误响应
  if (!passwordMatch) {
    return res.status(402).send("用户名或密码错误");
  }

  // 使用jsonwebtoken模块生成token，并在1小时后过期
  const token = jwt.sign(
    {
      username: user.username,
      password: user.password,
      canghao: user.canghao,
    },
    "y7usrkyty5ekjtehetmherjtwnyhgmdfngawm56562302654+6456+5661151565te",
    {
      expiresIn: "1h",
    }
  );

  // 返回包含token的JSON响应
  res.json({ token });
};
//验证token
exports.verifyToken = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      res.status(500).json({
        error: "token为null",
      });
    }
    /*  if (token === null) {
       
     } */
    jwt.verify(
      token,
      "y7usrkyty5ekjtehetmherjtwnyhgmdfngawm56562302654+6456+5661151565te",
      async (err, decoded) => {
        if (err) {
          // console.log(err.message);
          res.status(404).json({ error: "非法token" });
        } else {
          // console.log(decoded)
          const username = decoded.username;
          const password = decoded.password;
          // console.log(username, password)
          const user = await User.findOne({
            where: {
              username: username,
              password: password,
            },
          });
          if (user) {
            // console.log(user, username)
            const role = user.role;
            res.status(200).json({ role: role });
          } else {
            res.status(404).json({ error: "非法token" });
          }
        }
      }
    );
  } catch (error) {
    res.status(500).json({
      error: "token解析失败",
    });
  }
};

/**
 * @swagger
 * /sys/user/save:
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
  const { role, username, password, canghao, realName } = req.body;

  try {
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
        canghao: canghao,
        realName: realName,
      });
      res.status(200).json({
        user,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "用户添加失败",
    });
  }
};

/**
 * @swagger
 * /sys/user/update:
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
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "用户修改失败",
    });
  }
};

/**
 * @swagger
 * /sys/user/delete:
 *   delete:
 *     tags:
 *       - 用户操作接口
 *     summary: 删除用户信息
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

exports.deleteUser = async (req, res) => {
  try {
    // 从请求体中获取需要删除的用户信息
    const modifiedUser = req.body;

    // 根据用户名找到对应的用户记录
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

    // 删除user信息
    await User.destroy({
      where: {
        username: modifiedUser.username,
      },
    });

    // 删除成功后的操作
    console.log(`已成功删除用户名为${modifiedUser.username}的信息`);
    res.status(200).json({
      message: "成功删除",
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    console.error("删除失败:", error);
    res.status(500).json({
      error: "删除失败",
    });
  }
};

/**
 * @swagger
 * /sys/user/info:
 *   get:
 *     tags:
 *       - 用户操作接口
 *     summary: 显示所有用户信息
 *     description: 显示所有用户信息
 *     responses:
 *       200:
 *         description: 显示所有用户信息成功
 *       500:
 *         description: 显示所有用户信息失败
 *       404:
 *         description: 没有找到对应的用户
 */

exports.userInfo = async (req, res) => {
  try {
    // 查找所有用户信息
    console.log("1");
    const user = await User.findAll({});

    // 返回修改后的cage信息
    res.status(200).json({
      user,
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "显示用户信息失败",
    });
  }
};

/**
 * @swagger
 * /sys/eggList/list:
 *   get:
 *     tags:
 *       - 打印接口
 *     summary: 获取鸽蛋列表
 *     description: 获取egg表中的数据记录
 *     parameters:
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
 *         description: 成功返回的鸽蛋列表
 *         schema:
 *           type: object
 *           properties:
 *             eggs:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Egg'
 *       500:
 *         description: 获取失败
 */
exports.getEggList = async (req, res) => {
  try {
    const { page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    const today = new Date();
    today.setHours(8, 0, 0, 0); // 设置时间为当天的零点,因为是UTF-8所以要设置成8.00才会变成0点

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1); // 设置时间为第二天的零点

    //查询总记录数
    const totalCount = await Egg.count();

    // 查询当天的需要抽蛋的egg记录
    const eggs = await Egg.findAll({
      /* where: {
        egg_time: {
          [Op.between]: [today, tomorrow],
        }
      }, */
      order: [["egg_time", "DESC"]],
      limit: parseInt(pageSize),
      offset: offset,
    });

    // 返回查询结果和总记录数
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      totalCount: totalCount,
      eggs: eggs,
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
 * /sys/eggAndWhipping/eggAndWhippingSum:
 *   get:
 *     tags:
 *       - 鸽子养殖数据比例接口
 *     summary: 获取抽蛋和留窝数据的数量
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
 *             eggCount:
 *               type: integer
 *               description: 抽蛋的数量
 *             whippingCount:
 *               type: integer
 *               description: 留窝的数量
 *       500:
 *         description: 获取失败
 */
exports.getEggAndWhipping = async (req, res) => {
  try {
    const { site_id } = req.query;
    const whippingCount = await Egg.count({
      where: {
        statu: 1,
        site_id,
      },
    });
    const stayCount = await Egg.count({
      where: {
        statu: 2,
        site_id,
      },
    });

    res.status(200).json({
      whippingCount: whippingCount,
      stayCount: stayCount,
    });
  } catch (error) {
    res.status(500).json({
      error: "获取数据数量失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/cageDetail:
 *   get:
 *     tags:
 *       - 鸽笼信息接口
 *     summary: 获取各鸽舍里所有鸽笼的数据
 *     description: 获取cage表中相同鸽舍的全部数据
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: house_id
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
  const { site_id, house_id } = req.query;

  try {
    // 根据 site_id 和 house_id 查询符合条件的数据
    const cages = await Cage.findAll({
      where: {
        site_id,
        house_id,
        statu: {
          [Op.in]: ["预抽蛋", "抽蛋", "带仔中", "留窝", "初始状态"],
        },
      },
      order: [["cage_id", "ASC"]],
    });

    // 返回查询结果
    res.status(200).json({
      cages,
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "获取相同鸽舍的全部数据失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/cageStatus:
 *   get:
 *     tags:
 *       - 鸽笼信息接口
 *     summary: 获取各鸽笼所经历过的状态
 *     description: 获取各表中相同鸽笼的全部数据
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: house_id
 *         in: query
 *         description: 鸽舍ID
 *         required: true
 *         schema:
 *           type: string
 *       - name: cage_id
 *         in: query
 *         description: 鸽笼ID
 *         required: true
 *         schema:
 *           type: string
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 鸽笼状态列表获取成功
 *       500:
 *         description: 鸽笼状态列表获取失败
 */

exports.getCageStatus = async (req, res) => {
  try {
    const { site_id, house_id, cage_id } = req.query;
    const cagesStatus = [];

    // 根据 site_id 和 house_id， cage_id 查询符合条件的数据
    const processedEggs = await Egg.findAll({
      where: {
        site_id,
        house_id,
        cage_id,
      },
      order: [["egg_time", "DESC"]],
      limit: 100,
    });

    processedEggs.forEach((egg) => {
      const statu = egg.statu;
      const eggTime = egg.egg_time;
      if (statu === 1) {
        cagesStatus.push({
          id: egg.id,
          status: "抽蛋",
          time: eggTime,
        });
      } else if (statu === 2) {
        cagesStatus.push({
          id: egg.id,
          status: "留窝",
          time: eggTime,
        });
      }
    });

    // 返回查询结果
    res.status(200).json({
      cagesStatus,
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "获取相同鸽舍的全部数据失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/updateCageStatus:
 *   put:
 *     tags:
 *       - 鸽笼信息接口
 *     summary: 修改鸽笼信息
 *     description: 根据egg表的主键id修改鸽笼信息
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         description: 主键ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: house_id
 *         in: query
 *         description: 鸽舍ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: cage_id
 *         in: query
 *         description: 鸽笼ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: status
 *         in: query
 *         description: 鸽笼状态
 *         required: false
 *         schema:
 *           type: string
 *       - name: egg_time
 *         in: query
 *         description: 时间
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 鸽笼状态修改成功
 *       500:
 *         description: 鸽笼状态修改失败
 */

exports.updateCageStatus = async (req, res) => {
  try {
    const {
      id,
      site_id,
      house_id,
      cage_id,
      status: initialStatus,
      egg_time,
    } = req.query;
    let statu = null;
    let status;

    // 使用对象映射来代替硬编码的状态值
    const statusMapping = {
      产蛋: "0",
      抽蛋: "1",
      留窝: "2",
    };

    // 检查初始状态并设置对应的值
    if (initialStatus === "产蛋") {
      statu = statusMapping["产蛋"];
      status = "预抽蛋";
    } else if (initialStatus === "抽蛋") {
      statu = statusMapping["抽蛋"];
      status = initialStatus; // 保持原始状态
    } else if (initialStatus === "留窝") {
      statu = statusMapping["留窝"];
      status = initialStatus; // 保持原始状态
    }

    const egg = await Egg.findOne({
      where: { id },
    });

    const latestEgg = await Egg.findOne({
      where: {
        site_id,
        house_id,
        cage_id,
      },
      order: [[sequelize.literal("egg_time DESC")]],
    });

    if (!egg || !latestEgg) {
      return res.status(404).json({
        error: "指定的鸽笼不存在",
      });
    }

    if (egg.id === latestEgg.id) {
      await Cage.update(
        {
          statu: status,
        },
        {
          where: {
            site_id,
            house_id,
            cage_id,
          },
        }
      );
    }

    if (statu === null) {
      statu = egg.statu;
    }

    if (typeof egg_time === "undefined") {
      var formattedEggTime = new Date(egg.egg_time);
    } else {
      var formattedEggTime = new Date(egg_time);
    }

    await Egg.update(
      {
        statu: parseInt(statu),
        egg_time: formattedEggTime,
      },
      {
        where: {
          id: parseInt(id),
        },
      }
    );

    // 返回成功信息
    res.status(200).json({
      message: "鸽笼状态修改成功",
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "鸽笼状态修改失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/addCageStatus:
 *   post:
 *     tags:
 *       - 鸽笼信息接口
 *     summary: 增加鸽笼信息
 *     description: 根据参数增加鸽笼信息
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: site_id
 *         in: query
 *         description: 鸽仓ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: house_id
 *         in: query
 *         description: 鸽舍ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: cage_id
 *         in: query
 *         description: 鸽笼ID
 *         required: true
 *         schema:
 *           type: integer
 *       - name: status
 *         in: query
 *         description: 鸽笼状态
 *         required: false
 *         schema:
 *           type: string
 *       - name: egg_time
 *         in: query
 *         description: 时间
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: 鸽笼状态增加成功
 *       500:
 *         description: 鸽笼状态增加失败
 */
exports.addCageStatus = async (req, res) => {
  try {
    const { site_id, house_id, cage_id, status, egg_time } = req.query;
    let statu;

    if (status === "产蛋") {
      statu = 0;
    } else if (status === "抽蛋") {
      statu = 1;
    } else if (status === "留窝") {
      statu = 2;
    }

    const egg = await Egg.create({
      site_id: site_id,
      house_id: house_id,
      cage_id: cage_id,
      egg_time: egg_time,
      statu: statu,
    });

    res.status(200).json({
      message: "鸽笼状态添加成功",
    });
  } catch (error) {
    res.status(500).json({
      error: "鸽笼状态增加失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/deleteCageStatus:
 *   post:
 *     tags:
 *       - 鸽笼信息接口
 *     summary: 删除鸽笼信息
 *     description: 根据EggID删除鸽笼信息
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: query
 *         description: EggID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: 鸽笼状态信息删除成功
 *       500:
 *         description: 鸽笼状态信息删除失败
 *       404:
 *         description: 没有找到对应ID的记录
 */
exports.deleteCageStatus = async (req, res) => {
  try {
    const { id } = req.query;

    const egg = await Egg.findByPk(id);

    if (!egg) {
      res.status(404).json({
        error: "没有找到对应ID的记录",
      });
    } else {
      await egg.destroy();
      res.status(200).json({
        message: "鸽笼状态信息删除成功",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "鸽笼状态信息删除失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/numberAndCubNumberSum:
 *   get:
 *     tags:
 *       - 各鸽舍种鸽和雏鸽总数接口
 *     summary: 获取cage表中site_id和house_id相同的鸽笼数据的numberSum和cubNumberSum
 *     description: 根据site_id和house_id获取cage表中的数据的numberSum和cubNumberSum
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回具有相同site_id和house_id的鸽笼数据的numberSum和cubNumberSum
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               siteId:
 *                 type: integer
 *                 description: 鸽仓所属站点ID
 *               houseId:
 *                 type: integer
 *                 description: 鸽笼所属房间ID
 *               numberSum:
 *                 type: integer
 *                 description: 鸽笼数据的number字段累加值
 *               cubNumberSum:
 *                 type: integer
 *                 description: 鸽笼数据的cub_number字段累加值
 *       500:
 *         description: 获取数据失败
 */

exports.getNumberAndCubNumberSum = async (req, res) => {
  try {
    const cages = await Cage.findAll({
      attributes: ["site_id", "house_id"],
      group: ["site_id", "house_id"],
      where: {
        statu: {
          [Op.in]: ["预抽蛋", "抽蛋", "带仔中", "留窝", "初始状态"],
        },
      },
      order: [["house_id", "ASC"]],
    });

    // 计算 numberSum 和 cubNumberSum
    const processedCages = await Promise.all(
      cages.map(async (cage) => {
        const numberSum = await Cage.sum("number", {
          where: {
            site_id: cage.site_id,
            house_id: cage.house_id,
          },
        });
        const cubNumberSum = await Cage.sum("cub_number", {
          where: { site_id: cage.site_id, house_id: cage.house_id },
        });

        return {
          site_id: cage.site_id,
          house_id: cage.house_id,
          numberSum,
          cubNumberSum,
        };
      })
    );

    res.status(200).json(processedCages);
  } catch (error) {
    res.status(500).json({
      error: "获取数据数量失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/statuProportion:
 *   get:
 *     tags:
 *       - 鸽子养殖数据比例接口
 *     summary: 获取cage表里各状态类型的数量
 *     description: 根据类型名称获取cage表中的数据数量
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回各状态类型的数量
 *         schema:
 *           type: object
 *           properties:
 *             eggCount:
 *               type: integer
 *               description: 预抽蛋的数量
 *             whippingCount:
 *               type: integer
 *               description: 抽蛋的数量
 *             cubCount:
 *               type: integer
 *               description: 带仔中的数量
 *             stayCount:
 *               type: integer
 *               description: 留窝的数量
 *       500:
 *         description: 获取失败
 */
exports.getStatuProportion = async (req, res) => {
  try {
    const eggCount = await Cage.count({
      where: {
        statu: {
          [Op.eq]: "预抽蛋",
        },
      },
    });

    const whippingCount = await Cage.count({
      where: {
        statu: {
          [Op.eq]: "抽蛋",
        },
      },
    });

    const cubCount = await Cage.count({
      where: {
        statu: {
          [Op.like]: "带仔%",
        },
      },
    });
    const stayCount = await Cage.count({
      where: {
        statu: {
          [Op.eq]: "留窝",
        },
      },
    });

    res.status(200).json({
      eggCount,
      whippingCount,
      cubCount,
      stayCount,
    });
  } catch (error) {
    res.status(500).json({
      error: "获取数据数量失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/cageSum:
 *   get:
 *     tags:
 *       - 鸽子养殖数据总数接口
 *     summary: 获取鸽笼数据的数量
 *     description: 获取cage表中的数据总量
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回数据的数量
 *         schema:
 *           type: object
 *           properties:
 *             cageSum:
 *               type: integer
 *               description: 鸽笼的数量
 *       500:
 *         description: 获取失败
 */
exports.getcageSum = async (req, res) => {
  try {
    // 使用count方法获取表中的记录数
    const count = await Cage.count();
    // 返回数据的数量
    res.status(200).json({
      count,
    });
  } catch (error) {
    // 捕获可能的错误，返回500以及错误信息
    res.status(500).json({
      error: "获取鸽舍数据的数量失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/numberSum:
 *   get:
 *     tags:
 *       - 鸽子养殖数据总数接口
 *     summary: 获取种鸽总数的总和
 *     description: 获取cage表中的number列的总和
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回种鸽总数的总和
 *         schema:
 *           type: object
 *           properties:
 *             numberSum:
 *               type: integer
 *               description: 种鸽总数的总和
 *       500:
 *         description: 获取失败
 */

exports.getnumberSum = async (req, res) => {
  try {
    // 使用sum方法获取number列的总和
    const numberSum = await Cage.sum("number");
    // 返回种鸽总数的总和
    res.status(200).json({
      numberSum,
    });
  } catch (error) {
    // 捕获可能的错误，返回500以及错误信息
    res.status(500).json({
      error: "获取种鸽总数总和失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/cubNumberSum:
 *   get:
 *     tags:
 *       - 鸽子养殖数据总数接口
 *     summary: 获取雏鸽总数的总和
 *     description: 获取cage表中的cub_number列的总和
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回雏鸽总数的总和
 *         schema:
 *           type: object
 *           properties:
 *             cubNumberSum:
 *               type: integer
 *               description: 雏鸽总数的总和
 *       500:
 *         description: 获取失败
 */

exports.getcubNumberSum = async (req, res) => {
  try {
    // 使用sum方法获取number列的总和
    const cubNumberSum = await Cage.sum("cub_number");
    // 返回种鸽总数的总和
    res.status(200).json({
      cubNumberSum,
    });
    // return cubNumberSum
  } catch (error) {
    // 捕获可能的错误，返回500以及错误信息
    res.status(500).json({
      error: "获取雏鸽总数总和失败",
    });
  }
};

/**
 * @swagger
 * /sys/count/deathSum:
 *   get:
 *     tags:
 *       - 鸽子养殖数据总数接口
 *     summary: 获取死亡总数的总和
 *     description: 获取count表中的death_sum列的总和
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回死亡总数的总和
 *         schema:
 *           type: object
 *           properties:
 *             deathSum:
 *               type: integer
 *               description: 死亡总数的总和
 *       500:
 *         description: 获取失败
 */

exports.getDeathSum = async (req, res) => {
  try {
    // 使用 findOne 方法按照时间降序排序获取最新一条记录
    const latestCount = await Count.findOne({
      order: [["time", "DESC"]],
    });

    const deathSum = 0;
    if (latestCount) {
      deathSum = latestCount.death_sum;
    }

    res.status(200).json({
      deathSum,
    });
  } catch (error) {
    // 捕获可能的错误，返回500以及错误信息
    res.status(500).json({
      error: "获取死亡总数失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/delete/{id}:
 *   delete:
 *     tags:
 *       - 鸽笼操作接口
 *     summary: 删除指定id的鸽笼
 *     description: 根据id删除cage表中的数据
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 鸽笼ID
 *         schema:
 *           type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功删除该id对应的鸽笼
 *         schema:
 *           $ref: '#/definitions/Cage'
 *       404:
 *         description: 没有找到待删除的鸽笼
 *       500:
 *         description: 删除失败
 */

exports.deleteCageById = async (req, res) => {
  try {
    // 从请求路径中获取id参数
    const { id } = req.params;
    // 查询对应id的cage记录
    const cage = await Cage.findByPk(id);
    if (!cage) {
      // 如果查询结果为空，返回404状态码
      res.status(404).json({
        error: "没有找到待删除的鸽舍",
      });
    } else {
      // 如果查询结果不为空，删除该条记录
      await cage.destroy();
      res.status(200).json({
        message: `ID为 ${id} 的鸽舍已成功删除`,
      });
    }
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "删除鸽舍失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/update:
 *   put:
 *     tags:
 *       - 鸽笼操作接口
 *     summary: 修改鸽笼功能
 *     description: 根据id修改鸽笼记录
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: cage
 *         description: 需要修改的鸽笼信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Cage'
 *     responses:
 *       200:
 *         description: 修改成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 *       404:
 *         description: 没有找到对应的鸽笼
 */

exports.updateCage = async (req, res) => {
  try {
    // 从请求体中获取需要修改的鸽舍信息
    const modifiedCage = req.body;

    // 根据id参数找到对应的鸽舍记录
    const cage = await Cage.findOne({
      where: {
        site_id: modifiedCage.site_id,
        house_id: modifiedCage.house_id,
        cage_id: modifiedCage.cage_id,
      },
    });

    if (!cage) {
      // 如果查询结果为空，返回404状态码
      return res.status(404).json({
        error: "没有找到对应的鸽舍",
      });
    }

    // 更新cage信息
    Object.assign(cage, modifiedCage);

    // 保存修改后的cage记录
    await cage.save();

    // 返回修改后的cage信息
    res.status(200).json({
      cage,
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "鸽舍修改失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/info/{id}:
 *   get:
 *     tags:
 *       - 鸽笼操作接口
 *     summary: 获取鸽笼详情
 *     description: 根据id获取cage表中的数据
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: 鸽笼ID
 *         schema:
 *           type: integer
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: 成功返回该id对应的cage信息
 *         schema:
 *           $ref: '#/definitions/Cage'
 *       404:
 *         description: 没有找到对应的鸽笼
 *       500:
 *         description: 获取失败
 */

exports.getCageInfoById = async (req, res) => {
  try {
    // 从请求路径中获取id参数
    const { id } = req.params;
    // 查询对应id的cage记录
    const cage = await Cage.findByPk(id);
    if (!cage) {
      // 如果查询结果为空，返回404状态码
      res.status(404).json({
        error: "没有找到对应的鸽舍",
      });
    } else {
      // 如果查询结果不为空，返回cage信息
      res.status(200).json(cage);
    }
  } catch (error) {
    // 捕获异常，返回错误信息
    res.status(500).json({
      error: "获取鸽舍详情失败",
    });
  }
};

/**
 * @swagger
 * /sys/cage/list:
 *   get:
 *     tags:
 *       - 鸽笼操作接口
 *     summary: 获取鸽笼列表
 *     description: 获取cage表中全部数据
 *     parameters:
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
 *         description: 成功返回cage列表
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

exports.getCageList = async (req, res) => {
  try {
    const { page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    //查询总记录数
    const totalCount = await Cage.count();

    // 查询所有cage记录
    const cages = await Cage.findAll({
      order: [["house_id", "ASC"]],
      limit: parseInt(pageSize),
      offset: offset,
    });

    // 返回查询结果和总记录数
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      totalCount: totalCount,
      cages: cages,
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
 * /sys/cage/save:
 *   post:
 *     tags:
 *       - 鸽笼操作接口
 *     summary: 新增鸽笼功能
 *     description: 新增鸽笼记录
 *     consumes:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: Cage
 *         description: 要新增的鸽笼信息
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Cage'
 *     responses:
 *       200:
 *         description: 新增成功
 *       400:
 *         description: 请求体格式不正确或缺少必要的字段
 */

exports.addCage = async (req, res) => {
  const { siteId, houseId, cageId, number, statu, cubNumber } = req.body;

  try {
    // 检查cage是否已经存在
    const existingCage = await Cage.findOne({
      where: {
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
      },
    });

    if (existingCage) {
      res.status(409).json({
        error: "鸽舍已存在",
      });
    } else {
      // 创建新的cage
      const cage = await Cage.create({
        site_id: siteId,
        house_id: houseId,
        cage_id: cageId,
        number: number,
        statu: statu,
        cub_number: cubNumber,
      });
      res.status(200).json({
        cage,
      });
    }
  } catch (error) {
    res.status(500).json({
      error: "鸽舍添加失败",
    });
  }
};

//对所有操作数据查看    2024年5月8日
exports.getLogList = async (req, res) => {
  try {
    const { page, pageSize } = req.query; // 获取分页参数

    // 计算分页偏移量
    const offset = (parseInt(page) - 1) * parseInt(pageSize);

    //查询总记录数
    const totalCount = await Log.count();

    // 查询所有cage记录
    const logs = await Log.findAll({
      order: [["id", "DESC"]],
      limit: parseInt(pageSize),
      offset: offset,
    });

    // 返回查询结果和总记录数
    return res.status(200).json({
      code: 200,
      msg: "查询成功",
      totalCount: totalCount,
      logs: logs,
      type: "success",
    });
  } catch (error) {
    // 捕获异常，返回错误信息
    console.log(error);
    return Result.JsonResponse(500, 500, "网络连接失败", res, "error"); //出现错误，返回500状态码
  }
};
