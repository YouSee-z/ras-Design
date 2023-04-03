import {
  RowData,
  TableState,
  InitialTableState,
  Row,
  Table,
  TableOptions,
  TableMeta,
  RowModel,
  ColumnDef,
} from ".";
import { Updater } from "@rasDesign/types";
export interface CoreOptions<TData extends RowData> {
  data: TData[];
  state: Partial<TableState>;
  onStateChange: (updater: Updater<TableState>) => void;
  debugAll?: boolean;
  debugTable?: boolean;
  debugHeaders?: boolean;
  debugColumns?: boolean;
  debugRows?: boolean;
  initialState?: InitialTableState;
  autoResetAll?: boolean;
  mergeOptions?: (
    defaultOptions: TableOptions<TData>,
    options: Partial<TableOptions<TData>>
  ) => TableOptions<TData>;
  meta?: TableMeta<TData>;
  getCoreRowModel: (table: Table<any>) => () => RowModel<any>;
  getSubRows?: (originalRow: TData, index: number) => undefined | TData[];
  getRowId?: (originalRow: TData, index: number, parent?: Row<TData>) => string;
  columns: ColumnDef<TData, any>[];
  defaultColumn?: Partial<ColumnDef<TData, unknown>>;
  renderFallbackValue: any;
}
