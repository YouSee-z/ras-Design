import { RowData, RowModel } from "./index";
import { Updater } from "@rasDesign/types";




export type ExpandedStateList = Record<string, boolean>;
export type ExpandedState = true | Record<string, boolean>;
export interface ExpandedTableState {
  expanded: ExpandedState;
}

export interface ExpandedRow {
  toggleExpanded: (expanded?: boolean) => void;
  getIsExpanded: () => boolean;
  getCanExpand: () => boolean;
  getToggleExpandedHandler: () => () => void;
}

export interface ExpandedInstance<TData extends RowData> {
  _autoResetExpanded: () => void;
  setExpanded: (updater: Updater<ExpandedState>) => void;
  toggleAllRowsExpanded: (expanded?: boolean) => void;
  resetExpanded: (defaultState?: boolean) => void;
  getCanSomeRowsExpand: () => boolean;
  getToggleAllRowsExpandedHandler: () => (event: unknown) => void;
  getIsSomeRowsExpanded: () => boolean;
  getIsAllRowsExpanded: () => boolean;
  getExpandedDepth: () => number;
  getExpandedRowModel: () => RowModel<TData>;
  _getExpandedRowModel?: () => RowModel<TData>;
  getPreExpandedRowModel: () => RowModel<TData>;
}
