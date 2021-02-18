import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { RegisterService } from '../../register/services/register.service';
import { StudentProfileService } from '../services/student-profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  data;
  areas;
  can = false;
  constructor(private ProfileService: StudentProfileService, private loginService: LoginService, private registerUser: RegisterService) { }

  ngOnInit(): void {
    this.ProfileService.getStudent(this.loginService.user.user_id).subscribe(
      (response: any) => {
        this.data = response[0];
        console.log(this.data);
        this.registerUser.getAreas().subscribe(
          (response: any) => {
            this.areas = response;
            this.can = true;        
          },
          error => console.log(error)
        )   
      }
    )
  }

}
