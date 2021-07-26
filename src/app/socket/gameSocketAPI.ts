import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';
import {GameComponent} from '../component/play/games/game/game.component';

export class GameSocketAPI {
  webSocketEndPoint = environment.socketUrl;
  socket = '/socket/game/update/';
  gameId: string;
  stompClient: any;
  gameComponent: GameComponent;

  constructor(gameComponent: GameComponent, gameId: string){
    this.gameComponent = gameComponent;
    this.gameId = gameId;
    this.socket = this.socket + gameId;

    console.log(this.socket);
  }

  _connect(): void {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.socket, sdkEvent => {
        this.gameComponent.refreshGame(this.gameId);
      });
      this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  }

  _disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('Disconnected');
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error): void {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  sendGameUpdate(gameId: string): void {
    console.log('Sending updateGame to API...');
    console.log('/api/socket/endTurn/' + gameId);
    this.stompClient.send('/api/socket/endTurn/' + gameId, {}, {});
  }
}
