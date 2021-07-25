import {AfterViewChecked, Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import { Game } from '../../../../model/Game';
import { ActivatedRoute } from '@angular/router';
import { GameService } from '../../../../service/game.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChatSocketAPI } from '../../../../socket/chatSocketAPI';
import { Message } from '../../../../model/Message';
import { UserService } from '../../../../service/user.service';
import { Chat } from '../../../../model/Chat';
import { Compilation } from '../../../../model/Compilation';
import { CodeService } from '../../../../service/code.service';
import {interval, Observable} from 'rxjs';
import { take } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CompilationDialogComponent } from './compilation-dialog/compilation-dialog.component';
import { User } from '../../../../model/User';
import { UserInGame } from '../../../../model/UserInGame';
import { GameSocketAPI } from '../../../../socket/gameSocketAPI';
import {ComponentCanDeactivate} from '../../../../guard/can-leave-game.guard';

interface Theme {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy, AfterViewChecked, ComponentCanDeactivate {

  game: Game;
  chatWebSocketAPI: ChatSocketAPI;
  gameWebSocketAPI: GameSocketAPI;

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

  time = 21; // 20s
  timerInterval = interval(1000); // 1s
  countDown;

  timerValue = 1;
  timerSubscription;

  userConnected: User;
  usernamePlaying: string;

  isPlaying = false;

  score = 0;
  compileDisabled = false;
  compileLoading = false;

  winner: UserInGame;

  constructor(private route: ActivatedRoute, private gameService: GameService, private formBuilder: FormBuilder,
              private userService: UserService, private codeService: CodeService, private snackBar: MatSnackBar,
              private dialog: MatDialog) {
    this.chatForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.chatWebSocketAPI = new ChatSocketAPI(this);
    this.chatWebSocketAPI._connect();

    this.userService.getCurrentUser().subscribe((user) => {
      this.userConnected = user;

      this.getGame();
    });
  }

  ngAfterViewChecked(): void { }

  ngOnDestroy(): void {
    if (this.game && !this.game.gameOver) {
      // const userInGameConnected: UserInGame = this.game.usersInGame.find(userInGame => userInGame.user.id === this.userConnected.id);
      this.game.usersInGame.find(userInGame => userInGame.user.id === this.userConnected.id).forfeit = true;
      console.log(this.game);

      this.gameService.forfeit(this.game).subscribe((data) => {
        this.gameWebSocketAPI.sendGameUpdate(this.game.id);
        this.chatWebSocketAPI.sendMessage(this.game.chat.id, 'has forfeit the game (game is cancelled).', 'result', this.userConnected.id);

        this.unsubscribes();
      });

    } else {
      this.unsubscribes();
    }
  }

  getGame(): void {
    const gameId = String(this.route.snapshot.paramMap.get('id'));

    this.gameService.getGameById(gameId).subscribe((game) => {

      console.log('-----------------------');
      console.log(game);
      console.log('-----------------------');

      this.game = game;
      this.chat = this.game.chat;

      this.time = this.game.timer;

      this.languageCM = this.getLanguageCM(this.game.exercise.language.toString());
      this.changeLanguageCM();

      if (this.game.code === '') {
        this.content = this.game.exercise.code;
      } else {
        this.content = this.game.code;
      }

      if (this.gameWebSocketAPI == null) {
        this.gameWebSocketAPI = new GameSocketAPI(this, this.game.id);
        this.gameWebSocketAPI._connect();
      }

      this.updateGameState();
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
      this.compileLoading = true;

      const timer = this.timerValue;

      if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
      }
      this.game.exercise.code = this.content; // le code affiché est game.code et le code compilé par le user est le game.exercise.code

      this.codeService.compileGame(this.game, timer).subscribe((compilation: Compilation) => {
        console.log(compilation);

        this.result = compilation.output;
        this.loading = false;
        this.compileLoading = false;

        this.game.compilations.push(compilation);
        this.openCompilationDialog(compilation, this.game.code);

        this.game.usersInGame
          .find(userIg => userIg.user.id === this.userConnected.id).score = this.score;

        this.sendNotification('has scored ' + compilation.score + ' pts.');

        // Change turn
        this.gameService.endTurn(this.game).subscribe((game) => {
          this.game = game;
          this.gameWebSocketAPI.sendGameUpdate(this.game.id);

          if (this.game.gameOver) {
            this.sendGameResult(this.getWinner().user, ' has won !');
          }
        });
      });
    }
  }

