import { RowData, Column, Row, Table } from ".";
import { Getter } from "types";

export interface CellContext<TData extends RowData, TValue> {
  table: Table<TData>;
  column: Column<TData, TValue>;
  row: Row<TData>;
  cell: Cell<TData, TValue>;
  getValue: Getter<TValue>;
  renderValue: Getter<TValue | null>;
}

export interface CoreCell<TData extends RowData, TValue> {
  id: string;
  getValue: CellContext<TData, TValue>["getValue"];
  renderValue: CellContext<TData, TValue>["renderValue"];
  row: Row<TData>;
  column: Column<TData, TValue>;
  getContext: () => CellContext<TData, TValue>;
}

export interface GroupingCell {
  getIsGrouped: () => boolean;
  getIsPlaceholder: () => boolean;
  getIsAggregated: () => boolean;
}

export interface Cell<TData extends RowData, TValue>
  extends CoreCell<TData, TValue>,
    GroupingCell {}

export interface CellContext<TData extends RowData, TValue> {
  table: Table<TData>;
  column: Column<TData, TValue>;
  row: Row<TData>;
  cell: Cell<TData, TValue>;
  getValue: Getter<TValue>;
  renderValue: Getter<TValue | null>;
}
