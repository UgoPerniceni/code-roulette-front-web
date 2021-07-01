import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {GameComponent} from '../component/play/games/game/game.component';
import {Message} from '../model/Message';

export class WebSocketAPI {
  webSocketEndPoint = 'http://localhost:8080/ws';
  socket = '/socket/chat';
  stompClient: any;
  gameComponent: GameComponent;

  constructor(gameComponent: GameComponent){
    this.gameComponent = gameComponent;
  }

  _connect(): void {
    console.log('Initialize WebSocket Connection');
    const ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const that = this;
    that.stompClient.connect({}, function (frame) {
      that.stompClient.subscribe(that.socket, function (sdkEvent) {
        that.onMessageReceived(sdkEvent);
      });
      // that.stompClient.reconnect_delay = 2000;
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

  _send(chatId: string, message: string, userId: string): void {
    console.log('Sending message to API...');

    const body = {
      chatId,
      message,
      userId
    };

    this.stompClient.send('/app/hello', {}, JSON.stringify(body));
  }

  onMessageReceived(response): void {
    const message: Message = JSON.parse(response.body);
    console.log('Message received from Server : ' + message.formatMessageToChat);
    this.gameComponent.receiveMessage(message);
    // this.gameComponent.receiveMessage(JSON.stringify(message.body));
  }
}
