import { RowData, Cell, Column, Row, Table,ColumnDef } from "..index.d";

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
