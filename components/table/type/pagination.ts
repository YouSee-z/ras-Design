import { Updater } from "types";
import { OnChangeFn, Table, RowModel, RowData } from "./index";

export interface PaginationState {
  pageIndex: number;
  pageSize: number;
}

export interface PaginationTableState {
  pagination: PaginationState;
}

export interface PaginationInitialTableState {
  pagination?: Partial<PaginationState>;
}

export interface PaginationDefaultOptions {
  onPaginationChange: OnChangeFn<PaginationState>;
}

export interface PaginationInstance<TData extends RowData> {
  _autoResetPageIndex: () => void;
  setPagination: (updater: Updater<PaginationState>) => void;
  resetPagination: (defaultState?: boolean) => void;
  setPageIndex: (updater: Updater<number>) => void;
  resetPageIndex: (defaultState?: boolean) => void;
  setPageSize: (updater: Updater<number>) => void;
  resetPageSize: (defaultState?: boolean) => void;
  setPageCount: (updater: Updater<number>) => void;
  getPageOptions: () => number[];
  getCanPreviousPage: () => boolean;
  getCanNextPage: () => boolean;
  previousPage: () => void;
  nextPage: () => void;
  getPrePaginationRowModel: () => RowModel<TData>;
  getPaginationRowModel: () => RowModel<TData>;
  _getPaginationRowModel?: () => RowModel<TData>;
  getPageCount: () => number;
}
