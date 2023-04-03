import {
  RowData,
  VisibilityOptions,
  ColumnOrderOptions,
  ColumnPinningOptions,
  FiltersOptions,
  SortingOptions,
  GroupingOptions,
  ColumnSizingOptions,
  ExpandedOptions,
  PaginationOptions,
  RowSelectionOptions,
} from ".";

interface FeatureOptions<TData extends RowData>
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
