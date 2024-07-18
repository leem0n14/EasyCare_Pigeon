// const os = require('os')
// const cpuCores = os.cpus().length
// const si = require('systeminformation')

// exports.cpuInfo = () => {
//   console.log(`CPU核心数: ${cpuCores}`)

//   // 获取系统信息
//   si.system()
//     .then(data => {
//       console.log(data)
//     })
//     .catch(error => {
//       console.error(error)
//     })

//   // 获取CPU信息
//   si.cpu()
//     .then(data => {
//       console.log(data)
//     })
//     .catch(error => {
//       console.error(error)
//     })
// }