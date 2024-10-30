import { Component, OnInit } from '@angular/core';
import { Iuser } from '../../models/iuser';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: Iuser[] = [];
  searchtext: any;

  constructor(public userservice: UsersService) {}

  ngOnInit(): void {
    this.userservice.users$.subscribe(
      (users) => {
        this.users = users;
        console.log(users);
      },
      (err) => {
        console.log(err);
      }
    );

    this.userservice.getAllusers().subscribe();
  }

  deleteUser(id: any): void {
    this.userservice.deleteUser(id).subscribe(
      () => {
        console.log('User deleted successfully.');
      },
      (error) => {
        console.error('Error deleting user:', error);
      }
    );
  }
}
