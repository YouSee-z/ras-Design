import { RowData, Cell, Column, Row, Table, CoreCell } from "../type/index.d";
import { memo } from "@rasDesign/utils";
// import

export function createCell<TData extends RowData, TValue>(
  table: Table<TData>,
  row: Row<TData>,
  column: Column<TData, TValue>,
  columnId: string
): Cell<TData, TValue> {
  const getRenderValue = () =>
    cell.getValue() ?? table.options.renderFallbackValue;

  const cell: CoreCell<TData, TValue> = {
    id: `${row.id}_${column.id}`,
    row,
    column,
    getValue: () => row.getValue(columnId),
    renderValue: getRenderValue,
    getContext: memo(
      () => [table, column, row, cell],
      (table, column, row, cell) => ({
        table,
        column,
        row,
        cell: cell as Cell<TData, TValue>,
        getValue: cell.getValue,
        renderValue: cell.renderValue,
      }),
      {
        key: process.env.NODE_ENV === "development" && "cell.getContext",
        debug: () => table.options.debugAll,
      }
    ),
  };

  table._features.forEach((feature) => {
    Object.assign(
      cell,
      feature.createCell?.(
        cell as Cell<TData, TValue>,
        column,
        row as Row<TData>,
        table
      )
    );
  }, {});

  return cell as Cell<TData, TValue>;
}
