export type SortDirection = 1 | -1 | '';

export interface ISortEvent {
    column: string;
    direction: SortDirection;
  }