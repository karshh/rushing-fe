import { Component, OnInit } from '@angular/core';
import { PlayerService } from '../services/player/player.service';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {

  constructor(private playerService: PlayerService) { }

  get page() {
    return this.playerService.paginationState.page;
  }

  set page(_page: number) {
    this.playerService.updatePaginationState(_page);
  }

  get collectionSize() {
    return this.playerService.paginationState.collectionSize;
  }

  get pageSize() {
    return this.playerService.paginationState.pageSize
  }

  ngOnInit(): void {
  }

}