  // Socket
  sendMessage(): void {
    if (this.chatForm.valid && this.game.chat != null) {
      const textMessage = this.chatForm.get('message').value;

      this.userService.getCurrentUser().subscribe((user) => {
        const message = new Message(textMessage, 'input', user);
        console.log('form\'s message');
        console.log(message);

        this.chatWebSocketAPI.sendMessage(this.game.chat.id, textMessage, 'input', user.id);

        this.chatForm.reset();
      });
    }
  }

  sendNotification(notificationMessage: string): void {
      this.userService.getCurrentUser().subscribe((user) => {
        const message = new Message(notificationMessage, 'notification', user);
        console.log('form\'s notification');
        console.log(message);

        this.chatWebSocketAPI.sendMessage(this.game.chat.id, notificationMessage, 'notification', user.id);
      });
  }

  sendGameResult(winner: User, resultMessage: string): void {
      const message = new Message(resultMessage, 'result', winner);
      console.log(message);

      this.chatWebSocketAPI.sendMessage(this.game.chat.id, resultMessage, 'result', winner.id);
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
        this.compile();
        this.openSnackBar('Time is up !', 'Close');

        this.timerValue = 1;
      }
    });
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action);
  }

  formatDate(data: any): string {
    let dateStr = '';

    if (data) {
      let milliSeconds = data[6];
      milliSeconds = String(milliSeconds).slice(0, 3);
      dateStr = `${data[0]}-${data[1]}-${data[2]} ${data[3]}:${data[4]}:${data[5]}:${milliSeconds}`;
    }

    return dateStr;
  }

  openCompilationDialog(compilation: Compilation, code: string): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = { compilation, code };

    const dialogRef = this.dialog.open(CompilationDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      _ => {
        this.updateScore();
      }
    );
  }

  getCompilationsOfUser(): number {
    let i = 0;

    this.game.compilations.forEach((compilation) => {
      if (compilation.user.id === this.userConnected.id) {
        i++;
      }
    });

    return i;
  }

  userConnectedIsPlaying(): boolean {
    const userInGameConnected: UserInGame = this.game.usersInGame.find(userInGame => userInGame.user.id === this.userConnected.id);

    this.usernamePlaying = this.game.usersInGame.find(userInGame => userInGame.current).user.userName;

    return userInGameConnected.current;
  }

  updateScore(): void {
    let scoreTotal = 0;
    this.game.compilations.forEach(compilation => {
      if (compilation.user.id === this.userConnected.id) {
        scoreTotal = scoreTotal + Number(compilation.score);
      }
    });

    this.score = scoreTotal;
  }

  refreshGame(): void {
    this.getGame();
  }

  updateGameState(): void {
    this.updateScore();

    if (this.game.gameOver) {
      this.readOnly = true;
      this.winner = this.getWinner();

      return;
    }

    if (this.userConnectedIsPlaying()) {
      this.isPlaying = true;
      this.compileDisabled = false;

      this.initializeTimer();
    } else {
      this.isPlaying = false;
      this.compileDisabled = true;
    }
  }

  getWinner(): UserInGame {
    return this.game.usersInGame.find(userIg => userIg.won === true);
  }

  // @HostListener allows us to also guard against browser refresh, close, etc.
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    // returning true will navigate without confirmation
    // returning false will show a confirm dialog before navigating away
    if (this.game && !this.game.gameOver) {
      return false;
    }

    return true;
  }

  unsubscribes(): void {
    if (this.chatWebSocketAPI !== undefined) {
      this.chatWebSocketAPI._disconnect();
    }

    if (this.chatWebSocketAPI !== undefined) {
      this.gameWebSocketAPI._disconnect();
    }

    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }
}
