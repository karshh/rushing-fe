import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { IPlayer, playerPropertyList } from 'src/app/models/player/iplayer';
import { BehaviorSubject, Subject } from 'rxjs';
import { ITableState } from '../models/ITableState';
import { saveAs } from 'file-saver';
import { IPaginationState } from '../models/IPaginationState';
import { ITableFormState } from '../models/ITableFormState';
import { IPlayerResponse } from '../models/IPlayerResponse';
import { ServerStatus } from '../models/ServerStatus';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  BASE_URL = 'http://127.0.0.1:5000/players/';
  players$ = new Subject<IPlayer[]>();
  serverStatus$ = new Subject<ServerStatus>();

  tableState: ITableState = { 
    sortColumn: 'Player',
    sortDirection: 1,
  }

  tableFormState: ITableFormState = {
    filter: ''
  }

  paginationState: IPaginationState = {
    page: 1,
    pageSize: 10,
    collectionSize: 0
  }
  
  constructor(private http: HttpClient) { }

  updateTableFormState(tableFormState: ITableFormState) {
    this.tableFormState.filter = tableFormState.filter;
    this.refreshData()
  }

  updateTableState(tableState: ITableState) {
    this.tableState.sortColumn = tableState.sortColumn;
    this.tableState.sortDirection = tableState.sortDirection;
    this.refreshData();
  }

  updatePaginationState(page: number) {
    this.paginationState.page = page;
    this.refreshData();
  }

  refreshData() {
    this.serverStatus$.next(ServerStatus.LOADING_DATA);
    this.getPlayers()
    .pipe(
      tap(data => {
        this.paginationState.collectionSize = data.size;
        this.players$.next(data.players);
        this.serverStatus$.next(ServerStatus.NONE);
      })).subscribe(
        _ => _, 
        _ => {
        this.serverStatus$.next(ServerStatus.ERROR);
      });
  }

  download() {
    this.serverStatus$.next(ServerStatus.EXPORT_CSV);
    this.getPlayers(false).subscribe(data => {
      let csv = data.players.map((row: any) => 
      playerPropertyList.map(property => 
          JSON.stringify(
            row[property], 
            (_, value: string | number) => value === null ? '' : value
          )
        ).join(',')
      );
      csv.unshift(playerPropertyList.join(','));
      this.serverStatus$.next(ServerStatus.NONE);
      saveAs(new Blob([csv.join('\r\n')], {type: 'text/csv' }), "players.csv");
    }, _ => {
      this.serverStatus$.next(ServerStatus.ERROR);
    })
  }

  upload(jsonString: any) {
    this.serverStatus$.next(ServerStatus.IMPORT_JSON);
    return this.http.post<IPlayerResponse>(this.BASE_URL + 'upload', JSON.parse(jsonString)).subscribe(result => {
      this.refreshData();
    }, _ => {
      this.serverStatus$.next(ServerStatus.ERROR);
    })
  }

  private getPlayers(paginate: boolean = true) {
    var params = new HttpParams()
      .set('filter', this.tableFormState.filter)
      .set('sortColumn', this.tableState.sortColumn)
      .set('sortDirection', this.tableState.sortDirection)
    
      if (paginate) {
        params = params
          .set('skip', this.paginationState.pageSize * (this.paginationState.page - 1))
          .set('limit', this.paginationState.pageSize);
      }

    return this.http.get<IPlayerResponse>(this.BASE_URL, { params })
  }
}
