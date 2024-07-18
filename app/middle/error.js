const Result = require("../utils/response")
exports.errorHandler = (err, req, res, next) => {


  // 未知错误
  console.log(err)
  return Result.JsonResponse(500, 500, "未知错误", res, "error")

  // next()
}