import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { IPlayer } from 'src/app/models/player/iplayer';
import { Subject } from 'rxjs';
import { ISortState } from '../models/ISortState';
import { saveAs } from 'file-saver';
import { IPaginationState } from '../models/IPaginationState';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  sortState: ISortState = { 
    column: 'Player',
    direction: 1,
  }

  paginationState: IPaginationState = {
    page: 1,
    pageSize: 10,
    collectionSize: 0
  }

  BASE_URL = 'http://127.0.0.1:5000/players/';

  players$ = new Subject<IPlayer[]>();
  collectionSize$ = new Subject<number>();

  private playerPropertyMap = {
    playerName: "Player",
    teamAbbreviation: "Team",
    playerPostion: "Pos",
    rushingAttempts: "Att",
    rushingAttG: "Att/G",
    rushingYards: "Yds",
    rushingAvg: "Avg",
    rushingYdsG: "Yds/G",
    rushingTouchdowns: "TD",
    rushingLongest: "Lng",
    rushingFD: "1st",
    rushingFDP: "1st%",
    rushing20plus: "20+",
    rushing40plus: "40+",
    rushingFUM: "FUM",
  }

  updateState(filter: string) {
    this.getPlayers(filter)
    .pipe(
      tap(data => this.paginationState.collectionSize = data.size),
      map(data => {
        return data.players.map(player => 
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
    )
    .subscribe(playersList => {
      this.players$.next(playersList)
    })
  }

  download(filter: string) {
    this.getPlayers(filter, false).subscribe(data => {
      var propertyList = Object.values(this.playerPropertyMap);
      let csv = data.players.map((row: any) => 
        propertyList.map(property => 
          JSON.stringify(
            row[property], 
            (_, value: string | number) => value === null ? '' : value
          )
        ).join(',')
      );
      csv.unshift(propertyList.join(','));
      saveAs(new Blob([csv.join('\r\n')], {type: 'text/csv' }), "players.csv");
    })
  }

  private getPlayers(filter: string, paginate: boolean = true) {
    var params = new HttpParams()
      .set('filter', filter)
      .set('sortColumn', this.sortState.column)
      .set('sortDirection', this.sortState.direction)
    
      if (paginate) {
        params = params
          .set('skip', this.paginationState.pageSize * (this.paginationState.page - 1))
          .set('limit', this.paginationState.pageSize);
      }

    return this.http.get<{ players: Array<any>, size: number }>(this.BASE_URL, { params })
  }

}
