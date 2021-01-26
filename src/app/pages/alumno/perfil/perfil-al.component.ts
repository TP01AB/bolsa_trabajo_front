import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'perfil-al',
  templateUrl: './perfil-al.component.html',
  styleUrls: ['./perfil-al.component.scss']
})
export class PerfilAlComponent implements OnInit {  

  model: NgbDateStruct;
  contactForm: FormGroup;

  //Patrones de validación
  private isName = "^(?=.{3,15}$)[A-ZÁÉÍÓÚ][a-zñáéíóú]+(?: [A-ZÁÉÍÓÚ][a-zñáéíóú]+)?$"  
  private isDni = "^[0-9]{8,8}[A-Za-z]$"

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this,this.initForm();
  }

  onSave() {
    if (this.contactForm.valid) {
      
      console.log(this.contactForm.value)
      
      let jsonForm = this.contactForm.getRawValue();
      
      let json = JSON.stringify(jsonForm);

      console.log(json);

      let headers = new HttpHeaders({
        'Content-Type': 'application/json',
      });
      
      return this.http.post("http://localhost:8000/api/student/insert", json).subscribe(
          data => console.log("success!", data),
          error => console.error("couldn't post because", error )
      )

    } else {
      console.log('Not valid')
      Object.keys(this.contactForm.controls).forEach(field => {
        const control = this.contactForm.get(field);
        control.markAsTouched({ onlySelf: true });
      });
    }
  }

  //Validacion
  isValidField (field:string):string {
    const validatedField = this.contactForm.get(field);
    return ( !validatedField.valid && validatedField.touched)
    ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  notRequiredHasValue(field:string):string {
    return this.contactForm.get(field).value ? 'is-valid' : '';
  }

  private initForm():void {
    this.contactForm = this.fb.group({
      name: ['',[Validators.required, Validators.pattern(this.isName)]],
      lastName: ['',[Validators.required, Validators.pattern(this.isName)]],      
      birthdate: ['',Validators.required],
      studies: ['',Validators.required],
      dni: ['',[Validators.required, Validators.minLength(9), Validators.maxLength(9),Validators.pattern(this.isDni)]],
      aptitudes: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(500)]]
    })
  }

}
