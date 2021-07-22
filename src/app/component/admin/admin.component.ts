import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  dataSource: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'userName', 'birthDate', 'actions'];

  currentUser: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.refreshDataSource();
  }

  deleteUser(userId: string): void {
    this.userService.deleteUser(userId).subscribe(data => {
      console.log(data);
      if (data.status === 204) {
        this.dataSource = this.dataSource.filter(item => item.id !== userId);
      }
    });
  }

  refreshDataSource(): void {
    this.userService.getUsers().subscribe(users => {
      console.log(users);
      this.dataSource = users;

      this.userService.getCurrentUser().subscribe((userConnected) => {
        this.currentUser = userConnected;
      });
    });
  }

}
