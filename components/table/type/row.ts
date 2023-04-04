import {
  Cell,
  RowData,
  VisibilityRow,
  ColumnPinningRow,
  FiltersRow,
  GroupingRow,
  ExpandedRow,
} from ".";

import { Updater } from "types";
export interface Row<TData extends RowData>
  extends CoreRow<TData>,
    VisibilityRow<TData>,
    ColumnPinningRow<TData>,
    FiltersRow<TData>,
    GroupingRow,
    RowSelectionRow,
    ExpandedRow {}
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

export interface RowSelectionRow {
  getIsSelected: () => boolean;
  getIsSomeSelected: () => boolean;
  getIsAllSubRowsSelected: () => boolean;
  getCanSelect: () => boolean;
  getCanMultiSelect: () => boolean;
  getCanSelectSubRows: () => boolean;
  toggleSelected: (value?: boolean) => void;
  getToggleSelectedHandler: () => (event: unknown) => void;
}

export interface RowModel<TData extends RowData> {
  rows: Row<TData>[];
  flatRows: Row<TData>[];
  rowsById: Record<string, Row<TData>>;
}

export type RowSelectionState = Record<string, boolean>;

export interface RowSelectionTableState {
  rowSelection: RowSelectionState;
}

export interface RowSelectionInstance<TData extends RowData> {
  getToggleAllRowsSelectedHandler: () => (event: unknown) => void;
  getToggleAllPageRowsSelectedHandler: () => (event: unknown) => void;
  setRowSelection: (updater: Updater<RowSelectionState>) => void;
  resetRowSelection: (defaultState?: boolean) => void;
  getIsAllRowsSelected: () => boolean;
  getIsAllPageRowsSelected: () => boolean;
  getIsSomeRowsSelected: () => boolean;
  getIsSomePageRowsSelected: () => boolean;
  toggleAllRowsSelected: (value?: boolean) => void;
  toggleAllPageRowsSelected: (value?: boolean) => void;
  getPreSelectedRowModel: () => RowModel<TData>;
  getSelectedRowModel: () => RowModel<TData>;
  getFilteredSelectedRowModel: () => RowModel<TData>;
  getGroupedSelectedRowModel: () => RowModel<TData>;
}
