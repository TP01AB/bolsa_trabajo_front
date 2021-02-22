import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { RegisterService } from '../../register/services/register.service';
import { CompanyProfileService } from '../crear-perfil/services/view-profile.service';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent2 implements OnInit {
  data;
  can = false;
  constructor(private ProfileService: CompanyProfileService, private loginService: LoginService, private registerUser: RegisterService) { }

  ngOnInit(): void {
    this.ProfileService.getStudent(this.loginService.user.user_id).subscribe(
      (response: any) => {
        this.data = response[0];
        console.log(this.data);
        this.can = true;
      }
    )
  }

}
