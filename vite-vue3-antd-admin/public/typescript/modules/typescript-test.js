// 1. 给出如下地址数据格式，实现函数 getNameById，输入address 和 id ，输出 id 对应的地址 name
var address = [
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
                        name: '中关村'
                    }
                ]
            },
            {
                id: 12,
                name: '朝阳区'
            },
        ]
    },
    {
        id: 2,
        name: '河北省'
    }
];
// 输入：getNameById(address, 2)，输出："河北省"
// 输入：getNameById(address, 111)，输出："中关村"
// 输入：getNameById(address, 32)，输出："" （未查找到，输出空字符串）
function getNameById(address, id) {
    // 在这里实现你的代码
    var idChar = id.toString().split(''), tempArr = address;
    var _loop_1 = function (i) {
        debugger;
        var filterArr = tempArr.filter(function (element) {
            return element.id.toString().split('')[i] === idChar[i];
        });
        if (idChar.length === i + 1) {
            console.log(filterArr[0].name);
            return { value: true };
        }
        if (filterArr.length === 0) {
            console.log('');
            return { value: false };
        }
        tempArr = filterArr[0].children;
    };
    for (var i = 0; i < idChar.length; i++) {
        var state_1 = _loop_1(i);
        if (typeof state_1 === "object")
            return state_1.value;
    }
}
getNameById(address, 2);
getNameById(address, 111);
getNameById(address, 32);
