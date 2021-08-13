import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from '../models/player/iplayer';
import { PlayerService } from '../services/player/player.service';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl } from '@angular/forms'
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { SortDirection } from '../directives/models/ISortEvent';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  // favicons
  edit = faPencilAlt;
  delete = faTimes;

  players$: Observable<IPlayer[]> | undefined;
  closeModal: string | undefined;

  playerNameControl = new FormControl('');
  playerNameForm = new FormGroup({
    playerName: this.playerNameControl,
  });

  constructor(private playerService: PlayerService, private modalService: NgbModal) {
  }

  ngOnInit(): void {
    this.players$ = this.playerService
    .players$
    .asObservable();
    
    this.playerService.getPlayers('');
    this.playerNameForm.controls.playerName.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => this.playerService.getPlayers(this.playerNameControl.value))
    ).subscribe()
  }

  
  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed `;
    });
  }

  onSort(event: { column: string, direction: SortDirection }) {
    var sortState = {
      column: event.direction == '' ? 'Player' : event.column,
      direction: event.direction == 'desc' ? -1 : 1
    }
    this.playerService.getPlayers(this.playerNameControl.value, sortState);
  }
  
}
