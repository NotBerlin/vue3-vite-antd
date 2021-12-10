function downloadFile (url, name = 'What\'s the fuvk') {
  var a = document.createElement("a")
  a.setAttribute("href", url)
  a.setAttribute("download", name)
  a.setAttribute("target", "_blank")
  let clickEvent = document.createEvent("MouseEvents");
  clickEvent.initEvent("click", true, true);
  a.dispatchEvent(clickEvent);
}


export default {
  downloadFile,
}