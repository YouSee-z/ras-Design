import { RowData, ColumnSizingHeader, Table, Column } from ".";

export interface Header<TData extends RowData, TValue>
  extends CoreHeader<TData, TValue>,
    ColumnSizingHeader {}

export interface HeaderGroup<TData extends RowData>
  extends CoreHeaderGroup<TData> {}
export interface CoreHeaderGroup<TData extends RowData> {
  id: string;
  depth: number;
  headers: Header<TData, unknown>[];
}

export interface HeaderContext<TData, TValue> {
  table: Table<TData>;
  header: Header<TData, TValue>;
  column: Column<TData, TValue>;
}

export interface CoreHeader<TData extends RowData, TValue> {
  id: string;
  index: number;
  depth: number;
  column: Column<TData, TValue>;
  headerGroup: HeaderGroup<TData>;
  subHeaders: Header<TData, TValue>[];
  colSpan: number;
  rowSpan: number;
  getLeafHeaders: () => Header<TData, unknown>[];
  isPlaceholder: boolean;
  placeholderId?: string;
  getContext: () => HeaderContext<TData, TValue>;
}

export interface HeadersInstance<TData extends RowData> {
  getHeaderGroups: () => HeaderGroup<TData>[];
  getLeftHeaderGroups: () => HeaderGroup<TData>[];
  getCenterHeaderGroups: () => HeaderGroup<TData>[];
  getRightHeaderGroups: () => HeaderGroup<TData>[];

  getFooterGroups: () => HeaderGroup<TData>[];
  getLeftFooterGroups: () => HeaderGroup<TData>[];
  getCenterFooterGroups: () => HeaderGroup<TData>[];
  getRightFooterGroups: () => HeaderGroup<TData>[];

  getFlatHeaders: () => Header<TData, unknown>[];
  getLeftFlatHeaders: () => Header<TData, unknown>[];
  getCenterFlatHeaders: () => Header<TData, unknown>[];
  getRightFlatHeaders: () => Header<TData, unknown>[];

  getLeafHeaders: () => Header<TData, unknown>[];
  getLeftLeafHeaders: () => Header<TData, unknown>[];
  getCenterLeafHeaders: () => Header<TData, unknown>[];
  getRightLeafHeaders: () => Header<TData, unknown>[];
}
