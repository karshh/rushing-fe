import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ISortEvent, SortDirection } from '../models/ISortEvent';

@Directive({
  selector: 'th[sort-property]',
  host: {
    '(click)': 'onSort()'
  }
})
export class SortPropertyDirective {

  @Input('sort-property') sortProperty: string = '';
  direction: SortDirection = '';
  @Output() sort = new EventEmitter<ISortEvent>();

  rotate: {[key: string]: SortDirection} = { 'asc': 'desc', 'desc': '', '': 'asc' };
  constructor() { }

  onSort() {
    this.direction = this.rotate[this.direction];
    this.sort.emit({column: this.sortProperty, direction: this.direction});
  }

}
