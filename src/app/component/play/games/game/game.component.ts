import { Component, OnInit } from '@angular/core';
import {Game} from '../../../../model/Game';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../../../../service/game.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  game: Game;
  chatForm: FormGroup;

  constructor(private route: ActivatedRoute, private gameService: GameService, private formBuilder: FormBuilder) {
    this.chatForm = this.formBuilder.group({
      message: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.getGame();
  }

  getGame(): void {
    const gameId = String(this.route.snapshot.paramMap.get('id'));

    this.gameService.getGameById(gameId).subscribe((game) => {

      console.log('-----------------------');
      console.log(game);
      console.log('-----------------------');

      this.game = game;
    });
  }

  onSubmit(): void{

  }

}
