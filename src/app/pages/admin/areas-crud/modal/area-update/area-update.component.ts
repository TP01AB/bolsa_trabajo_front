import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from 'src/app/auth/services/login.service';
import { AreasAdminService } from '../../../services/areas-admin.service';

@Component({
  selector: 'app-area-update',
  templateUrl: './area-update.component.html',
  styleUrls: ['./area-update.component.scss']
})
export class AreaUpdateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal, private router: Router, private fb: FormBuilder, private areaService: AreasAdminService, private loginService: LoginService) { }

  @Input() public area;
  @Output() updateOk: EventEmitter<any> = new EventEmitter();
  areaForm: FormGroup;
  submitted = false;

  ngOnInit(): void {
    this.initForm();
  }
  onSubmit() {
    this.submitted = true;
    if (this.areaForm.invalid) {
        return;
    } else {      
      let area = this.areaForm.value;
      area.id = this.area.id;
  
  
      this.areaService.updateArea(area).subscribe(
        (response: any) => {
          this.updateOk.emit(true);       
          this.activeModal.close();
        },
        (error) => {
          console.log(error);
          this.updateOk.emit(false);
          this.activeModal.close();
        }
      );
    }    
  }

  initForm() {
    this.areaForm = this.fb.group({
      nombre: ['', [Validators.required]],      
    });    
    this.areaForm.patchValue({
      nombre: this.area.description
    });
  }

  isValidField(field: string): string {
    const validatedField = this.areaForm.get(field);
    return (!validatedField.valid && validatedField.touched)
      ? 'is-invalid' : validatedField.touched ? 'is-valid' : '';
    }    

}
