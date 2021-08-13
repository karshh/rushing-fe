import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { IPlayer } from 'src/app/models/player/iplayer';
import { Subject } from 'rxjs';
import { ISortState } from '../models/ISortState';



@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  sortState: ISortState = { 
    column: 'Player',
    direction: 1,
  }

  BASE_URL = 'http://127.0.0.1:5000/players/';

  players$ = new Subject<IPlayer[]>();

  playerPropertyMap = {
    playerName:"Player",
    teamAbbreviation:"Team",
    playerPostion:"Pos",
    rushingAttempts:"Att",
    rushingAttG:"Att/G",
    rushingYards:"Yds",
    rushingAvg:"Avg",
    rushingYdsG:"Yds/G",
    rushingTouchdowns:"TD",
    rushingLongest:"Lng",
    rushingFD:"1st",
    rushingFDP:"1st%",
    rushing20plus:"20+",
    rushing40plus:"40+",
    rushingFUM:"FUM",
  }

  getPlayers(filter: string, sort?: ISortState) {

    if (sort != null) this.sortState = { ...sort }
    var params = new HttpParams()
      .set('filter', filter)
      .set('sortColumn', this.sortState.column)
      .set('sortDirection', this.sortState.direction);
    return this.http.get<Array<any>>(this.BASE_URL, { params }).pipe(
      map(players => {
        return players.map(player => 
          <IPlayer> {
            playerName: player[this.playerPropertyMap.playerName],
            teamAbbreviation: player[this.playerPropertyMap.teamAbbreviation],
            playerPostion: player[this.playerPropertyMap.playerPostion],
            rushingAttempts: player[this.playerPropertyMap.rushingAttempts],
            rushingAttG: player[this.playerPropertyMap.rushingAttG],
            rushingYards: player[this.playerPropertyMap.rushingYards],
            rushingAvg: player[this.playerPropertyMap.rushingAvg],
            rushingYdsG: player[this.playerPropertyMap.rushingYdsG],
            rushingTouchdowns: player[this.playerPropertyMap.rushingTouchdowns],
            rushingLongest: player[this.playerPropertyMap.rushingLongest],
            rushingFD: player[this.playerPropertyMap.rushingFD],
            rushingFDP: player[this.playerPropertyMap.rushingFDP],
            rushing20plus: player[this.playerPropertyMap.rushing20plus],
            rushing40plus: player[this.playerPropertyMap.rushing40plus],
            rushingFUM: player[this.playerPropertyMap.rushingFUM],
          }
        )
      }) 
    ).subscribe(playersList => {
      this.players$.next(playersList)
    })
  }
}
