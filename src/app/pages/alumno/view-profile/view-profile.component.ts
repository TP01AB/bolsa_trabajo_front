import { Component, OnInit } from '@angular/core';
import { Columns, PdfMakeWrapper, TextReference, Txt } from 'pdfmake-wrapper';
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

  newPdf() {
    const pdf = new PdfMakeWrapper();
    this.data = JSON.parse(this.data);
    //this.studentAreas = JSON.parse(this.studentAreas);
    //this.areas = JSON.parse(this.areas)

    console.log(this.data);
    console.log(this.studentAreas);
    console.log(this.areas);

    //Datos personales

    pdf.add(
      new Txt('Datos personales').bold().fontSize(15).decoration('underline').end,      
    );

    pdf.add(
      new Txt(' ').bold().italics().fontSize(15).end,      
    );

    pdf.add(
      new Columns([new Txt('Nombre: ').bold().end, this.data['name']+' '+ this.data['lastnames'], '', '']).end
    );

    pdf.add(
      new Txt(' ').bold().italics().fontSize(10).end,      
    );

    pdf.add(
      new Columns([new Txt('Fecha de nacimiento:').bold().end,this.data['birthdate'], '', '']).end
    );

    pdf.add(
      new Txt(' ').bold().italics().fontSize(10).end,      
    );

    pdf.add(
      new Columns([new Txt('Dni: ').bold().end, this.data['dni'], '', '']).end
    );

    pdf.add(
      new Txt(' ').bold().italics().fontSize(10).end,      
    );

    pdf.add(
      new Columns([new Txt('Correo electrónico: ').bold().end, this.loginService.user.email, '', '']).end
    );

    pdf.add(
      new Txt(' ').bold().italics().fontSize(10).end,      
    );

    pdf.add(
      new Columns([new Txt('Teléfono móvil: ').bold().end, this.data['phone'], '', '']).end
    );

    pdf.add(
      new Txt(' ').bold().italics().fontSize(15).end,      
    );

    //Estudios

    pdf.add(
      new Txt('Estudios').bold().fontSize(15).decoration('underline').end,      
    );

    pdf.add(
      new Txt(' ').bold().italics().fontSize(15).end,      
    );

    for(var i=0; i<this.studentAreas.length;i++) {
      var areaId = this.studentAreas[i].id - 1;
      console.log('id area: '+areaId);
      console.log(this.areas[areaId]);
      console.log(+i);
      var area = this.areas[areaId].description;
      console.log(area);

      pdf.add(
        '- ' + area
      );
      
      pdf.add(
        new Txt(' ').bold().italics().fontSize(15).end,      
      );
    }

    //Aptitudes
    pdf.add(
      new Txt('Aptitudes').bold().fontSize(15).decoration('underline').end,      
    );

    pdf.add(
      this.data['aptitudes']
    );
    pdf.create().open();
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
    this.can = false;
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
        window.location.reload();
      }, 
      (error) => {
        console.log(error);
      }
    )
  }

}
