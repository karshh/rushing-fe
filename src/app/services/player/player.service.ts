import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPlayer } from 'src/app/models/player/iplayer';
import { BehaviorSubject } from 'rxjs';
import { SortColumn, SortDirection } from 'src/app/directives/sort-property/sort-property.directive';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  BASE_URL = 'http://127.0.0.1:5000/players/';

  players$ = new BehaviorSubject<IPlayer[]>([]);

  getPlayers() {
    return this.http.get<Array<any>>(this.BASE_URL).pipe(
      map(players => {
        return players.map(player => 
          <IPlayer> {
            playerName: player["Player"],
            teamAbbreviation: player["Team"],
            playerPostion: player["Pos"],
            rushingAttempts: player["Att"],
            rushingAttG: player["Att/G"],
            rushingYards: player["Yds"],
            rushingAvg: player["Avg"],
            rushingYdsG: player["Yds/G"],
            rushingTouchdowns: player["TD"],
            rushingLongest: player["Lng"].toString(),
            rushingFD: player["1st"],
            rushingFDP: player["1st%"],
            rushing20plus: player["20+"],
            rushing40plus: player["40+"],
            rushingFUM: player["FUM"],
          }
        )
      }) 
    ).subscribe(playersList => {
      this.players$.next(playersList)
    })
  }

  sort(direction: SortDirection, column: SortColumn) {
    this.players$.getValue().sort((a: IPlayer, b: IPlayer) => {
      if (column == '') {
        return a.playerName.localeCompare(b.playerName);
      }
      else {
        switch(direction) {
          case "asc":
            switch(column) {
              case "rushingYards":
                return b.rushingYards - a.rushingYards;
              case "rushingTouchdowns":
                return b.rushingTouchdowns - a.rushingTouchdowns;
              case "rushingLongest":
                return parseInt(b.rushingLongest.replace('T', '')) - parseInt(a.rushingLongest.replace('T', ''));
              default:
                return a.playerName.localeCompare(b.playerName);
          }
          case "desc":
            switch(column) {
              case "rushingYards":
                return a.rushingYards - b.rushingYards;
              case "rushingTouchdowns":
                return a.rushingTouchdowns - b.rushingTouchdowns;
              case "rushingLongest":
                return parseInt(a.rushingLongest.replace('T', '')) - parseInt(b.rushingLongest.replace('T', ''));
              default:
                return a.playerName.localeCompare(b.playerName);
          }
          default:
            return a.playerName.localeCompare(b.playerName);
        }
      }
    })
  }
}
