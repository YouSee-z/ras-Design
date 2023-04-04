import {
  Cell,
  Column,
  GroupingCell,
  GroupingColumn,
  GroupingColumnDef,
  GroupingColumnMode,
  GroupingInstance,
  GroupingOptions,
  GroupingRow,
  GroupingTableState,
  Row,
  RowData,
  Table,
  TableFeature,
} from "../type";
import {
  makeStateUpdater,
  aggregationFns,
  BuiltInAggregationFn,
  isFunction,
} from "../util";

export const Grouping: TableFeature = {
  getDefaultColumnDef: <TData extends RowData>(): GroupingColumnDef<
    TData,
    unknown
  > => {
    return {
      aggregatedCell: (props) =>
        (props.getValue() as any)?.toString?.() ?? null,
      aggregationFn: "auto",
    };
  },

  getInitialState: (state): GroupingTableState => {
    return {
      grouping: [],
      ...state,
    };
  },

  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>
  ): GroupingOptions => {
    return {
      onGroupingChange: makeStateUpdater("grouping", table),
      groupedColumnMode: "reorder",
    };
  },

  createColumn: <TData extends RowData, TValue>(
    column: Column<TData, TValue>,
    table: Table<TData>
  ): GroupingColumn<TData> => {
    return {
      toggleGrouping: () => {
        table.setGrouping((old) => {
          // Find any existing grouping for this column
          if (old?.includes(column.id)) {
            return old.filter((d) => d !== column.id);
          }

          return [...(old ?? []), column.id];
        });
      },

      getCanGroup: () => {
        return (
          column.columnDef.enableGrouping ??
          true ??
          table.options.enableGrouping ??
          true ??
          !!column.accessorFn
        );
      },

      getIsGrouped: () => {
        return table.getState().grouping?.includes(column.id);
      },

      getGroupedIndex: () => table.getState().grouping?.indexOf(column.id),

      getToggleGroupingHandler: () => {
        const canGroup = column.getCanGroup();

        return () => {
          if (!canGroup) return;
          column.toggleGrouping();
        };
      },
      getAutoAggregationFn: () => {
        const firstRow = table.getCoreRowModel().flatRows[0];

        const value = firstRow?.getValue(column.id);

        if (typeof value === "number") {
          return aggregationFns.sum;
        }

        if (Object.prototype.toString.call(value) === "[object Date]") {
          return aggregationFns.extent;
        }
      },
      getAggregationFn: () => {
        if (!column) {
          throw new Error();
        }

        return isFunction(column.columnDef.aggregationFn)
          ? column.columnDef.aggregationFn
          : column.columnDef.aggregationFn === "auto"
          ? column.getAutoAggregationFn()
          : table.options.aggregationFns?.[
              column.columnDef.aggregationFn as string
            ] ??
            aggregationFns[
              column.columnDef.aggregationFn as BuiltInAggregationFn
            ];
      },
    };
  },

  createTable: <TData extends RowData>(
    table: Table<TData>
  ): GroupingInstance<TData> => {
    return {
      setGrouping: (updater) => table.options.onGroupingChange?.(updater),

      resetGrouping: (defaultState) => {
        table.setGrouping(
          defaultState ? [] : table.initialState?.grouping ?? []
        );
      },

      getPreGroupedRowModel: () => table.getFilteredRowModel(),
      getGroupedRowModel: () => {
        if (!table._getGroupedRowModel && table.options.getGroupedRowModel) {
          table._getGroupedRowModel = table.options.getGroupedRowModel(table);
        }

        if (table.options.manualGrouping || !table._getGroupedRowModel) {
          return table.getPreGroupedRowModel();
        }

        return table._getGroupedRowModel();
      },
    };
  },

  createRow: <TData extends RowData>(row: Row<TData>): GroupingRow => {
    return {
      getIsGrouped: () => !!row.groupingColumnId,
      _groupingValuesCache: {},
    };
  },

  createCell: <TData extends RowData, TValue>(
    cell: Cell<TData, TValue>,
    column: Column<TData, TValue>,
    row: Row<TData>,
    table: Table<TData>
  ): GroupingCell => {
    const getRenderValue = () =>
      cell.getValue() ?? table.options.renderFallbackValue;

    return {
      getIsGrouped: () =>
        column.getIsGrouped() && column.id === row.groupingColumnId,
      getIsPlaceholder: () => !cell.getIsGrouped() && column.getIsGrouped(),
      getIsAggregated: () =>
        !cell.getIsGrouped() &&
        !cell.getIsPlaceholder() &&
        !!row.subRows?.length,
    };
  },
};

export function orderColumns<TData extends RowData>(
  leafColumns: Column<TData, unknown>[],
  grouping: string[],
  groupedColumnMode?: GroupingColumnMode
) {
  if (!grouping?.length || !groupedColumnMode) {
    return leafColumns;
  }

  const nonGroupingColumns = leafColumns.filter(
    (col) => !grouping.includes(col.id)
  );

  if (groupedColumnMode === "remove") {
    return nonGroupingColumns;
  }

  const groupingColumns = grouping
    .map((g) => leafColumns.find((col) => col.id === g)!)
    .filter(Boolean);

  return [...groupingColumns, ...nonGroupingColumns];
}
