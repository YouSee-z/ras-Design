import { RowData, AccessorFn } from "./index.d";

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
    ColumnVisibilityColumn,
    ColumnPinningColumn,
    FiltersColumn<TData>,
    SortingColumn<TData>,
    GroupingColumn<TData>,
    ColumnSizingColumn {}
