exports.JsonResponse = (statuCode, code, msg, res, type) => {
  res.status(statuCode).json({
    code: code,
    msg: msg,
    type: type
  })
}