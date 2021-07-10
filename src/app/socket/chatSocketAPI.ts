import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {GameComponent} from '../component/play/games/game/game.component';
import {Message} from '../model/Message';
import {environment} from '../../environments/environment';

export class ChatSocketAPI {
  webSocketEndPoint = environment.socketUrl;
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
    this.stompClient.connect({}, frame => {
      this.stompClient.subscribe(this.socket, sdkEvent => {
        this.onMessageReceived(sdkEvent);
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

  sendMessage(chatId: string, message: string, userId: string): void {
    console.log('Sending message to API...');

    const body = {
      chatId,
      message,
      userId
    };

    this.stompClient.send('/api/socket/sendMessage', {}, JSON.stringify(body));
  }

  onMessageReceived(response): void {
    const message: Message = JSON.parse(response.body);
    console.log('Message received from Server : ' + message.user.userName + ' : ' + message.text);
    this.gameComponent.receiveMessage(message);
  }
}
