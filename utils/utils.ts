import { NoInfer } from "@rasDesign/types";
type ComputeRange<
  N extends number,
  Result extends Array<unknown> = []
> = Result["length"] extends N
  ? Result
  : ComputeRange<N, [...Result, Result["length"]]>;
type Index40 = ComputeRange<40>[number];



// memo
export function memo<TDeps extends readonly any[], TResult>(
  getDeps: () => [...TDeps],
  fn: (...args: NoInfer<[...TDeps]>) => TResult,
  options: {
    key: any;
    debug?: () => any;
    onChange?: (result: TResult) => void;
  }
): () => TResult {
  let deps: any[] = [];
  let result: TResult | undefined;

  return () => {
    let depTime: number;
    if (options.key && options.debug) depTime = Date.now();

    const newDeps = getDeps();

    const depsChanged =
      newDeps.length !== deps.length ||
      newDeps.some((dep: any, index: number) => deps[index] !== dep);

    if (!depsChanged) {
      return result!;
    }

    deps = newDeps;

    let resultTime: number;
    if (options.key && options.debug) resultTime = Date.now();

    result = fn(...newDeps);
    options?.onChange?.(result);

    if (options.key && options.debug) {
      if (options?.debug()) {
        const depEndTime = Math.round((Date.now() - depTime!) * 100) / 100;
        const resultEndTime =
          Math.round((Date.now() - resultTime!) * 100) / 100;
        const resultFpsPercentage = resultEndTime / 16;

        const pad = (str: number | string, num: number) => {
          str = String(str);
          while (str.length < num) {
            str = " " + str;
          }
          return str;
        };

        console.info(
          `%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`,
          `
              font-size: .6rem;
              font-weight: bold;
              color: hsl(${Math.max(
                0,
                Math.min(120 - 120 * resultFpsPercentage, 120)
              )}deg 100% 31%);`,
          options?.key
        );
      }
    }

    return result!;
  };
}
