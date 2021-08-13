export type SortDirection = 'asc' | 'desc' | '';

export interface ISortEvent {
    column: string;
    direction: SortDirection;
  }