import {
  RowData,
  Column,
  Row,
  ColumnDef,
  FeatureOptions,
  CoreOptions,
  RowModel,
  VisibilityTableState,
  ColumnOrderTableState,
  ColumnPinningTableState,
  FiltersTableState,
  SortingTableState,
  ExpandedTableState,
  GroupingTableState,
  ColumnSizingTableState,
  PaginationTableState,
  RowSelectionTableState,
  PaginationInitialTableState,
  HeadersInstance,
  VisibilityInstance,
  ColumnOrderInstance,
  ColumnPinningInstance,
  FiltersInstance,
  SortingInstance,
  GroupingInstance,
  ColumnSizingInstance,
  ExpandedInstance,
  PaginationInstance,
  RowSelectionInstance,
} from ".";
import { RequiredKeys, PartialKeys, Updater } from "types";

export interface CoreTableState {}

export interface Table<TData extends RowData>
  extends CoreInstance<TData>,
    HeadersInstance<TData>,
    VisibilityInstance<TData>,
    ColumnOrderInstance<TData>,
    ColumnPinningInstance<TData>,
    FiltersInstance<TData>,
    SortingInstance<TData>,
    GroupingInstance<TData>,
    ColumnSizingInstance,
    ExpandedInstance<TData>,
    PaginationInstance<TData>,
    RowSelectionInstance<TData> {}

export interface TableState
  extends CoreTableState,
    VisibilityTableState,
    ColumnOrderTableState,
    ColumnPinningTableState,
    FiltersTableState,
    SortingTableState,
    ExpandedTableState,
    GroupingTableState,
    ColumnSizingTableState,
    PaginationTableState,
    RowSelectionTableState {}

export type TableOptionsResolved<TData extends RowData> = CoreOptions<TData> &
  FeatureOptions<TData>;

export interface TableOptions<TData extends RowData>
  extends PartialKeys<
    TableOptionsResolved<TData>,
    "state" | "onStateChange" | "renderFallbackValue"
  > {}

export interface TableFeature {
  getDefaultOptions?: (table: any) => any;
  getInitialState?: (initialState?: InitialTableState) => any;
  createTable?: (table: any) => any;
  getDefaultColumnDef?: () => any;
  createColumn?: (column: any, table: any) => any;
  createHeader?: (column: any, table: any) => any;
  createCell?: (cell: any, column: any, row: any, table: any) => any;
  createRow?: (row: any, table: any) => any;
}

export interface CoreInstance<TData extends RowData> {
  initialState: TableState;
  reset: () => void;
  options: RequiredKeys<TableOptionsResolved<TData>, "state">;
  setOptions: (newOptions: Updater<TableOptionsResolved<TData>>) => void;
  getState: () => TableState;
  setState: (updater: Updater<TableState>) => void;
  _features: readonly TableFeature[];
  _queue: (cb: () => void) => void;
  _getRowId: (_: TData, index: number, parent?: Row<TData>) => string;
  getCoreRowModel: () => RowModel<TData>;
  _getCoreRowModel?: () => RowModel<TData>;
  getRowModel: () => RowModel<TData>;
  getRow: (id: string) => Row<TData>;
  _getDefaultColumnDef: () => Partial<ColumnDef<TData, unknown>>;
  _getColumnDefs: () => ColumnDef<TData, unknown>[];
  _getAllFlatColumnsById: () => Record<string, Column<TData, unknown>>;
  getAllColumns: () => Column<TData, unknown>[];
  getAllFlatColumns: () => Column<TData, unknown>[];
  getAllLeafColumns: () => Column<TData, unknown>[];
  getColumn: (columnId: string) => Column<TData, unknown> | undefined;
}

export interface CompleteInitialTableState
  extends CoreTableState,
    VisibilityTableState,
    ColumnOrderTableState,
    ColumnPinningTableState,
    FiltersTableState,
    SortingTableState,
    ExpandedTableState,
    GroupingTableState,
    ColumnSizingTableState,
    PaginationInitialTableState,
    RowSelectionTableState {}

export interface InitialTableState extends Partial<CompleteInitialTableState> {}

export interface TableOptions<TData extends RowData>
  extends PartialKeys<
    TableOptionsResolved<TData>,
    "state" | "onStateChange" | "renderFallbackValue"
  > {}
