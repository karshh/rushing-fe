import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private http: HttpClient) { }

  getPlayers() {
    return this.http.get<Array<any>>('http://127.0.0.1:5000/players/')
  }
}
