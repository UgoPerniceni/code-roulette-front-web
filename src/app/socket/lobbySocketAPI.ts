import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {environment} from '../../environments/environment';
import {GameComponent} from '../component/play/games/game/game.component';
import {LobbyComponent} from '../component/lobby/lobby.component';
import {stringify} from 'querystring';

export class LobbySocketAPI {
  webSocketEndPoint = environment.socketUrl;
  socket = '/socket/lobby/update/';
  stompClient: any;
  lobbyComponent: LobbyComponent;

  lobbyId: string;

  constructor(lobbyComponent: LobbyComponent, lobbyId: string){
    this.lobbyComponent = lobbyComponent;
    this.socket = this.socket + lobbyId;
    this.lobbyId = lobbyId;

    console.log(this.socket);
  }

  _connect(): void {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, () => {
      this.sendLobbyUpdate();

      this.stompClient.subscribe(this.socket, (response) => {
        console.log(response.body);

        if (response.body == 0) {
          this.lobbyComponent.refreshLobby();
        } else {
          const path = '/play/game/' + response.body;

          console.log(path);

          this.lobbyComponent.redirectToGameCreated(path);
        }
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

  _isConnected(): boolean {
    return this.stompClient !== null;
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error): void {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  sendLobbyUpdate(): void {
    console.log('Sending updateLobby to API...');
    console.log('/api/socket/updateLobby/' + this.lobbyId);
    this.stompClient.send('/api/socket/updateLobby/' + this.lobbyId, {}, {});
  }

  sendGameCreated(gameId: string): void {
    console.log('Sending gameCreated to API...');
    console.log('/api/socket/gameCreated/' + this.lobbyId);
    this.stompClient.send('/api/socket/gameCreated/' + this.lobbyId + '/' + gameId, {});
  }
}
