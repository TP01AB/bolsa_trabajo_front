import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/auth/services/login.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-users-crud',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.scss']
})
export class UsersCrudComponent implements OnInit {

  users: any[];
  constructor(private usersService: UsersService, private loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['/login']);
    this.users = [];
  }

  ngOnInit(): void {
    this.users = [];
    this.usersService.getAllUsers().subscribe(
      (response: any) => {
        //console.log(response);
        this.users = JSON.parse(response);
        console.log(this.users);
      }
    )
  }

  public onSubmit(user_id) {
    
  }
}
