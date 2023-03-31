import { RowData, OnChangeFn, Table, Column } from "./index.d";
import { ColumnOrderState, ColumnPinningState } from "./column";
import { RowModel } from "./row";
import { ColumnFiltersState, FilterFnOption } from "./filter";

export type VisibilityState = Record<string, boolean>;
export interface VisibilityOptions {
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  enableHiding?: boolean;
}

export interface ColumnOrderOptions {
  onColumnOrderChange?: OnChangeFn<ColumnOrderState>;
}

export interface ColumnOrderDefaultOptions {
  onColumnOrderChange: OnChangeFn<ColumnOrderState>;
}

export interface ColumnPinningOptions {
  onColumnPinningChange?: OnChangeFn<ColumnPinningState>;
  enablePinning?: boolean;
}

interface FiltersOptionsBase<TData extends RowData> {
  enableFilters?: boolean;
  manualFiltering?: boolean;
  filterFromLeafRows?: boolean;
  maxLeafRowFilterDepth?: number;
  getFilteredRowModel?: (table: Table<any>) => () => RowModel<any>;

  // Column
  onColumnFiltersChange?: OnChangeFn<ColumnFiltersState>;
  enableColumnFilters?: boolean;

  // Global
  globalFilterFn?: FilterFnOption<TData>;
  onGlobalFilterChange?: OnChangeFn<any>;
  enableGlobalFilter?: boolean;
  getColumnCanGlobalFilter?: (column: Column<TData, unknown>) => boolean;

  // Faceting
  getFacetedRowModel?: (
    table: Table<TData>,
    columnId: string
  ) => () => RowModel<TData>;
  getFacetedUniqueValues?: (
    table: Table<TData>,
    columnId: string
  ) => () => Map<any, number>;
  getFacetedMinMaxValues?: (
    table: Table<TData>,
    columnId: string
  ) => () => undefined | [number, number];
}

export interface FeatureOptions<TData extends RowData>
  extends VisibilityOptions,
    ColumnOrderOptions,
    ColumnPinningOptions,
    FiltersOptions<TData>,
    SortingOptions<TData>,
    GroupingOptions,
    ExpandedOptions<TData>,
    ColumnSizingOptions,
    PaginationOptions,
    RowSelectionOptions<TData> {}

export interface VisibilityDefaultOptions {
  onColumnVisibilityChange: OnChangeFn<VisibilityState>;
}
