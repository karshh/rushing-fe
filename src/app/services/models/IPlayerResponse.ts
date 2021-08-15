import { IPlayer } from "src/app/models/player/iplayer";

export interface IPlayerResponse {
    size: number;
    players: IPlayer[];
  }