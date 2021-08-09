import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPlayer } from 'src/app/models/player/iplayer';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://127.0.0.1:5000/players/';

  getPlayers() {
    return this.http.get<Array<any>>(this.BASE_URL).pipe(
      map(players => {
        return players.map(player => 
          <IPlayer> {
            playerName: player["Player"],
            teamAbbreviation: player["Team"],
            playerPostion: player["Pos"],
            rushingAttG: player["Att"],
            rushingAttempts: player["Att/G"],
            rushingYards: player["Yds"],
            rushingAvg: player["Avg"],
            rushingYdsG: player["Yds/G"],
            rushingTouchdowns: player["TD"],
            rushLongest: player["Lng"],
            rushingFD: player["1st"],
            rushingFDP: player["1st%"],
            rushing20plus: player["20+"],
            rushing40plus: player["40+"],
            rushingFUM: player["FUM"],
          }
        )
      }) 
    )
  }
}
