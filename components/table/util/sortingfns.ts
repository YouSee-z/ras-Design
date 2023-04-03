import { SortingFn } from "../type";

export const reSplitAlphaNumeric = /([0-9]+)/gm;

const alphanumeric: SortingFn<any> = (rowA, rowB, columnId) => {
  return compareAlphanumeric(
    toString(rowA.getValue(columnId)).toLowerCase(),
    toString(rowB.getValue(columnId)).toLowerCase()
  );
};

const alphanumericCaseSensitive: SortingFn<any> = (rowA, rowB, columnId) => {
  return compareAlphanumeric(
    toString(rowA.getValue(columnId)),
    toString(rowB.getValue(columnId))
  );
};

// The text filter is more basic (less numeric support)
// but is much faster
// 文本过滤更基本且更快
const text: SortingFn<any> = (rowA, rowB, columnId) => {
  return compareBasic(
    toString(rowA.getValue(columnId)).toLowerCase(),
    toString(rowB.getValue(columnId)).toLowerCase()
  );
};

// 分辨大小写
const textCaseSensitive: SortingFn<any> = (rowA, rowB, columnId) => {
  return compareBasic(
    toString(rowA.getValue(columnId)),
    toString(rowB.getValue(columnId))
  );
};

const datetime: SortingFn<any> = (rowA, rowB, columnId) => {
  const a = rowA.getValue<Date>(columnId);
  const b = rowB.getValue<Date>(columnId);

  // Can handle nullish values
  // Use > and < because == (and ===) doesn't work with
  // Date objects (would require calling getTime()).
  // 可以处理空值
  // 使用 > 和 < 因为 ==（和 ===）不能用于日期对象（需要调用 getTime()）。
  return a > b ? 1 : a < b ? -1 : 0;
};

const basic: SortingFn<any> = (rowA, rowB, columnId) => {
  return compareBasic(rowA.getValue(columnId), rowB.getValue(columnId));
};

// Utils

function compareBasic(a: any, b: any) {
  return a === b ? 0 : a > b ? 1 : -1;
}

function toString(a: any) {
  if (typeof a === "number") {
    if (isNaN(a) || a === Infinity || a === -Infinity) {
      return "";
    }
    return String(a);
  }
  if (typeof a === "string") {
    return a;
  }
  return "";
}

// 混合排序很慢，但包含多种边缘情况。
// 它处理数字、混合的字母数字组合，甚至
// null、undefined 和 Infinity
function compareAlphanumeric(aStr: string, bStr: string) {
  // 拆分数字组，但保留分隔符
  // 然后移除错误的分割值
  const a = aStr.split(reSplitAlphaNumeric).filter(Boolean);
  const b = bStr.split(reSplitAlphaNumeric).filter(Boolean);

  // While
  while (a.length && b.length) {
    const aa = a.shift()!;
    const bb = b.shift()!;

    const an = parseInt(aa, 10);
    const bn = parseInt(bb, 10);

    const combo = [an, bn].sort();

    // 都为字符串情况
    if (isNaN(combo[0]!)) {
      if (aa > bb) {
        return 1;
      }
      if (bb > aa) {
        return -1;
      }
      continue;
    }

    // One is a string, one is a number
    // 一个为字符串，一个为数字
    if (isNaN(combo[1]!)) {
      return isNaN(an) ? -1 : 1;
    }
    // 都为数字情况  考虑二者相同
    // Both are numbers
    if (an > bn) {
      return 1;
    }
    if (bn > an) {
      return -1;
    }
  }

  return a.length - b.length;
}

// 排序函数
export const sortingFns = {
  alphanumeric,
  alphanumericCaseSensitive,
  text,
  textCaseSensitive,
  datetime,
  basic,
};

export type BuiltInSortingFn = keyof typeof sortingFns;
