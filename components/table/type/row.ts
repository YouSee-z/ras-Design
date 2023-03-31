import { RowData, Row } from "./index.d";
import { Cell } from "./cell";
export interface CoreRow<TData extends RowData> {
  id: string;
  index: number;
  original: TData;
  depth: number;
  parentId?: string;
  _valuesCache: Record<string, unknown>;
  _uniqueValuesCache: Record<string, unknown>;
  getValue: <TValue>(columnId: string) => TValue;
  getUniqueValues: <TValue>(columnId: string) => TValue[];
  renderValue: <TValue>(columnId: string) => TValue;
  subRows: Row<TData>[];
  getLeafRows: () => Row<TData>[];
  originalSubRows?: TData[];
  getAllCells: () => Cell<TData, unknown>[];
  _getAllCellsByColumnId: () => Record<string, Cell<TData, unknown>>;
  getParentRow: () => Row<TData> | undefined;
  getParentRows: () => Row<TData>[];
}

export interface RowModel<TData extends RowData> {
  rows: Row<TData>[]
  flatRows: Row<TData>[]
  rowsById: Record<string, Row<TData>>
}