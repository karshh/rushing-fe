import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from '../models/player/iplayer';
import { PlayerService } from '../services/player/player.service';
import { faPencilAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SortColumn, SortDirection } from '../directives/sort-property/sort-property.directive';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { debounceTime, distinctUntilChanged, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  edit = faPencilAlt;
  delete = faTimes;
  players$: Observable<IPlayer[]> | undefined;

  constructor(private playerService: PlayerService, private modalService: NgbModal) {
  }

  playerNameControl = new FormControl('')
  playerNameForm = new FormGroup({
    playerName: this.playerNameControl,
  })

  ngOnInit(): void {
    this.players$ = this.playerService
    .players$
    .asObservable();
    
    this.playerService.getPlayers();
    this.playerNameForm.controls.playerName.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      // ADD FILTER CHANGE HERE.
    ).subscribe()
  }

  closeModal: string | undefined;
  page = 3
  
  triggerModal(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((res) => {
      this.closeModal = `Closed with: ${res}`;
    }, (res) => {
      this.closeModal = `Dismissed `;
    });
  }

  onSort(event: { column: SortColumn, direction: SortDirection }) {
    this.playerService.sort(event.direction, event.column)
  }
  
}
