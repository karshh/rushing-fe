import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IPlayer } from '../models/player/iplayer';
import { PlayerService } from '../services/player/player.service';

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
    this.players$ = this.playerService.getPlayers()
  }

}
