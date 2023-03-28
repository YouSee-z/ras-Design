export type NoInfer<T> = [T][T extends any ? 0 : never];

export type Getter<TValue> = <TTValue = TValue>() => NoInfer<TTValue>;

export type IsTuple<T> = T extends readonly any[] & { length: infer Length }
  ? Length extends Index40
    ? T
    : never
  : never;
