exports.houseIdMiddleWare = (req, res, next) => {
  let houseId = req.body.houseId || req.query.houseId
  // 对获取的houseId进行映射处理
  if (req.body && req.body.houseId) {
    // 将 houseId 值修改为新的值
    if (houseId == 30) {
      req.body.houseId = 1
    } else if (houseId == 403) {
      req.body.houseId = 2
    } else if (houseId == 667049) {
      req.body.houseId = 3
    } else if (houseId == 1000000) {
      req.body.houseId = 4
    }
  } else if (req.query && req.query.houseId) {
    if (houseId == 30) {
      req.query.houseId = 1
    } else if (houseId == 403) {
      req.query.houseId = 2
    } else if (houseId == 667049) {
      req.query.houseId = 3
    } else if (houseId == 1000000) {
      req.query.houseId = 4
    }
  }

  // 将请求传递给下一个中间件或路由处理程序
  next()
}