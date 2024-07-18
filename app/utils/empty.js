exports.checkAllValues = (obj) => {
  if (JSON.stringify(obj) === '{}') return false
  console.log("----------------------------------------")
  // console.log(typeof (obj.houseId))
  for (let key in obj) {
    // 如果任何一个属性值为 null、空字符串或 undefined，则返回 false
    if (obj[key] === null || obj[key] === "" || obj[key] === undefined || obj[key] === "undefined" || (typeof (obj.houseId) !== "number" && typeof (obj.houseId) !== "string")) {
      return false
    }
  }

  // 所有属性值都不为空，则返回 true
  return true

}