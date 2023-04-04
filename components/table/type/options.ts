import {
  RowData,
  Row,
  RowModel,
  Table,
  TableState,
  TableOptions,
  Column,
  ColumnDef,
  SortingOptionsBase,
  ColumnOrderState,
  ColumnPinningState,
  ColumnFiltersState,
  ColumnResizeMode,
  FilterFnOption,
  ResolvedFilterFns,
  VisibilityState,
  InitialTableState,
  OnChangeFn,
  ResolvedSortingFns,
  TableMeta,
  GroupingOptionsBase,
  ResolvedAggregationFns,
  ExpandedState,
  ColumnSizingState,
  ColumnSizingInfoState,
  PaginationState,
  RowSelectionState,
} from ".";

import { Updater } from "types";
// import {AggregationFns} from "../features/"

// export type VisibilityState = Record<string, boolean>;
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

export interface FiltersOptions<TData extends RowData>
  extends FiltersOptionsBase<TData>,
    ResolvedFilterFns {}

export interface SortingOptions<TData extends RowData>
  extends SortingOptionsBase,
    ResolvedSortingFns {}

export interface GroupingOptions
  extends GroupingOptionsBase,
    ResolvedAggregationFns {}

export interface ExpandedOptions<TData extends RowData> {
  manualExpanding?: boolean;
  onExpandedChange?: OnChangeFn<ExpandedState>;
  autoResetExpanded?: boolean;
  enableExpanding?: boolean;
  getExpandedRowModel?: (table: Table<any>) => () => RowModel<any>;
  getIsRowExpanded?: (row: Row<TData>) => boolean;
  getRowCanExpand?: (row: Row<TData>) => boolean;
  paginateExpandedRows?: boolean;
}

export interface ColumnSizingOptions {
  enableColumnResizing?: boolean;
  columnResizeMode?: ColumnResizeMode;
  onColumnSizingChange?: OnChangeFn<ColumnSizingState>;
  onColumnSizingInfoChange?: OnChangeFn<ColumnSizingInfoState>;
}

export interface PaginationOptions {
  pageCount?: number;
  manualPagination?: boolean;
  onPaginationChange?: OnChangeFn<PaginationState>;
  autoResetPageIndex?: boolean;
  getPaginationRowModel?: (table: Table<any>) => () => RowModel<any>;
}

export interface RowSelectionOptions<TData extends RowData> {
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableMultiRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableSubRowSelection?: boolean | ((row: Row<TData>) => boolean);
  onRowSelectionChange?: OnChangeFn<RowSelectionState>;
  // enableGroupingRowSelection?:
  //   | boolean
  //   | ((
  //       row: Row<TData>
  //     ) => boolean)
  // isAdditiveSelectEvent?: (e: unknown) => boolean
  // isInclusiveSelectEvent?: (e: unknown) => boolean
  // selectRowsFn?: (
  //   table: Table<TData>,
  //   rowModel: RowModel<TData>
  // ) => RowModel<TData>
}



export interface ColumnSizingDefaultOptions {
  columnResizeMode: ColumnResizeMode
  onColumnSizingChange: OnChangeFn<ColumnSizingState>
  onColumnSizingInfoChange: OnChangeFn<ColumnSizingInfoState>
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

export interface CoreOptions<TData extends RowData> {
  data: TData[];
  state: Partial<TableState>;
  onStateChange: (updater: Updater<TableState>) => void;
  debugAll?: boolean;
  debugTable?: boolean;
  debugHeaders?: boolean;
  debugColumns?: boolean;
  debugRows?: boolean;
  initialState?: InitialTableState;
  autoResetAll?: boolean;
  mergeOptions?: (
    defaultOptions: TableOptions<TData>,
    options: Partial<TableOptions<TData>>
  ) => TableOptions<TData>;
  meta?: TableMeta<TData>;
  getCoreRowModel: (table: Table<any>) => () => RowModel<any>;
  getSubRows?: (originalRow: TData, index: number) => undefined | TData[];
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  columns: ColumnDef<TData, any>[];
  defaultColumn?: Partial<ColumnDef<TData, unknown>>;
  renderFallbackValue: any;
}
