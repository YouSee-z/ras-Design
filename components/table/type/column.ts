import {
  Cell,
  RowData,
  AccessorFn,
  IdIdentifier,
  StringHeaderIdentifier,
  VisibilityColumnDef,
  VisibilityColumn,
  GroupingColumnDef,
  HeaderContext,
  CellContext,
  FiltersColumn,
  FiltersColumnDef,
  SortingColumnDef,
  SortingColumn,
  GroupingColumn,
} from "./index";
import { UnionToIntersection, Updater } from "@rasDesign/types";

export type ColumnSizingState = Record<string, number>;
export type ColumnResizeMode = "onChange" | "onEnd";
export interface ColumnMeta<TData extends RowData, TValue> {}

export interface Column<TData extends RowData, TValue = unknown>
  extends CoreColumn<TData, TValue>,
    VisibilityColumn,
    ColumnPinningColumn,
    FiltersColumn<TData>,
    SortingColumn<TData>,
    GroupingColumn<TData>,
    ColumnSizingColumn {}

export type ColumnDef<TData extends RowData, TValue = unknown> =
  | DisplayColumnDef<TData, TValue>
  | GroupColumnDef<TData, TValue>
  | AccessorColumnDef<TData, TValue>;

export interface ColumnSizingInfoState {
  startOffset: null | number;
  startSize: null | number;
  deltaOffset: null | number;
  deltaPercentage: null | number;
  isResizingColumn: false | string;
  columnSizingStart: [string, number][];
}

export interface ColumnSizingTableState {
  columnSizing: ColumnSizingState;
  columnSizingInfo: ColumnSizingInfoState;
}
export interface ColumnPinningColumnDef {
  enablePinning?: boolean;
}

export type ColumnDefTemplate<TProps extends object> =
  | string
  | ((props: TProps) => any);

export interface ColumnSizingColumnDef {
  enableResizing?: boolean;
  size?: number;
  minSize?: number;
  maxSize?: number;
}

interface ColumnDefExtensions<TData extends RowData, TValue = unknown>
  extends VisibilityColumnDef,
    ColumnPinningColumnDef,
    FiltersColumnDef<TData>,
    SortingColumnDef<TData>,
    GroupingColumnDef<TData, TValue>,
    ColumnSizingColumnDef {}

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

export interface ColumnSizingHeader {
  getSize: () => number;
  getStart: (position?: ColumnPinningPosition) => number;
  getResizeHandler: () => (event: unknown) => void;
}

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

export interface ColumnSizingColumn {
  getSize: () => number;
  getStart: (position?: ColumnPinningPosition) => number;
  getCanResize: () => boolean;
  getIsResizing: () => boolean;
  resetSize: () => void;
}

export interface ColumnPinningColumn {
  getCanPin: () => boolean;
  getPinnedIndex: () => number;
  getIsPinned: () => ColumnPinningPosition;
  pin: (position: ColumnPinningPosition) => void;
}

export interface ColumnPinningRow<TData extends RowData> {
  getLeftVisibleCells: () => Cell<TData, unknown>[];
  getCenterVisibleCells: () => Cell<TData, unknown>[];
  getRightVisibleCells: () => Cell<TData, unknown>[];
}

export interface Column<TData extends RowData, TValue = unknown>
  extends CoreColumn<TData, TValue>,
    VisibilityColumn,
    ColumnPinningColumn,
    FiltersColumn<TData>,
    SortingColumn<TData>,
    GroupingColumn<TData>,
    ColumnSizingColumn {}

export interface ColumnOrderInstance<TData extends RowData> {
  setColumnOrder: (updater: Updater<ColumnOrderState>) => void;
  resetColumnOrder: (defaultState?: boolean) => void;
  _getOrderColumnsFn: () => (
    columns: Column<TData, unknown>[]
  ) => Column<TData, unknown>[];
}

export interface ColumnPinningInstance<TData extends RowData> {
  setColumnPinning: (updater: Updater<ColumnPinningState>) => void;
  resetColumnPinning: (defaultState?: boolean) => void;
  getIsSomeColumnsPinned: (position?: ColumnPinningPosition) => boolean;
  getLeftLeafColumns: () => Column<TData, unknown>[];
  getRightLeafColumns: () => Column<TData, unknown>[];
  getCenterLeafColumns: () => Column<TData, unknown>[];
}

export interface ColumnSizingInstance {
  setColumnSizing: (updater: Updater<ColumnSizingState>) => void;
  setColumnSizingInfo: (updater: Updater<ColumnSizingInfoState>) => void;
  resetColumnSizing: (defaultState?: boolean) => void;
  resetHeaderSizeInfo: (defaultState?: boolean) => void;
  getTotalSize: () => number;
  getLeftTotalSize: () => number;
  getCenterTotalSize: () => number;
  getRightTotalSize: () => number;
}
