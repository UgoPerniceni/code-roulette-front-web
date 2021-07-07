import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {PlayComponent} from '../component/play/play.component';
import {environment} from '../../environments/environment';

export class PlaySocketAPI {
  webSocketEndPoint = environment.socketUrl;
  socket = '/socket/updateQueueCounter';
  stompClient: any;
  playComponent: PlayComponent;

  constructor(playComponent: PlayComponent){
    this.playComponent = playComponent;
  }

  _connect(): void {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.socket, sdkEvent => {
        this.playComponent.refreshQueueCounter();
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

  sendQueueUpdate(): void {
    console.log('Sending sendQueueJoined to API...');
    this.stompClient.send('/api/socket/updateQueueCounter', {}, {});
  }
}
