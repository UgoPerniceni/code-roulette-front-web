import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/User';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-rank',
  templateUrl: './rank.component.html',
  styleUrls: ['./rank.component.scss']
})
export class RankComponent implements OnInit, AfterViewInit {

  dataSource = new MatTableDataSource<User>();
  displayedColumns: string[] = ['index', 'elo', 'email', 'userName', 'gamesWon', 'gamesPlayed', 'winRate'];

  users: User[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.refreshDataSource();
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  refreshDataSource(): void {
    this.userService.getUsers().subscribe((data) => {
      console.log(data);

      this.users = data;
      this.dataSource.data = data;
    });
  }

  winRate(user: User): string {
    if (user.gamesPlayed === 0){
      return '0';
    }

    return ((user.gamesWon / user.gamesPlayed) * 100).toFixed(1);
  }

}
