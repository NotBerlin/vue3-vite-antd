// base64转blob对象
function dataBase64toBlob (dataurl) {
  var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

// blob转url
function dataBlobtoURL (blob) {
  var Url = URL.createObjectURL(blob)
  return Url
}

// base64转文件
function dataBase64toFile (dataurl, filename) {
  var arr = dataurl.split(','),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, {
    type: mime
  });
}

function getType(file) {
  var filename = file;
  var index1 = filename.lastIndexOf(".");
  var index2 = filename.length;
  var type = filename.substring(index1 + 1, index2);
  return type;
}

// JS转Base64之后的data类型
function getBase64Type(type) {
  switch (type) {
    case 'txt': return 'data:text/plain;base64,';
    case 'doc': return 'data:application/msword;base64,';
    case 'docx': return 'data:application/vnd.openxmlformats-officedocument.wordprocessingml.document;base64,';
    case 'xls': return 'data:application/vnd.ms-excel;base64,';
    case 'xlsx': return 'data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,';
    case 'pdf': return 'data:application/pdf;base64,';
    case 'pptx': return 'data:application/vnd.openxmlformats-officedocument.presentationml.presentation;base64,';
    case 'ppt': return 'data:application/vnd.ms-powerpoint;base64,';
    case 'png': return 'data:image/png;base64,';
    case 'jpg': return 'data:image/jpeg;base64,';
    case 'gif': return 'data:image/gif;base64,';
    case 'svg': return 'data:image/svg+xml;base64,';
    case 'ico': return 'data:image/x-icon;base64,';
    case 'bmp': return 'data:image/bmp;base64,';
  }
}

export default {
  getType,
  getBase64Type,
  dataBase64toFile,
  dataBase64toBlob,
  dataBlobtoURL,
}