const moment = require("moment");

exports.regionTime = (time) => {
  const newTime = moment(time).add(8, "hours").format("YYYY-MM-DD HH:mm:ss");
  return newTime;
};
