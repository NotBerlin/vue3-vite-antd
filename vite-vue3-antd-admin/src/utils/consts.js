export function YoR (string, number) {
  let arr = string.split(',')
  let options = []
  arr.forEach(element => {
    options.push({
      label: element.split('=')[0],
      value: element.split('=')[1] === '' ? '' : number ? parseInt(element.split('=')[1]) : element.split('=')[1]
    })
  });
  return options
}

function dateObject2DateString (obj) {
  let year = obj.getFullYear()
  let month = obj.getMonth() + 1
  let day = obj.getDate()
  let str = year + '-'
  if (month < 10) {
    str += '0'
  }
  str += month + '-'
  if (day < 10) {
    str += '0'
  }
  str += day
  return { str, year, month, day }
}

export function formmatDate (arr) {
  let startTime = dateObject2DateString(arr[0])
  let endTime = dateObject2DateString(arr[1])
  if (startTime.month !== endTime.month) {
    // ElMessage({ type: 'error', message: '只能查询一个月' })
    return false
  }
  return { startTime: startTime.str, endTime: endTime.str }
}

export function initDate () {
  let endTime = dateObject2DateString(new Date())
  let startTime = endTime.year + '-'
  if (endTime.month < 10) {
    startTime += '0'
  }
  startTime += endTime.month + '-'
  startTime += '01'
  return { startTime: new Date(startTime), endTime: new Date(endTime.str) }
}