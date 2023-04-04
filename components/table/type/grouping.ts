import {
  RowData,
  OnChangeFn,
  Table,
  RowModel,
  Row,
  Cell,
  AggregationFns,
} from "./index";
import { ColumnDefTemplate } from "./column";
import { BuiltInAggregationFn } from "../util";
import { Updater } from "types";

export type GroupingState = string[];

export interface GroupingTableState {
  grouping: GroupingState;
}

export type AggregationFnOption<TData extends RowData> =
  | "auto"
  | keyof AggregationFns
  | BuiltInAggregationFn
  | AggregationFn<TData>;

export interface GroupingColumn<TData extends RowData> {
  getCanGroup: () => boolean;
  getIsGrouped: () => boolean;
  getGroupedIndex: () => number;
  toggleGrouping: () => void;
  getToggleGroupingHandler: () => () => void;
  getAutoAggregationFn: () => AggregationFn<TData> | undefined;
  getAggregationFn: () => AggregationFn<TData> | undefined;
}

export interface GroupingRow {
  groupingColumnId?: string;
  groupingValue?: unknown;
  getIsGrouped: () => boolean;
  _groupingValuesCache: Record<string, any>;
}

export interface GroupingColumnDef<TData extends RowData, TValue> {
  aggregationFn?: AggregationFnOption<TData>;
  aggregatedCell?: ColumnDefTemplate<
    ReturnType<Cell<TData, TValue>["getContext"]>
  >;
  enableGrouping?: boolean;
}

export interface GroupingOptionsBase {
  manualGrouping?: boolean;
  onGroupingChange?: OnChangeFn<GroupingState>;
  enableGrouping?: boolean;
  getGroupedRowModel?: (table: Table<any>) => () => RowModel<any>;
  groupedColumnMode?: false | "reorder" | "remove";
}

export type AggregationFn<TData extends RowData> = (
  columnId: string,
  leafRows: Row<TData>[],
  childRows: Row<TData>[]
) => any;

export type ResolvedAggregationFns = keyof AggregationFns extends never
  ? {
      aggregationFns?: Record<string, AggregationFn<any>>;
    }
  : {
      aggregationFns: Record<keyof AggregationFns, AggregationFn<any>>;
    };

export interface GroupingInstance<TData extends RowData> {
  setGrouping: (updater: Updater<GroupingState>) => void;
  resetGrouping: (defaultState?: boolean) => void;
  getPreGroupedRowModel: () => RowModel<TData>;
  getGroupedRowModel: () => RowModel<TData>;
  _getGroupedRowModel?: () => RowModel<TData>;
}
