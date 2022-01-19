// 1. 布尔值 
let isDone: boolean = false;
// 2.  数字 
let decLiteral: number = 6;
// 3.  字符串 
let name1: string = "bob";
// 4.  数组 
let list1: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
// 5.  元组（1. 有序， 2. 可以在数组中放置多种数据类型） 
let x: [string, number];
// 6.  枚举（规范对象数据类型） 
enum Color { Red, Green, Blue }
let c: Color = Color.Green;
// 7.  任意 
let notSure: any = 4;
// 8.  函数（void 只能为它赋予undefined和null） 
function warnUser(): void { }
// 9.  用不存在 never
// 10.  对象 object
// 11.  对象断言 
let someValue: any = "this is a string";
let strLength1: number = (<string>someValue).length;
let strLength2: number = (someValue as string).length;
// 12.  接口 
interface LabelledValue { 
  readonly label?: string;
  [propName: string]: any 
}
// 13.  只读数组 ReadonlyArray 只能在创建赋值，不可修改，不可赋值给其他类型数组
// 14.  字符串索引[propName: string]: any;
// 15.  接口修饰函数 
interface SearchFunc { 
  (source: string, subString: string): boolean; 
}
// 16.  实现接口
// 17.  继承接口
// 18.  混合类型
// 19.  接口继承类
// 20.  public 所有都可以访问
// 21.  private 只能在当前类访问
// 22.  protected 在派生类中可以访问
// 23.  静态属性 通过类名访问
// 24.  抽象类