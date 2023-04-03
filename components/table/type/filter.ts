import { RowData, Row, Column, FilterFns, RowModel, SortingState } from ".";
import { BuiltInFilterFn } from "../util";
import { Updater } from "@rasDesign/types";

export interface FilterMeta {}

// column 过滤项
export interface ColumnFilter {
  id: string;
  value: unknown;
}

// state 状态[]

export type ColumnFiltersState = ColumnFilter[];

//过滤函数 Options
export type FilterFnOption<TData extends RowData> =
  | "auto"
  | BuiltInFilterFn
  | keyof FilterFns
  | FilterFn<TData>;

export interface FiltersTableState {
  columnFilters: ColumnFiltersState;
  globalFilter: any;
}

export interface ResolvedColumnFilter<TData extends RowData> {
  id: string;
  resolvedValue: unknown;
  filterFn: FilterFn<TData>;
}

export interface FilterFn<TData extends RowData> {
  (
    row: Row<TData>,
    columnId: string,
    filterValue: any,
    addMeta: (meta: FilterMeta) => void
  ): boolean;

  resolveFilterValue?: TransformFilterValueFn<TData>;
  autoRemove?: ColumnFilterAutoRemoveTestFn<TData>;
}

export type TransformFilterValueFn<TData extends RowData> = (
  value: any,
  column?: Column<TData, unknown>
) => unknown;

export type ColumnFilterAutoRemoveTestFn<TData extends RowData> = (
  value: any,
  column?: Column<TData, unknown>
) => boolean;

export type CustomFilterFns<TData extends RowData> = Record<
  string,
  FilterFn<TData>
>;

export type ResolvedFilterFns = keyof FilterFns extends never
  ? {
      filterFns?: Record<string, FilterFn<any>>;
    }
  : {
      filterFns: Record<keyof FilterFns, FilterFn<any>>;
    };

export interface FiltersColumnDef<TData extends RowData> {
  filterFn?: FilterFnOption<TData>;
  enableColumnFilter?: boolean;
  enableGlobalFilter?: boolean;
}

export interface FiltersRow<TData extends RowData> {
  columnFilters: Record<string, boolean>;
  columnFiltersMeta: Record<string, FilterMeta>;
}

export interface FiltersColumn<TData extends RowData> {
  getAutoFilterFn: () => FilterFn<TData> | undefined;
  getFilterFn: () => FilterFn<TData> | undefined;
  setFilterValue: (updater: Updater<any>) => void;
  getCanFilter: () => boolean;
  getCanGlobalFilter: () => boolean;
  getFacetedRowModel: () => RowModel<TData>;
  _getFacetedRowModel?: () => RowModel<TData>;
  getIsFiltered: () => boolean;
  getFilterValue: () => unknown;
  getFilterIndex: () => number;
  getFacetedUniqueValues: () => Map<any, number>;
  _getFacetedUniqueValues?: () => Map<any, number>;
  getFacetedMinMaxValues: () => undefined | [number, number];
  _getFacetedMinMaxValues?: () => undefined | [number, number];
}

export interface SortingInstance<TData extends RowData> {
  setSorting: (updater: Updater<SortingState>) => void;
  resetSorting: (defaultState?: boolean) => void;
  getPreSortedRowModel: () => RowModel<TData>;
  getSortedRowModel: () => RowModel<TData>;
  _getSortedRowModel?: () => RowModel<TData>;
}

//


export interface FiltersInstance<TData extends RowData> {
  setColumnFilters: (updater: Updater<ColumnFiltersState>) => void

  resetColumnFilters: (defaultState?: boolean) => void

  // Column Filters
  getPreFilteredRowModel: () => RowModel<TData>
  getFilteredRowModel: () => RowModel<TData>
  _getFilteredRowModel?: () => RowModel<TData>

  // Global Filters
  setGlobalFilter: (updater: Updater<any>) => void
  resetGlobalFilter: (defaultState?: boolean) => void
  getGlobalAutoFilterFn: () => FilterFn<TData> | undefined
  getGlobalFilterFn: () => FilterFn<TData> | undefined
  getGlobalFacetedRowModel: () => RowModel<TData>
  _getGlobalFacetedRowModel?: () => RowModel<TData>
  getGlobalFacetedUniqueValues: () => Map<any, number>
  _getGlobalFacetedUniqueValues?: () => Map<any, number>
  getGlobalFacetedMinMaxValues: () => undefined | [number, number]
  _getGlobalFacetedMinMaxValues?: () => undefined | [number, number]
}

