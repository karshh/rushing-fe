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
    playerName: this.playerNameControl
  });
  
  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.playerService.updateTableFormState({ filter: '' });
    this.playerNameControl.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap((filter: string) => this.playerService.updateTableFormState({ filter }))
    ).subscribe()
  }

  onDownloadClick() {
    this.playerService.download();
    return false;
  }
}
