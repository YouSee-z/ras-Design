import { RowData } from "./index.d";

export interface VisibilityOptions {
  onColumnVisibilityChange?: OnChangeFn<VisibilityState>;
  enableHiding?: boolean;
}

export interface FeatureOptions<TData extends RowData>
  extends VisibilityOptions,
    ColumnOrderOptions,
    ColumnPinningOptions,
    FiltersOptions<TData>,
    SortingOptions<TData>,
    GroupingOptions,
    ExpandedOptions<TData>,
    ColumnSizingOptions,
    PaginationOptions,
    RowSelectionOptions<TData> {}

export interface VisibilityDefaultOptions {
  onColumnVisibilityChange: OnChangeFn<VisibilityState>;
}
