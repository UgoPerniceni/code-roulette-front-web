import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';
import {GameComponent} from '../component/play/games/game/game.component';
import {LobbyComponent} from '../component/lobby/lobby.component';

export class LobbySocketAPI {
  webSocketEndPoint = environment.socketUrl;
  socket = '/socket/lobby/update/';
  stompClient: any;
  lobbyComponent: LobbyComponent;

  constructor(lobbyComponent: LobbyComponent, lobbyId: string){
    this.lobbyComponent = lobbyComponent;
    this.socket = this.socket + lobbyId;

    console.log(this.socket);
  }

  _connect(): void {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.stompClient.subscribe(this.socket, () => {
        this.lobbyComponent.refreshLobby();
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

  sendLobbyUpdate(lobbyId: string): void {
    console.log('Sending updateLobby to API...');
    console.log('/api/socket/updateLobby/' + lobbyId);
    this.stompClient.send('/api/socket/endTurn/' + lobbyId, {}, {});
  }
}
