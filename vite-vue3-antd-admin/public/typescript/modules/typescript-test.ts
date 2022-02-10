// 1. 给出如下地址数据格式，实现函数 getNameById，输入address 和 id ，输出 id 对应的地址 name
const address = [
  {
    id: 1,
    name: '北京市',
    children: [
      {
        id: 11,
        name: '海淀区',
        children: [
          {
            id: 111,
            name: '中关村',
          }
        ]
      },
      {
        id: 12,
        name: '朝阳区',
      },
    ],
  },
  {
    id: 2,
    name: '河北省'
  }
]

// 输入：getNameById(address, 2)，输出："河北省"
// 输入：getNameById(address, 111)，输出："中关村"
// 输入：getNameById(address, 32)，输出："" （未查找到，输出空字符串）
function getNameById(address: Array<any>, id: number): boolean {
  // 在这里实现你的代码
  let idChar: Array<string> = id.toString().split(''), tempArr: Array<any> = address
  for (let i: number = 0; i < idChar.length; i++) {
    let filterArr: Array<any> = tempArr.filter((element: any) => {
      return element!.id.toString().split('')[i] === idChar[i]
    })
    if (idChar.length === i + 1) {
      console.log(filterArr[0].name)
      return true
    }
    if (filterArr.length === 0) {
      console.log('')
      return false
    }
    tempArr = filterArr[0].children
  }
}
getNameById(address, 2)
getNameById(address, 111)
getNameById(address, 32)