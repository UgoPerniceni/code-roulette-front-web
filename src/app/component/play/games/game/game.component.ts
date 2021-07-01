import {Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../../model/Game';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../../../service/game.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GameSocketAPI } from '../../../../socket/gameSocketAPI';
import {Message} from '../../../../model/Message';
import {UserService} from '../../../../service/user.service';
import {Chat} from '../../../../model/Chat';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy {

  game: Game;
  webSocketAPI: GameSocketAPI;
  chatForm: FormGroup;

  chat: Chat;

  // tslint:disable-next-line:max-line-length
  constructor(private route: ActivatedRoute, private gameService: GameService, private formBuilder: FormBuilder, private userService: UserService) {
    this.chatForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.webSocketAPI = new GameSocketAPI(this);
    this.webSocketAPI._connect();

    this.getGame();
  }

  ngOnDestroy(): void {
    this.webSocketAPI._disconnect();
  }

  getGame(): void {
    const gameId = String(this.route.snapshot.paramMap.get('id'));

    this.gameService.getGameById(gameId).subscribe((game) => {

      console.log('-----------------------');
      console.log(game);
      console.log('-----------------------');

      this.game = game;
      this.chat = this.game.chat;
    });
  }

  sendMessage(): void{
    if (this.chatForm.valid && this.game.chat != null) {
      const textMessage = this.chatForm.get('message').value;

      this.userService.getCurrentUser().subscribe((user) => {
        const message = new Message(textMessage, user);
        console.log('form\'s message');
        console.log(message);

        this.webSocketAPI.sendMessage(this.game.chat.id, textMessage, user.id);

        this.chatForm.reset();
      });
    }
  }

  receiveMessage(message: Message): void {
    this.chat.messages.push(message);
  }

}
