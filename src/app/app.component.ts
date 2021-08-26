import { Component, OnInit } from '@angular/core';
import { ISortEvent } from './directives/models/ISortEvent';
import { ServerStatus } from './services/models/ServerStatus';
import { PlayerService } from './services/player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  players$ = this.playerService.players$;
  serverStatus = ServerStatus.NONE;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.playerService.serverStatus$.subscribe(newServerStatus => this.serverStatus = newServerStatus)
    this.playerService.updateTableFormState({ filter: '' });
  }

  get sortColumn() {
    return this.playerService.tableState.sortColumn
  }

  get sortDirection() {
    return this.playerService.tableState.sortDirection
  }

  onSort(event: ISortEvent) {
    this.playerService.updateTableState({
      sortColumn: event.direction == '' ? '' : event.column,
      sortDirection: event.direction
    });
  }

  onFilter(filter: string) {
    this.playerService.updateTableFormState({ filter });
  }
  
  onDownload() {
    this.playerService.download();
  }

  onUpload(event: string) {
    this.playerService.upload(event);
  }

}
