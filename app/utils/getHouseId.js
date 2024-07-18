const db = require("../models");
const House = db.house;
const sequelize = db.sequelize;
//                            nfc号;
exports.getHouseId = async (houseId) => {
  try {
    let house = await House.findOne({
      where: {
        nfc_id: houseId, //nfc号
      },
    });
    if (!house || house == null || house === "null") {
      console.log(111);
      throw new Error("未找到该鸽舍号");
    }

    return house.house_id;
  } catch (error) {
    // 捕获异常
    if (error instanceof Error && error.message === "未找到该鸽舍号") {
      // 处理未找到鸽舍号的错误
      throw new Error("未找到该鸽舍号");
      // return res.status(404).json({ error: "未找到该鸽舍号" });
      // return Result.JsonResponse(200, 404, "未找到该鸽舍号", res, "error");
    }
    console.error(error);
    console.log("未找到该鸽舍号");
  }
};
//------------------------------
exports.notExist = async (siteId, houseId) => {
  try {
    // console.log("siteId:" + siteId + " houseId:" + houseId);
    let house = await House.findOne({
      where: {
        nfc_id: houseId,
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
        where: {
          site_id: siteId,
        },
        raw: true,
      });
      console.log(maxHouseId);
      //如果是新仓，从1开始
      maxHouseId = maxHouseId ? maxHouseId : 0;
      console.log(maxHouseId + 1);
      await House.create({
        site_id: siteId,
        nfc_id: houseId,
        house_id: maxHouseId + 1,
      }).then(() => {
        console.log("已记录house表");
      });

      house = await House.findOne({
        where: {
          nfc_id: houseId,
        },
      });
    }
    // console.log(house.house_id)
    return house.house_id;
  } catch (error) {
    console.error(error);
    console.log("nfcId映射错误");
  }
};

exports.getNFCId = async (siteId, houseId) => {
  try {
    let house = await House.findOne({
      where: {
        site_id: siteId,
        house_id: houseId,
      },
    });
    return house.nfc_id;
  } catch (error) {
    console.error(error);
    console.log("nfcId映射错误");
  }
};
