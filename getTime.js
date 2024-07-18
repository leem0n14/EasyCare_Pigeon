// 格式化日对象
export const getNowDate = () => {
  const date = new Date();
  const sign2 = ':';
  const year = date.getFullYear(); // 年
  let month = date.getMonth() + 1; // 月
  let day = date.getDate(); // 日
  let hour = date.getHours(); // 时
  let minutes = date.getMinutes(); // 分
  let seconds = date.getSeconds(); // 秒
  // 给一位数的数据前面加 “0”
  if (month >= 1 && month <= 9) {
    month = `0${month}`;
  }
  if (day >= 0 && day <= 9) {
    day = `0${day}`;
  }
  if (hour >= 0 && hour <= 9) {
    hour = `0${hour}`;
  }
  if (minutes >= 0 && minutes <= 9) {
    minutes = `0${minutes}`;
  }
  if (seconds >= 0 && seconds <= 9) {
    seconds = `0${seconds}`;
  }
  return `${year}-${month}-${day} ${hour}:${minutes}:${seconds}`;
};
