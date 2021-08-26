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

  constructor() { }

  rotate(sortDirection: SortDirection): SortDirection {
    switch(sortDirection) {
      case 1:
        return -1;
      case -1:
        return '';
      case '':
        return 1;
    }
  }
  
  onSort() {
    this.direction = this.rotate(this.direction);
    this.sort.emit({column: this.sortProperty, direction: this.direction});
  }

}
