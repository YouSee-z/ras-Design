import { TableState, RowData, ColumnHelper, ColumnDef } from "../type";

import { Updater } from "@rasDesign/types";

export * from "./filterfns";
export * from "./sortingfns";
export * from "./aggregationFn";

export function functionalUpdate<T>(updater: Updater<T>, input: T): T {
  return typeof updater === "function"
    ? (updater as (input: T) => T)(input)
    : updater;
}

export function makeStateUpdater<K extends keyof TableState>(
  key: K,
  instance: unknown
) {
  return (updater: Updater<TableState[K]>) => {
    (instance as any).setState(<TTableState>(old: TTableState) => {
      return {
        ...old,
        [key]: functionalUpdate(updater, (old as any)[key]),
      };
    });
  };
}

type AnyFunction = (...args: any) => any;

export function isFunction<T extends AnyFunction>(d: any): d is T {
  return d instanceof Function;
}

export function createColumnHelper<
  TData extends RowData
>(): ColumnHelper<TData> {
  return {
    accessor: (accessor, column) => {
      return typeof accessor === "function"
        ? ({
            ...column,
            accessorFn: accessor,
          } as any)
        : {
            ...column,
            accessorKey: accessor,
          };
    },
    display: (column) => column as ColumnDef<TData, unknown>,
    group: (column) => column as ColumnDef<TData, unknown>,
  };
}
