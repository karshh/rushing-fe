import { SortDirection } from "src/app/directives/models/ISortEvent";

export interface ITableState {
    sortColumn: string;
    sortDirection: SortDirection;
}
  