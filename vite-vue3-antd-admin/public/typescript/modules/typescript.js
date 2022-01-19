// 1. 布尔值 
var isDone = false;
// 2.  数字 
var decLiteral = 6;
// 3.  字符串 
var name1 = "bob";
// 4.  数组 
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
// 5.  元组（1. 有序， 2. 可以在数组中放置多种数据类型） 
var x;
// 6.  枚举（规范对象数据类型） 
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Green;
// 7.  任意 
var notSure = 4;
// 8.  函数（void 只能为它赋予undefined和null） 
function warnUser() { }
// 9.  用不存在 never
// 10.  对象 object
// 11.  对象断言 
var someValue = "this is a string";
var strLength1 = someValue.length;
var strLength2 = someValue.length;
// 16.  实现接口
// 17.  继承接口
// 18.  混合类型
// 19.  接口继承类
// 20.  public 所有都可以访问
// 21.  private 只能在当前类访问
// 22.  protected 在派生类中可以访问
// 23.  静态属性 通过类名访问
// 24.  抽象类
