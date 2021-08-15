import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { faFileExport, faFileImport } from '@fortawesome/free-solid-svg-icons';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { PlayerService } from '../services/player/player.service';

@Component({
  selector: 'app-table-form',
  templateUrl: './table-form.component.html',
  styleUrls: ['./table-form.component.scss']
})
export class TableFormComponent implements OnInit {

  export = faFileExport;
  import = faFileImport;
  
  playerNameControl = new FormControl('');
  playerNameForm = new FormGroup({
    playerName: this.playerNameControl,
  });
  
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.updateTableState({ filter: '' });
    this.playerNameForm.controls.playerName.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(_ => this.playerService.updateTableState({ filter: this.playerNameControl.value }))
    ).subscribe()
  }

  onDownloadClick() {
    this.playerService.download();
    return false;
  }
}
