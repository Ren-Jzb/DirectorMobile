const formatTime = (date, type) => {
  try{

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    switch (type) {
      case 1: // yyyy-MM-dd
        return [year, month, day].map(formatNumber).join('-');
      case 2: // yyyy.MM.dd
        return [year, month, day].map(formatNumber).join('.');
      case 3: // yyyy/MM/dd
        return [year, month, day].map(formatNumber).join('/');
      case 4: // yyyy年MM月dd日
        return year + "年" + month + "月" + day + "日";
      case 5: // yyyy-MM-dd HH:mm:ss
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute, second].map(formatNumber).join(':');
      case 6: // yyyy.MM.dd HH:mm:ss
        return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute, second].map(formatNumber).join(':');
      case 7: // yyyy/MM/dd HH:mm:ss
        return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':');
      case 8: // yyyy-MM-dd HH:mm
        return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
      case 9: // yyyy.MM.dd HH:mm
        return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute].map(formatNumber).join(':');
      case 10: // yyyy.MM.dd HH:mm
        return [year, month, day].map(formatNumber).join('.') + ' ' + [hour, minute].map(formatNumber).join(':');
      case 11: // MM-dd
        return [month, day].map(formatNumber).join('-');
      case 12: // HH:mm
        return [hour, minute].map(formatNumber).join(':');
      default:
        return "";
    }

  } catch (e) {
    return "";
  }
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
