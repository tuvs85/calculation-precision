[calculation-precision gitHub链接](https://github.com/tuvs85/calculation-precision)
### BigNumber 默认配置 
```
BigNumber.config({ ROUNDING_MODE: 1})
//禁用了四舍五入功能 只直取
//如果有其他配置需求请观看bigNumber官方文档
```
[BigNumber官方文档](https://github.com/MikeMcl/bignumber.js)

### install 使用
```npm
$ npm install calculation-precision
```
```yarn
$ yarn add calculation-precision
```

### use 使用
#### es5
```
//全部引用
const CalculationPrecision = require('calculation-precision')
```
#### es6
```
//全部引用
import calculationPrecision from 'calculation-precision'
//按需引用
import {accDiv, accMul, accAdd, subtr, BigNumber as bigNumber} from 'calculation-precision'
```

### 介绍
>包代码是网上搜索后修改加上自己使用后的处理
#### 四则计算公式使用源码介绍
>使用了bigNumberJs精度处理库进行显示精度处理，如果没使用bigNumberjs做处理的话会计算出科学计算方式，这样在页面上显示非常不友好，所以这里特意做了处理

```
import BigNumber from 'bignumber.js'
BigNumber.config({ ROUNDING_MODE: 1})
//除法
function accDiv (arg1,arg2) {
  var t1=0,t2=0,r1,r2;
  try{t1=arg1.toString().split(".")[1].length}catch(e){}
  try{t2=arg2.toString().split(".")[1].length}catch(e){}
  r1=Number(arg1.toString().replace(".",""))
  r2=Number(arg2.toString().replace(".",""))
  return BigNumber(accMul((r1/r2), Math.pow(10,t2-t1))).toFixed();
}
//乘法
function accMul (arg1,arg2 ) {
  var m=0,s1=arg1.toString(),s2=arg2.toString();
  try{m+=s1.split(".")[1].length}catch(e){}
  try{m+=s2.split(".")[1].length}catch(e){}
  return BigNumber(Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)).toFixed();
}
//加法
function accAdd (arg1,arg2){
  var r1,r2,m;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2))
  return BigNumber((arg1*m+arg2*m)/m).toFixed();
}
//减法
function subtr(arg1,arg2){
  var r1,r2,m,n;
  try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
  try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
  m=Math.pow(10,Math.max(r1,r2));
  n=(r1>=r2)?r1:r2;
  return BigNumber(((arg1*m-arg2*m)/m).toFixed(n)).toFixed();
}

//科学计算方式显示处理
//bigNumber显示精度处理
function bigNumberToFixed(num, dec){
  return BigNumber(num).toFixed(dec)
}

//数值格式化， 千、百、万。。/ k、m、g、t....
//默认使用    ["", "K", "M", "G", "T", "P", "E"]
export const nFormatter = {
  config: ["", "K", "M", "G", "T", "P", "E"],
  nFormatterFun: function(num, digits) {
    const si = [
      { value: 1, symbol: this.config[0] },
      { value: 1e3, symbol: this.config[1] },
      { value: 1e6, symbol: this.config[2] },
      { value: 1e9, symbol: this.config[3] },
      { value: 1e12, symbol: this.config[4] },
      { value: 1e15, symbol: this.config[5] },
      { value: 1e18, symbol: this.config[6] }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return BigNumber((num / si[i].value)).toFixed(digits).replace(rx, "$1") + si[i].symbol;
    // return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }
};
```

#### use
```
//乘法
  //代码直接计算
  0.0001 * 0.0002 // 2e-8
  //使用方法计算
  accMul(0.1, 0.2) // 0.0000000002
```
```
//加法
  //代码直接计算
  0.1 + 0.2 // 0.30000000000000004
  //使用方法计算
  accAdd(0.1, 0.2) // 0.3
```
```
//除法
  //代码直接计算
  0.00004 / 0.00003 // 1.3333333333333335
  //使用方法计算
  accDiv(0.00004, 0.00003) // 1.3333333333333333
```
```
//减法
  //代码直接计算
  0.0004 - 0.0001 // 0.00030000000000000003
  //使用方法计算
  subtr(0.0004, 0.0001) // 0.0003
```
```
//bigNumber显示精度处理
//后台数据库给过来的数据
  {
    ...,
    price: 1e-10,
    ....
  }
  //这时候拿到的数据正常情况下（不排除有给高校或者某些研究机构做的需求就不需要处理）是不能直接现实在前台页面，需要处理一下，这里我用了bigNumber.js直接转换显示
  bigNumberToFixed(*.price) // "0.0000000001"

//数值格式化显示：
//修改默认格式化列表，
nFormatter.config = ['', '千','十万','千万','亿','百亿','万亿']
/
nFormatter.config = ["", "K", "M", "G", "T", "P", "E"] //default
//演示使用k m g t p e
  nFormatter.nFormatterFun(111.1111111111,2)//111.11
  nFormatter.nFormatterFun(1111111111.111,2)//11.11G
  nFormatter.nFormatterFun(111111111111111.111111,2)//111.11T
```