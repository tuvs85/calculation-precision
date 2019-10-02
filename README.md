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