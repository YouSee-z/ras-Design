export type RowData = unknown | object | any[];
import { CellContext, CoreCell } from "./cell.d";
import { CoreInstance } from "./table";
import { Getter } from "@rasDesign/types";
import { CoreRow } from "./row";

export * from "./cell.d";
export * from "./table";
export * from "./row";
// export * from

export interface Row<TData extends RowData>
  extends CoreRow<TData>,
    VisibilityRow<TData>,
    ColumnPinningRow<TData>,
    FiltersRow<TData>,
    GroupingRow,
    RowSelectionRow,
    ExpandedRow {}

//

export interface Table<TData extends RowData>
  extends CoreInstance<TData>,
    HeadersInstance<TData>,
    VisibilityInstance<TData>,
    ColumnOrderInstance<TData>,
    ColumnPinningInstance<TData>,
    FiltersInstance<TData>,
    SortingInstance<TData>,
    GroupingInstance<TData>,
    ColumnSizingInstance,
    ExpandedInstance<TData>,
    PaginationInstance<TData>,
    RowSelectionInstance<TData> {}

//  Column  []
export interface Column<TData extends RowData, TValue = unknown>
  extends CoreColumn<TData, TValue>,
    ColumnVisibilityColumn,
    ColumnPinningColumn,
    FiltersColumn<TData>,
    SortingColumn<TData>,
    GroupingColumn<TData>,
    ColumnSizingColumn {}

export type ColumnDef<TData extends RowData, TValue = unknown> =
  | DisplayColumnDef<TData, TValue>
  | GroupColumnDef<TData, TValue>
  | AccessorColumnDef<TData, TValue>;

export { Getter };

//

// export type Getter<TValue> = <TTValue = TValue>() => NoInfer<TTValue>;

export interface TableState
  extends CoreTableState,
    VisibilityTableState,
    ColumnOrderTableState,
    ColumnPinningTableState,
    FiltersTableState,
    SortingTableState,
    ExpandedTableState,
    GroupingTableState,
    ColumnSizingTableState,
    PaginationTableState,
    RowSelectionTableState {}

interface CompleteInitialTableState
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
