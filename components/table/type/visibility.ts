import { RowData, OnChangeFn } from ".";
import { Column } from "./column";
import { Updater } from "types";
import { Cell } from "./cell";

export type VisibilityState = Record<string, boolean>;

export interface VisibilityTableState {
  columnVisibility: VisibilityState;
}

export interface VisibilityInstance<TData extends RowData> {
  getVisibleFlatColumns: () => Column<TData, unknown>[];
  getVisibleLeafColumns: () => Column<TData, unknown>[];
  getLeftVisibleLeafColumns: () => Column<TData, unknown>[];
  getRightVisibleLeafColumns: () => Column<TData, unknown>[];
  getCenterVisibleLeafColumns: () => Column<TData, unknown>[];
  setColumnVisibility: (updater: Updater<VisibilityState>) => void;
  resetColumnVisibility: (defaultState?: boolean) => void;
  toggleAllColumnsVisible: (value?: boolean) => void;
  getIsAllColumnsVisible: () => boolean;
  getIsSomeColumnsVisible: () => boolean;
  getToggleAllColumnsVisibilityHandler: () => (event: unknown) => void;
}

export interface VisibilityColumnDef {
  enableHiding?: boolean;
}

export interface VisibilityRow<TData extends RowData> {
  _getAllVisibleCells: () => Cell<TData, unknown>[];
  getVisibleCells: () => Cell<TData, unknown>[];
}

export interface VisibilityColumn {
  getCanHide: () => boolean;
  getIsVisible: () => boolean;
  toggleVisibility: (value?: boolean) => void;
  getToggleVisibilityHandler: () => (event: unknown) => void;
}
