// 网络连接错误提示信息
export const HTTP_ERROR_MESSAGE = '系统出小差了，请联系管理员处理 ≧﹏≦'
// 提示信息停留时间
export const ELEMENT_MESSAGE_DURATION = 3000
// 前台存储的token字段名
export const AUTH_TOKEN_FRONT = '_PEACH_TOKEN_HOSPITAL'
// 后台存储的token字段名
export const AUTH_TOKEN_END = 'Token'
// 允许的图片类型列表
export const UPLOAD_IMAGE_TYPE = [
  'bmp',
  'jpg',
  'jpeg',
  'png',
  'tif',
  'gif',
  'pcx',
  'tga',
  'exif',
  'fpx',
  'svg',
  'psd',
  'cdr',
  'pcd',
  'dxf',
  'ufo',
  'eps,',
  'ai,',
  'raw',
  ',WMF',
  'webp'
]
// 上传图片的最大大小，单位：MB
export const UPLOAD_IMAGE_MAX_SIZE = 10
// 正则表达式：身份证号
export const REGULAR_EXPRESSION_IDNUMBER = /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/
