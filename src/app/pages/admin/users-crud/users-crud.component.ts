import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { UsersAdminService } from '../services/users-admin.service';
import { UserDeleteComponent } from './modal/user-delete/user-delete.component';
import { UserUpdateComponent } from './modal/user-update/user-update.component';

@Component({
  selector: 'app-users-crud',
  templateUrl: './users-crud.component.html',
  styleUrls: ['./users-crud.component.scss']
})
export class UsersCrudComponent implements OnInit {

  users: any[];
  public loaded = false;

  constructor(private modalService: NgbModal, private usersService: UsersAdminService, public loginService: LoginService, private router: Router) {
    if (!loginService.isUserSignedIn())
      this.router.navigate(['/login']);
    this.users = [];
  }

  ngOnInit(): void {
    this.users = [];
    this.getUsers();
  }

  getUsers() {
    this.usersService.getAllUsers().subscribe(
      (response: any) => {
        //console.log(response);
        this.users = JSON.parse(response);
        //console.log(this.users);   
        this.loaded = true;     
      }
    )
  }


  // Abre el modal para borrar un usuario
  userDelete(id: number) {
    const modalRef = this.modalService.open(UserDeleteComponent);
    modalRef.componentInstance.id = id;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
    modalRef.componentInstance["deleteOk"].subscribe(event => {
      this.getUsers();
    });
  }

  // Abre un modal para modificar una usuario
  userUpdate(user: any) {
    const modalRef = this.modalService.open(UserUpdateComponent);
    modalRef.componentInstance.user = user;
    modalRef.result.then((result) => {
      if (result) {
        console.log(result);
      }
    });
  }

  userActive(userId, activate) {
    this.usersService.userActivation(activate, userId).subscribe(
      (response: any) => {
        this.getUsers();
        console.log(response);
      }, 
      error => {
        console.log(error);
      }
    )
  }

}
