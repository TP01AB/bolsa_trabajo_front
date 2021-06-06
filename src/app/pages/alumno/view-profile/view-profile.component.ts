import { Component, OnInit } from '@angular/core';
import { Columns, PdfMakeWrapper, TextReference, Txt } from 'pdfmake-wrapper';
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
  studentAreas;
  can = false;

  

  constructor(private ProfileService: StudentProfileService, private loginService: LoginService, private registerUser: RegisterService) { }

  ngOnInit(): void {
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

}
