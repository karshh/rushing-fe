import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ISortEvent } from '../directives/models/ISortEvent';
import { IPlayer } from '../models/player/iplayer';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  @Input() players: IPlayer[] = [];
  @Output() onSort = new EventEmitter<ISortEvent>();

  sort(event: ISortEvent) {
    this.onSort.emit(event);
  }
}
