import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISortEvent, SortDirection } from '../directives/models/ISortEvent';
import { IPlayer } from '../models/player/iplayer';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() players: IPlayer[] = [];
  @Output() onSort = new EventEmitter<ISortEvent>();
  @Input() sortColumn: string = '';
  @Input() sortDirection: SortDirection = ''; 

  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;

  get arrowDirection() {
    return this.sortDirection == -1 ? faArrowDown : faArrowUp 
  }

  addArrowToHeader(column: string) {
    return this.sortColumn == column && this.sortDirection != ''
  }

  sort(event: ISortEvent) {
    this.onSort.emit(event);
  }
}
