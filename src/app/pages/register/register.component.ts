import { RegisterService } from './services/register.service';
import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PerfilAlComponent } from '../alumno/perfil/perfil-al.component';
import { FormsFunctionsService } from 'src/app/shared/services/forms-functions.service';
import { CrearPerfilComponent } from '../company/crear-perfil/crear-perfil.component';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1.5s ease',
              style({ height: '*', opacity: 1 }))
          ]
        ), ,
        transition(
          ':leave',
          [
            style({ height: '*', opacity: 1 }),
            animate('1.5s ease',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

  areas = [];
  registerForm: FormGroup;

  @ViewChild(PerfilAlComponent) private perfilAl: PerfilAlComponent;
  @ViewChild(CrearPerfilComponent) private perfilEmp: CrearPerfilComponent;

  constructor(private fb: FormBuilder, private registerUser: RegisterService, private gestorForm: FormsFunctionsService, public router: Router) { }
  isEmail = /\S+@\S+\.\S+/;

  ngOnInit(): void {
    this.areas = null;
    this.registerUser.getAreas().subscribe(
      (response: any) => {
        this.areas = response;
        //console.log(this.areas);
        this.initForm();
      },
      error => console.log(error)
    )
  }

  initForm() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(this.isEmail)]],
      password: ['', [Validators.required, Validators.min(8)]],
      condicion: ['', Validators.required]
    });
  }

  isValidField(field: string): string {
    const validatedField = this.registerForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
  }

  onSave(): void {
    var tipo = this.registerForm.get('condicion').value
    let userId = null;
    if (tipo == 'student') {   
      let areas = sessionStorage.getItem('areas');       
      if (this.registerForm.valid && this.perfilAl.validate() == 1 && areas.length>0) {
        this.registerUser.registerUser(this.gestorForm.toJason(this.registerForm)).subscribe(
          (data: any) => {
            //Si correcto inserto alumno
            userId = data.message.user.id;
            //console.log("User id: "+userId);
            //console.log("success!", data);
            var aux = JSON.parse(this.perfilAl.toJason());
            //console.log(aux);
            aux['id'] = data.message.user.id;
            aux['areas'] = JSON.parse(sessionStorage.getItem('areas'))
            var json = JSON.stringify(aux);
            this.registerUser.registerChild(json, tipo).subscribe(
              (response: any) => {
                console.log("success!", response);
              },
              error => { 
                this.registerUser.deleteLast(data.message.user.id)
                console.error("couldn't post because", error)
              }
            )
          },
          error => console.error("couldn't post because", error)
        );
      } else {
        this.perfilAl.validate();
        this.gestorForm.validate(this.registerForm);
      }      
    } else if (tipo == 'company') {
      if (this.registerForm.valid && this.perfilEmp.validate() == 1) {
        userId = null;
        this.registerUser.registerUser(this.gestorForm.toJason(this.registerForm)).subscribe(
          (data: any) => {
            //Si correcto inserto alumno
            userId = data.message.user.id;
            //console.log("User id: "+userId);
            //console.log("success!", data);
            var aux = JSON.parse(this.perfilEmp.toJason());
            //console.log(aux);
            aux['id'] = data.message.user.id;
            var json = JSON.stringify(aux);
            this.registerUser.registerChild(json, tipo).subscribe(
              (response: any) => {
                console.log("success!", response);
                this.router.navigate(['/']);
              },
              error => console.error("couldn't post because", error)
            )
          },
          error => console.error("couldn't post because", error)
        )
      } else {
        this.perfilEmp.validate();
        this.gestorForm.validate(this.registerForm);
      }
    }
  }
}
