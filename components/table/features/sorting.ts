import {
  Column,
  RowData,
  SortingColumn,
  SortingColumnDef,
  SortingInstance,
  SortingOptions,
  SortingState,
  SortingTableState,
  Table,
  TableFeature,
} from "../type";
import { BuiltInSortingFn, isFunction, makeStateUpdater, reSplitAlphaNumeric, sortingFns } from "../util";

export const Sorting: TableFeature = {
  getInitialState: (state): SortingTableState => {
    return {
      sorting: [],
      ...state,
    };
  },

  getDefaultColumnDef: <TData extends RowData>(): SortingColumnDef<TData> => {
    return {
      sortingFn: "auto",
    };
  },

  getDefaultOptions: <TData extends RowData>(
    table: Table<TData>
  ): SortingOptions<TData> => {
    return {
      onSortingChange: makeStateUpdater("sorting", table),
      isMultiSortEvent: (e: unknown) => {
        return (e as MouseEvent).shiftKey;
      },
    };
  },

  createColumn: <TData extends RowData, TValue>(
    column: Column<TData, TValue>,
    table: Table<TData>
  ): SortingColumn<TData> => {
    return {
      getAutoSortingFn: () => {
        const firstRows = table.getFilteredRowModel().flatRows.slice(10);

        let isString = false;

        for (const row of firstRows) {
          const value = row?.getValue(column.id);

          if (Object.prototype.toString.call(value) === "[object Date]") {
            return sortingFns.datetime;
          }

          if (typeof value === "string") {
            isString = true;

            if (value.split(reSplitAlphaNumeric).length > 1) {
              return sortingFns.alphanumeric;
            }
          }
        }

        if (isString) {
          return sortingFns.text;
        }

        return sortingFns.basic;
      },
      getAutoSortDir: () => {
        const firstRow = table.getFilteredRowModel().flatRows[0];

        const value = firstRow?.getValue(column.id);

        if (typeof value === "string") {
          return "asc";
        }

        return "desc";
      },
      getSortingFn: () => {
        if (!column) {
          throw new Error();
        }

        return isFunction(column.columnDef.sortingFn)
          ? column.columnDef.sortingFn
          : column.columnDef.sortingFn === "auto"
          ? column.getAutoSortingFn()
          : table.options.sortingFns?.[column.columnDef.sortingFn as string] ??
            sortingFns[column.columnDef.sortingFn as BuiltInSortingFn];
      },
      toggleSorting: (desc, multi) => {
        // if (column.columns.length) {
        //   column.columns.forEach((c, i) => {
        //     if (c.id) {
        //       table.toggleColumnSorting(c.id, undefined, multi || !!i)
        //     }
        //   })
        //   return
        // }

        // this needs to be outside of table.setSorting to be in sync with rerender
        const nextSortingOrder = column.getNextSortingOrder();
        const hasManualValue = typeof desc !== "undefined" && desc !== null;

        table.setSorting((old) => {
          // Find any existing sorting for this column
          const existingSorting = old?.find((d) => d.id === column.id);
          const existingIndex = old?.findIndex((d) => d.id === column.id);

          let newSorting: SortingState = [];

          // What should we do with this sort action?
          let sortAction: "add" | "remove" | "toggle" | "replace";
          let nextDesc = hasManualValue ? desc : nextSortingOrder === "desc";

          // Multi-mode
          if (old?.length && column.getCanMultiSort() && multi) {
            if (existingSorting) {
              sortAction = "toggle";
            } else {
              sortAction = "add";
            }
          } else {
            // Normal mode
            if (old?.length && existingIndex !== old.length - 1) {
              sortAction = "replace";
            } else if (existingSorting) {
              sortAction = "toggle";
            } else {
              sortAction = "replace";
            }
          }

          // Handle toggle states that will remove the sorting
          if (sortAction === "toggle") {
            // If we are "actually" toggling (not a manual set value), should we remove the sorting?
            if (!hasManualValue) {
              // Is our intention to remove?
              if (!nextSortingOrder) {
                sortAction = "remove";
              }
            }
          }

          if (sortAction === "add") {
            newSorting = [
              ...old,
              {
                id: column.id,
                desc: nextDesc,
              },
            ];
            // Take latest n columns
            newSorting.splice(
              0,
              newSorting.length -
                (table.options.maxMultiSortColCount ?? Number.MAX_SAFE_INTEGER)
            );
          } else if (sortAction === "toggle") {
            // This flips (or sets) the
            newSorting = old.map((d) => {
              if (d.id === column.id) {
                return {
                  ...d,
                  desc: nextDesc,
                };
              }
              return d;
            });
          } else if (sortAction === "remove") {
            newSorting = old.filter((d) => d.id !== column.id);
          } else {
            newSorting = [
              {
                id: column.id,
                desc: nextDesc,
              },
            ];
          }

          return newSorting;
        });
      },

      getFirstSortDir: () => {
        const sortDescFirst =
          column.columnDef.sortDescFirst ??
          table.options.sortDescFirst ??
          column.getAutoSortDir() === "desc";
        return sortDescFirst ? "desc" : "asc";
      },

      getNextSortingOrder: (multi?: boolean) => {
        const firstSortDirection = column.getFirstSortDir();
        const isSorted = column.getIsSorted();

        if (!isSorted) {
          return firstSortDirection;
        }

        if (
          isSorted !== firstSortDirection &&
          (table.options.enableSortingRemoval ?? true) && // If enableSortRemove, enable in general
          (multi ? table.options.enableMultiRemove ?? true : true) // If multi, don't allow if enableMultiRemove))
        ) {
          return false;
        }
        return isSorted === "desc" ? "asc" : "desc";
      },

      getCanSort: () => {
        return (
          (column.columnDef.enableSorting ?? true) &&
          (table.options.enableSorting ?? true) &&
          !!column.accessorFn
        );
      },

      getCanMultiSort: () => {
        return (
          column.columnDef.enableMultiSort ??
          table.options.enableMultiSort ??
          !!column.accessorFn
        );
      },

      getIsSorted: () => {
        const columnSort = table
          .getState()
          .sorting?.find((d) => d.id === column.id);

        return !columnSort ? false : columnSort.desc ? "desc" : "asc";
      },

      getSortIndex: () =>
        table.getState().sorting?.findIndex((d) => d.id === column.id) ?? -1,

      clearSorting: () => {
        //clear sorting for just 1 column
        table.setSorting((old) =>
          old?.length ? old.filter((d) => d.id !== column.id) : []
        );
      },

      getToggleSortingHandler: () => {
        const canSort = column.getCanSort();

        return (e: unknown) => {
          if (!canSort) return;
          (e as any).persist?.();
          column.toggleSorting?.(
            undefined,
            column.getCanMultiSort()
              ? table.options.isMultiSortEvent?.(e)
              : false
          );
        };
      },
    };
  },

  createTable: <TData extends RowData>(
    table: Table<TData>
  ): SortingInstance<TData> => {
    return {
      setSorting: (updater) => table.options.onSortingChange?.(updater),
      resetSorting: (defaultState) => {
        table.setSorting(defaultState ? [] : table.initialState?.sorting ?? []);
      },
      getPreSortedRowModel: () => table.getGroupedRowModel(),
      getSortedRowModel: () => {
        if (!table._getSortedRowModel && table.options.getSortedRowModel) {
          table._getSortedRowModel = table.options.getSortedRowModel(table);
        }

        if (table.options.manualSorting || !table._getSortedRowModel) {
          return table.getPreSortedRowModel();
        }

        return table._getSortedRowModel();
      },
    };
  },
};
