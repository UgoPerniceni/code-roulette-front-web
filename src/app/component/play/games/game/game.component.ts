import {AfterViewChecked, Component, OnDestroy, OnInit} from '@angular/core';
import {Game} from '../../../../model/Game';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../../../service/game.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GameSocketAPI } from '../../../../socket/gameSocketAPI';
import {Message} from '../../../../model/Message';
import {UserService} from '../../../../service/user.service';
import {Chat} from '../../../../model/Chat';
import {Compilation} from '../../../../model/Compilation';
import {CodeService} from '../../../../service/code.service';
import {interval} from 'rxjs';
import {take} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Theme {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit, OnDestroy, AfterViewChecked {

  game: Game;
  webSocketAPI: GameSocketAPI;
  chatForm: FormGroup;

  chat: Chat;

  languageCM = 'markdown';
  theme = 'default';

  themes: Theme[] = [
    { value: 'default', viewValue: 'Default' },
    { value: 'darcula', viewValue: 'Darcula' },
    { value: 'eclipse', viewValue: 'Eclipse' },
    { value: 'material', viewValue: 'Material' },
    { value: 'monokai', viewValue: 'Monokai' },
  ];

  options = {
    theme: this.theme,
    mode: this.languageCM,

    lineNumbers: true,
    lineWrapping: true,
    autoCloseBrackets: true,
    matchBrackets: true,
    lint: true,
    extraKeys: { 'Ctrl-Space': 'autocomplete' }
  };
  readOnly = false;

  loading = false;
  content = '';
  result = '';

  time = 16; // 15s
  timerInterval = interval(1000); // 1s
  countDown;

  timerValue = 1;
  timerSubscription;

  isPlaying = 'None';
  simpleCardStyle = 'blue';

  constructor(private route: ActivatedRoute, private gameService: GameService, private formBuilder: FormBuilder,
              private userService: UserService, private codeService: CodeService, private snackBar: MatSnackBar) {
    this.chatForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.webSocketAPI = new GameSocketAPI(this);
    this.webSocketAPI._connect();

    this.getGame();

    this.initializeTimer();
    this.changeSimpleCardStyleToDanger();
  }

  ngAfterViewChecked(): void {}

  ngOnDestroy(): void {
    this.webSocketAPI._disconnect();
    this.timerSubscription.unsubscribe();
  }

  getGame(): void {
    const gameId = String(this.route.snapshot.paramMap.get('id'));

    this.gameService.getGameById(gameId).subscribe((game) => {

      console.log('-----------------------');
      console.log(game);
      console.log('-----------------------');

      this.game = game;
      this.chat = this.game.chat;

      this.languageCM = this.getLanguageCM(this.game.exercise.language.toString());
      this.changeLanguageCM();
      this.content = this.game.exercise.code;
    });
  }

  private getLanguageCM(language: string): string {
    const languagesCM = new Map();

    languagesCM.set('Markdown', 'markdown');
    languagesCM.set('C', 'text/x-csrc');
    languagesCM.set('Python', 'text/x-python');
    languagesCM.set('javascript', 'text/javascript');
    languagesCM.set('TypeScript', 'text/typescript');
    languagesCM.set('Java', 'text/x-java');

    return languagesCM.get(language);
  }

  changeLanguageCM(): void {
    this.options = {
      ...this.options,
      mode: this.languageCM,
    };
  }

  changeTheme(): void {
    this.options = {
      ...this.options,
      theme: this.theme,
    };
  }

  handleChange($event: Event): void {
    this.content = $event as unknown as string;
  }

  clear(): void {
    this.content = '';
  }

  compile(): void {
    console.log('content' + this.content);

    this.loading = true;

    if (this.game.exercise) {
      this.game.exercise.code = this.content;

      this.codeService.compile(this.game.exercise).subscribe((data: Compilation) => {
        console.log(data);

        this.result = data.output;
        this.loading = false;
      });
    }
  }

  // Socket
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

  initializeTimer(): void {
    this.countDown = this.timerInterval.pipe(take(this.time));

    this.timerSubscription = this.countDown.subscribe(val => {
      console.log('decrease time');

      this.timerValue = (this.time - val);

      if (this.timerValue === 1) {
        this.openSnackBar('Time is up !', 'Close');

        this.timerValue = 1;
      }
    });
  }

  changeSimpleCardStyleToDanger(): void {
    this.simpleCardStyle = 'background-color: #ff0000;font-weight: bold;color: white';
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action);
  }
}
