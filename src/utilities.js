function convertMsToTime(milliseconds) {
  // source: https://bobbyhadz.com/blog/javascript-convert-milliseconds-to-hours-minutes-seconds
  let seconds = Math.floor(milliseconds / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  seconds = seconds % 60;
  minutes = minutes % 60;
  hours = hours % 24;

  if (days > 0) {
    return `${days} 天`;
  }
  if (hours > 0) {
    return `${hours} 小時`;
  }
  if (minutes > 0) {
    return `${minutes} 分鐘`;
  }
  return `${seconds} 秒`;
}

function countTimeDiff(time) {
  const createdTime = new Date(Date.parse(time));
  const now = new Date();
  const timeDiff = now - createdTime;
  return convertMsToTime(timeDiff);
}

function getConvertedTime(time) {
  const createdTime = new Date(time);
  const year = createdTime.getFullYear();
  const month = createdTime.getMonth() + 1;
  const date = createdTime.getDate();
  const hour = createdTime.getHours();
  const morningOrAfternoon = hour > 12 ? '下午' : '上午';
  const minutes = createdTime.getMinutes();
  const convertedDate = `${year}年${month}月${date}日`;
  const convertedTime = `${morningOrAfternoon} ${String(hour).padStart(
    2,
    '0'
  )}:${String(minutes).padStart(2, '0')}`;
  return { convertedDate, convertedTime };
}

export { countTimeDiff, getConvertedTime };
