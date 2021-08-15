import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from '../models/player/iplayer';
import { PlayerService } from '../services/player/player.service';
import { faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { FormGroup, FormControl } from '@angular/forms'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SortDirection } from '../directives/models/ISortEvent';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {


  players$: Observable<IPlayer[]> | undefined;

  constructor(private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.players$ = this.playerService.players$;
  }

  onSort(event: { column: string, direction: SortDirection }) {
    var newTableState = {
      sortColumn: event.direction == '' ? 'Player' : event.column,
      sortDirection: event.direction == 'desc' ? -1 : 1
    }
    this.playerService.updateTableState(newTableState);
  }
}
