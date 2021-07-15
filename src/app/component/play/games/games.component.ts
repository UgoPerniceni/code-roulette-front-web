import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {Game} from '../../../model/Game';
import {MatPaginator} from '@angular/material/paginator';
import {GameService} from '../../../service/game.service';
import {User} from '../../../model/User';
import {UserService} from '../../../service/user.service';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit, AfterViewInit {
  dataSource = new MatTableDataSource<Game>();
  displayedColumns: string[] = ['id', 'userPlaying', 'status', 'action'];

  games: Game[];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private gameService: GameService, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((user: User) => {
      console.log(user);
      if (user) {
        this.gameService.getGamesByUserId(user.id).subscribe((data) => {
          console.log(data);
          this.games = data;
          this.dataSource.data = data;
        });
      }
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  getUserPlaying(game: Game): string {
    return game.usersInGame
      .find(userIg => userIg.current === true).user.userName;
  }

}
