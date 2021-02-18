import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormsFunctionsService {

  constructor() { }

  public validate(form: FormGroup): any {
    if (form.valid) {
      return 1;
    } else {
      console.log('Not valid')
        Object.keys(form.controls).forEach(field => {
          const control = form.get(field);
          control.markAsTouched({ onlySelf: true });
        });
      return 0;      
    }
  }

  public toJason(form: FormGroup): any {
    let jsonForm = form.getRawValue();
    
    let json = JSON.stringify(jsonForm);

    //console.log(json);

    return json;
  }

}
