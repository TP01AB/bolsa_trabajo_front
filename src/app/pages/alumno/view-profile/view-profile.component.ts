import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/auth/services/login.service';
import { RegisterService } from '../../register/services/register.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { StudentProfileService } from '../services/student-profile.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-view-profile',
  templateUrl: './view-profile.component.html',
  styleUrls: ['./view-profile.component.scss']
})
export class ViewProfileComponent implements OnInit {

  data;
  areas;
  studentAreas;
  can = false;
  constructor(private ProfileService: StudentProfileService, private loginService: LoginService, private registerUser: RegisterService, private sanitizer:DomSanitizer) { }

  avatar;
  change: boolean;
  selectedFile: File = null;

  uploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    imgSrc: new FormControl('', [Validators.required])
  });

  ngOnInit(): void {
    this.change = false;
    //Cargo foto de perfil
    this.loginService.getImage(this.loginService.user.user_id).subscribe(
      (response: any) => {
        //console.log(response);
        this.avatar = URL.createObjectURL(response);
        this.avatar = this.sanitizer.bypassSecurityTrustUrl(this.avatar);
        //console.log(this.imageToShow);
      },
      (error: any) => {
        console.log(error);
        this.avatar = "/assets/img_profile.jpeg";
      }
    );
    this.ProfileService.getStudent(this.loginService.user.user_id).subscribe(
      (response: any) => {
        this.data = response[0];
        //console.log(this.data);
        this.ProfileService.getStudentArea().subscribe(
          (response: any) => {
            //console.log(response)
            this.studentAreas = response;
            this.registerUser.getAreas().subscribe(
              (response: any) => {
                this.areas = response;
                this.can = true;        
              },
              error => console.log(error)
            )   
          },
          (error: any) => {
            console.log(error);
          }
        )
      },
      (error: any) => {
        console.log(error);
      }
    )
  }

  get uf(){
    return this.uploadForm.controls;
  }

  onImageChange(e) {
    this.change = true;
    const reader = new FileReader();
    
    if(e.target.files && e.target.files.length) {
      const [file] = e.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
        this.avatar = reader.result as string;
        this.uploadForm.patchValue({
          imgSrc: reader.result
        });
   
      };
    }
    this.selectedFile = e.target.files[0];
    console.log(this.selectedFile);
  }

  upload () {
    const fd = new FormData();
    var str = this.selectedFile.name;
    str = str.normalize("NFD").replace(/\p{Diacritic}/gu, "");
    console.log(str);
    fd.append('image',this.selectedFile, str);
    /*for (var pair of fd.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }*/

    
    this.ProfileService.updatePhoto(fd).subscribe(
      (response) => {
        console.log(response);
      }, 
      (error) => {
        console.log(error);
      }
    )
  }

}
