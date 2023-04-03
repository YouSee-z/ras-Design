export type RowData = unknown | object | any[];
import { ColumnDefTemplate } from "./column";
import { HeaderContext } from "./header";

export * from "./cell";
export * from "./header";
export * from "./table";
export * from "./row";
export * from "./visibility";
export * from "./column";
export * from "./options";
export * from "./filter";
export * from "./sorting";
export * from "./grouping";
export * from "./expended";
export * from "./pagination";

export interface TableMeta<TData extends RowData> {}

export interface ColumnMeta<TData extends RowData, TValue> {}

export interface FilterMeta {}

export interface FilterFns {}

export interface SortingFns {}

export interface AggregationFns {}

export type Updater<T> = T | ((old: T) => T);
export type OnChangeFn<T> = (updaterOrValue: Updater<T>) => void;

export type AnyRender = (Comp: any, props: any) => any;
import { CoreTableState } from "./table";
import { VisibilityTableState } from "./visibility";
import {
  ColumnOrderTableState,
  ColumnPinningTableState,
  ColumnSizingTableState,
} from "./column";
import { FiltersTableState } from "./filter";
import { SortingTableState } from "./sorting";
import { ExpandedTableState } from "./expended";
import { GroupingTableState } from "./grouping";
import { PaginationInitialTableState } from "./pagination";
import { RowSelectionTableState } from "./row";
// export * from

export interface CompleteInitialTableState
  extends CoreTableState,
    VisibilityTableState,
    ColumnOrderTableState,
    ColumnPinningTableState,
    FiltersTableState,
    SortingTableState,
    ExpandedTableState,
    GroupingTableState,
    ColumnSizingTableState,
    PaginationInitialTableState,
    RowSelectionTableState {}

export type AccessorFn<TData extends RowData, TValue = unknown> = (
  originalRow: TData,
  index: number
) => TValue;

export interface StringHeaderIdentifier {
  header: string;
  id?: string;
}

export type StringOrTemplateHeader<TData, TValue> =
  | string
  | ColumnDefTemplate<HeaderContext<TData, TValue>>;

export interface IdIdentifier<TData extends RowData, TValue> {
  id: string;
  header?: StringOrTemplateHeader<TData, TValue>;
}
