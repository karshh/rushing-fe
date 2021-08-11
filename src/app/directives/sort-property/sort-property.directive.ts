import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { IPlayer } from 'src/app/models/player/iplayer';

export type SortColumn = keyof IPlayer | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };

export interface SortEvent {
  column: SortColumn;
  direction: SortDirection;
}

@Directive({
  selector: 'th[sort-property]',
  host: {
    '(click)': 'onSort()'
  }
})
export class SortPropertyDirective {

  @Input('sort-property') sortProperty: SortColumn = '';
  direction: SortDirection = '';
  @Output() sort = new EventEmitter<SortEvent>();
  
  constructor() { }

  onSort() {
    this.direction = rotate[this.direction];
    this.sort.emit({column: this.sortProperty, direction: this.direction});
  }

}
