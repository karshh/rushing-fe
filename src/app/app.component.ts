import { Component } from '@angular/core';
import { PlayerService } from './services/player/player.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  dataList: any[] = []
  constructor(private playerService: PlayerService) {
    this.playerService.getPlayers().subscribe(result => {
      this.dataList = result
    })
  }
}
