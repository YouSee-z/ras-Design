import {
  RowData,
  AccessorFn,
  IdIdentifier,
  StringHeaderIdentifier,
} from "./index.d";
import { VisibilityColumn } from "./visibility";

export interface ColumnDefBase<TData extends RowData, TValue = unknown>
  extends ColumnDefExtensions<TData, TValue> {
  getUniqueValues?: AccessorFn<TData, unknown[]>;
  footer?: ColumnDefTemplate<HeaderContext<TData, TValue>>;
  cell?: ColumnDefTemplate<CellContext<TData, TValue>>;
  meta?: ColumnMeta<TData, TValue>;
}

type ColumnIdentifiers<TData extends RowData, TValue> =
  | IdIdentifier<TData, TValue>
  | StringHeaderIdentifier;

//

export interface ColumnOrderTableState {
  columnOrder: ColumnOrderState;
}

export type ColumnOrderState = string[];

export type DisplayColumnDef<
  TData extends RowData,
  TValue = unknown
> = ColumnDefBase<TData, TValue> & ColumnIdentifiers<TData, TValue>;

interface GroupColumnDefBase<TData extends RowData, TValue = unknown>
  extends ColumnDefBase<TData, TValue> {
  columns?: ColumnDef<TData, any>[];
}

export type GroupColumnDef<
  TData extends RowData,
  TValue = unknown
> = GroupColumnDefBase<TData, TValue> & ColumnIdentifiers<TData, TValue>;

interface AccessorFnColumnDefBase<TData extends RowData, TValue = unknown>
  extends ColumnDefBase<TData, TValue> {
  accessorFn: AccessorFn<TData, TValue>;
}

export type AccessorFnColumnDef<
  TData extends RowData,
  TValue = unknown
> = AccessorFnColumnDefBase<TData, TValue> & ColumnIdentifiers<TData, TValue>;

export type ColumnPinningPosition = false | "left" | "right"; // 位置

export interface ColumnPinningState {
  left?: string[];
  right?: string[];
}

export interface ColumnPinningTableState {
  columnPinning: ColumnPinningState;
}

export interface ColumnPinningTableState {
  columnPinning: ColumnPinningState;
}

interface AccessorKeyColumnDefBase<TData extends RowData, TValue = unknown>
  extends ColumnDefBase<TData, TValue> {
  id?: string;
  accessorKey: (string & {}) | keyof TData;
}

export type AccessorKeyColumnDef<
  TData extends RowData,
  TValue = unknown
> = AccessorKeyColumnDefBase<TData, TValue> &
  Partial<ColumnIdentifiers<TData, TValue>>;

export type AccessorColumnDef<TData extends RowData, TValue = unknown> =
  | AccessorKeyColumnDef<TData, TValue>
  | AccessorFnColumnDef<TData, TValue>;

//

export type ColumnDef<TData extends RowData, TValue = unknown> =
  | DisplayColumnDef<TData, TValue>
  | GroupColumnDef<TData, TValue>
  | AccessorColumnDef<TData, TValue>;

export type ColumnDefResolved<
  TData extends RowData,
  TValue = unknown
> = Partial<UnionToIntersection<ColumnDef<TData, TValue>>> & {
  accessorKey?: string;
};

export interface CoreColumn<TData extends RowData, TValue> {
  id: string;
  depth: number;
  accessorFn?: AccessorFn<TData, TValue>;
  columnDef: ColumnDef<TData, TValue>;
  columns: Column<TData, TValue>[];
  parent?: Column<TData, TValue>;
  getFlatColumns: () => Column<TData, TValue>[];
  getLeafColumns: () => Column<TData, TValue>[];
}

export interface Column<TData extends RowData, TValue = unknown>
  extends CoreColumn<TData, TValue>,
    VisibilityColumn,
    ColumnPinningColumn,
    FiltersColumn<TData>,
    SortingColumn<TData>,
    GroupingColumn<TData>,
    ColumnSizingColumn {}
