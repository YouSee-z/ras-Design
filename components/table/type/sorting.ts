import { RowData, Row, OnChangeFn, SortingFns, Table, RowModel } from ".";
import { BuiltInSortingFn } from "../util";
import { Updater } from "types";
export type SortDirection = "asc" | "desc";

export interface ColumnSort {
  id: string;
  desc: boolean;
}

export type SortingState = ColumnSort[];

export interface SortingTableState {
  sorting: SortingState;
}

export interface SortingFn<TData extends RowData> {
  (rowA: Row<TData>, rowB: Row<TData>, columnId: string): number;
}

export type CustomSortingFns<TData extends RowData> = Record<
  string,
  SortingFn<TData>
>;

export type SortingFnOption<TData extends RowData> =
  | "auto"
  | keyof SortingFns
  | BuiltInSortingFn
  | SortingFn<TData>;

export interface SortingColumn<TData extends RowData> {
  getAutoSortingFn: () => SortingFn<TData>;
  getAutoSortDir: () => SortDirection;
  getSortingFn: () => SortingFn<TData>;
  getFirstSortDir: () => SortDirection;
  getNextSortingOrder: () => SortDirection | false;
  getCanSort: () => boolean;
  getCanMultiSort: () => boolean;
  getSortIndex: () => number;
  getIsSorted: () => false | SortDirection;
  clearSorting: () => void;
  toggleSorting: (desc?: boolean, isMulti?: boolean) => void;
  getToggleSortingHandler: () => undefined | ((event: unknown) => void);
}

export interface SortingColumnDef<TData extends RowData> {
  sortingFn?: SortingFnOption<TData>;
  sortDescFirst?: boolean;
  enableSorting?: boolean;
  enableMultiSort?: boolean;
  invertSorting?: boolean;
  sortUndefined?: false | -1 | 1;
}

export interface SortingOptionsBase {
  manualSorting?: boolean;
  onSortingChange?: OnChangeFn<SortingState>;
  enableSorting?: boolean;
  enableSortingRemoval?: boolean;
  enableMultiRemove?: boolean;
  enableMultiSort?: boolean;
  sortDescFirst?: boolean;
  getSortedRowModel?: (table: Table<any>) => () => RowModel<any>;
  maxMultiSortColCount?: number;
  isMultiSortEvent?: (e: unknown) => boolean;
}

export type ResolvedSortingFns = keyof SortingFns extends never
  ? {
      sortingFns?: Record<string, SortingFn<any>>;
    }
  : {
      sortingFns: Record<keyof SortingFns, SortingFn<any>>;
    };

export interface SortingInstance<TData extends RowData> {
  setSorting: (updater: Updater<SortingState>) => void;
  resetSorting: (defaultState?: boolean) => void;
  getPreSortedRowModel: () => RowModel<TData>;
  getSortedRowModel: () => RowModel<TData>;
  _getSortedRowModel?: () => RowModel<TData>;
}
