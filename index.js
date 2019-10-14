import BigNumber from "bignumber.js";
BigNumber.config({ ROUNDING_MODE: 1 });
//除法
export function accDiv(arg1, arg2) {
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    t1 = String(arg1)
      .toString()
      .split(".")[1].length;
  }
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    t2 = String(arg2).toString().split(".")[1].length;
  }
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return BigNumber(accMul(r1 / r2, Math.pow(10, t2 - t1))).toFixed();
}
//乘法
export function accMul(arg1, arg2) {
  var m = 0,
    s1,
    s2;
  try {
    s1 = arg1.toString();
  } catch (e) {
    s1 = String(arg1).toString();
  }
  try {
    s2 = arg2.toString();
  } catch (e) {
    s2 = String(arg2).toString();
  }
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return BigNumber(
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
      Math.pow(10, m)
  ).toFixed();
}
//加法
export function accAdd(arg1, arg2) {
  var r1, r2, m;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = String(arg1).toString().split(".")[1].length;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = String(arg2).toString().split(".")[1].length;
  }
  m = Math.pow(10, Math.max(r1, r2));
  return BigNumber((arg1 * m + arg2 * m) / m).toFixed();
}
//减法
export function subtr(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = String(arg1).toString().split(".")[1].length;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = String(arg2).toString().split(".")[1].length;
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = r1 >= r2 ? r1 : r2;
  return BigNumber(((arg1 * m - arg2 * m) / m).toFixed(n)).toFixed();
}
//bigNumber显示精度处理
export function bigNumberToFixed(num, dec) {
  return BigNumber(num).toFixed(dec);
}

export default {
  BigNumber,
  accDiv,
  accMul,
  accAdd,
  subtr,
  bigNumberToFixed
};
