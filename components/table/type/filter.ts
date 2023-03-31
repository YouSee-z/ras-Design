import { RowData, Row, Column, FilterFns } from "./index.d";
import { BuiltInFilterFn } from "../util";

export interface FilterMeta {}

export interface ColumnFilter {
  id: string;
  value: unknown;
}

export type ColumnFiltersState = ColumnFilter[];

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
