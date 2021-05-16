import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {User} from '../../model/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  dataSource: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'email', 'userName', 'birthDate', 'actions'];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe(data => {
      console.log(data);
      this.dataSource = data;
    });
  }

}
