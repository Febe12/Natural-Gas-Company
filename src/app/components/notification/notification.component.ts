import { Component, OnInit } from '@angular/core';
import { Warning } from '../../models/warning';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  allwarning: Warning[] = [];

  constructor(public userservice: UsersService) {}

  ngOnInit(): void {
    this.userservice.warnings$.subscribe(
      (warnings) => {
        this.allwarning = warnings;
        console.log(warnings);
      },
      (err) => {
        console.log(err);
      }
    );

    this.userservice.getAlldeals().subscribe();
  }

  deletenotification(id: any): void {
    this.userservice.deletenotification(id).subscribe(
      () => {
        console.log('Notification deleted successfully.');
      },
      (error) => {
        console.error('Error deleting notification:', error);
      }
    );
  }
}
